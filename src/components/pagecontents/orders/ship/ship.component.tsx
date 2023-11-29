import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { countryCodeEmoji } from "country-code-emoji";
import React, { useEffect, useMemo, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useDispatch, useSelector } from "react-redux";
import countryList from "react-select-country-list";
import type { RootState } from "../../../../redux/store";
import upsService from "../../../../services/ups.service";

import {
  Calculate,
  LocationOff,
  LocationOn,
  Refresh,
  Verified,
  Warning,
} from "@mui/icons-material";
import { setAccountNumber } from "../../../../redux/authslice";
import ToastService from "../../../toast/toast.component";
import { FromLocationData } from "../../settings/fromLocations/dialog/dialog.component";
import { UpsPackageData } from "../../settings/package/upsPackage.component";
import { TableDatatype } from "../ordertable.component";
import SearchInput from "./address/SearchInput";
import CustomDeclaration, {
  CustomDeclarationDataType,
} from "./customDeclaration.form";
import DutiesAndTaxesForm from "./international/dutiesAndTaxes.form";
import InternationalForm from "./international/international.form";
import PaymentForm from "./international/payment.form";
import ShipRateBrowser from "./ratingbrowser/ship.rateBrowser";
import { ProductDataType } from "./ship.product.form";
import ShipProductsForm from "./ship.products.form";
import SoldToForm from "./soldto.form";
export const serviceCodes = [
  { key: "01", text: "01-UPS Next Day Air" },
  { key: "02", text: "02-UPS 2nd Day Air" },
  { key: "03", text: "03-Ground" },
  { key: "07", text: "07-UPS Express" },
  { key: "08", text: "08-UPS Expeditied" },
  { key: "11", text: "11-UPS Standard" },

  { key: "12", text: "12-UPS 3 Day Select" },
  { key: "13", text: "13-UPS Next Day Air Saver" },
  { key: "14", text: "14-UPS Next Day Air Early" },
  { key: "17", text: "17-UPS Worldwide Economy DDU" },
  { key: "54", text: "54-UPS Express Plus" },
  { key: "59", text: "59-2nd Day Air A.M" },
  { key: "65", text: "65-UPS Saver" },
];
export interface SoldTo {
  companyName: string;
  attentionName: string;
  taxId: string;
  phone: string;
  street: string;
  city: string;
  stateCode: string;
  postalCode: string;
  countryCode: string;
  email: string;
}
export interface ShipmentData {
  recipient: string;
  attentionName: string;
  phone: string;
  street: string;
  city: string;
  stateCode: string;
  zip: string;
  countryCode: string;
  country_iso2: string;
  shipfrom_location: string;
  service_code: string;
  description: string;
  package_code: string;
  dimension_code: string;
  length: number;
  width: number;
  height: number;
  weight_code: string;
  weight: number;
  declared_value: number;
  taxIdType: string;
  taxId: string;
  isSoldTo: boolean;
  soldTo: SoldTo;
  products: Array<ProductDataType>;
  customData: CustomDeclarationDataType;
  internationalForm: InternationalFormData;
  paymentInformation: PaymentInformation;
  dutiesAndTaxesInformation: DutiesAndTaxesInformation;
}
export interface PaymentInformation {
  paymentMethod: string;
  creditCardType: string;
  creditCardNumber: string;
  creditExpirationDate: string;
  creditSecurityCode: string;
  creditAddress: string;
  creditCity: string;
  creditStateCode: string;
  creditPostalCode: string;
  creditCountryCode: string;
  alternatePaymentMethod: string;
  accountNumber: string;
  postalCode: string;
  countryCode: string;
}
export interface DutiesAndTaxesInformation {
  paymentMethod: string;
  alternatePaymentMethod: string;
  accountNumber: string;
  postalCode: string;
  countryCode: string;
}
export interface TotalCharge {
  fuelCharge: string;
}
export interface InternationalFormData {
  reasonForExport: string;
  shipmentDescription: string;
  invoiceNumber: string;
  purchaseOrder: string;
  termsOfSale: string;
  additionalComment: string;
  declarationStatement: string;
  discount: string;
  freightCharge: string;
  insurance: string;
  otherCharge: string;
  specify: string;
  curCode: string;
}
export type InputLabelProps = {
  label: string;
  name: string;
  handleLabelChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
interface ShipComponentProps {
  selectedRow: TableDatatype | undefined;
  minServiceCode: string;
  services: string[];
  shipmentData: ShipmentData;
  onUpdateRow: (v: TableDatatype) => void;
  onShipmentChange: (
    v: ShipmentData | ((p: ShipmentData) => ShipmentData)
  ) => void;
  onServicesParamChange: (v: ShipmentData) => void;
  onCreateLabelClicked: () => void;
  showButton: boolean;
}

const ShipComponent: React.FC<ShipComponentProps> = ({
  selectedRow,
  services,
  minServiceCode,
  shipmentData,
  onUpdateRow,
  onShipmentChange,
  onServicesParamChange,
  onCreateLabelClicked,
  showButton,
}) => {
  const [packageIndex, setPackageIndex] = useState("0");
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [fromLocations, setFromLocations] = useState<any[]>([]);
  const [packages, setPackages] = useState<Array<UpsPackageData>>([]);
  const [addressValidation, setAddressValidation] = useState("Not Validated");
  const options = useMemo(() => countryList().getData(), []);
  const accountNumber = useSelector(
    (state: RootState) => state.authReducer.accountNumber
  );
  const upsAccounts = useSelector(
    (state: RootState) => state.authReducer.upsAccounts
  );
  const handleShipmentChanged = (name: string, value: string) => {
    if (shipmentData) onShipmentChange({ ...shipmentData, [name]: value });
  };
  const onChangeAddress = (curRow: any) => {
    if (curRow && selectedRow) {
      const countryItem = options.find(
        (item) => item.label === curRow.address.countryName
      );
      const updatedShipment = {
        ...shipmentData,
        country_iso2: String(countryItem?.value),
        country: String(countryItem?.label),
        street: curRow.address.label.split(",")[0],
        zip: curRow.address.postalCode,
        state: curRow.address.stateCode,
        city: curRow.address.city,
      };
      onShipmentChange(updatedShipment);
      const updatedRow = {
        ...selectedRow,
        country_iso2: countryItem?.value,
        country: String(countryItem?.label),
        street: curRow.address.label.split(",")[0],
        zip: curRow.address.postalCode,
        state: curRow.address.stateCode,
        city: curRow.address.city,
      };
      if (updatedRow) onUpdateRow(updatedRow as TableDatatype);
      handleAddressValidation();
    }
  };
  const onCloseRatingDialog = () => {
    setShowRatingDialog(false);
  };
  const dispatch = useDispatch();
  const handleProductsChanged = (products: Array<ProductDataType>) => {
    const updatedRow = { ...selectedRow, products: products };
    if (updatedRow) onUpdateRow(updatedRow as TableDatatype);
  };
  const handleAccountNumberChanged = (event: SelectChangeEvent) => {
    dispatch(setAccountNumber(event.target.value));
    localStorage.setItem("upsAccount", event.target.value);
  };
  const handleServiceCodeChange = (event: SelectChangeEvent) => {
    handleShipmentChanged("service_code", event.target.value);
    handleRateOrder(event.target.value);
  };
  const handlePackageCodeChange = (event: SelectChangeEvent) => {
    const packageItem = packages.find((item) => item.id === event.target.value);
    console.log(packageItem);
    handleShipmentChanged("package_code", packageItem?.packageCode || "");
    setPackageIndex(packageItem?.id || "");
    // handleShipmentChanged("length", packageItem?.length?.toString() || "");
    // handleShipmentChanged("width", packageItem?.width?.toString() || "");
    // handleShipmentChanged("height", packageItem?.height?.toString() || "");
    const updatedShipment = {
      ...shipmentData,
      package_code: packageItem?.packageCode || "",
      length: packageItem?.length || 0,
      width: packageItem?.width || 0,
      height: packageItem?.height || 0,
    };
    onShipmentChange(updatedShipment);
    onServicesParamChange(updatedShipment);
  };
  const handleCountryChange = (event: SelectChangeEvent) => {
    handleShipmentChanged("country_iso2", event.target.value);
    handleShipmentChanged(
      "country",
      options.find((item) => item.value === event.target.value)?.label ?? ""
    );
    const updatedRow = {
      ...selectedRow,
      country_iso2: event.target.value,
      country:
        options.find((item) => item.value === event.target.value)?.label ?? "",
    };
    if (updatedRow) onUpdateRow(updatedRow as TableDatatype);
  };
  const handleWeightChange = (event: SelectChangeEvent) => {
    handleShipmentChanged("weight_code", event.target.value);
  };
  const handleFromLocationChange = (event: SelectChangeEvent) => {
    handleShipmentChanged("shipfrom_location", event.target.value);
  };
  const handleShipToLabelChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    const updatedRow = { ...selectedRow, [name]: value };
    handleShipmentChanged(event.target.name, event.target.value);
    if (updatedRow) onUpdateRow(updatedRow as TableDatatype);
  };
  const handleRateOrder = (service_code: string) => {
    if (!selectedRow) return;
    if (shipmentData.weight == 0) return;
    const updatedShipmentData = { ...shipmentData, service_code: service_code };
    upsService
      .getOrderRate(updatedShipmentData, accountNumber)
      .then((data) => {
        if (data.data.RateResponse) {
          // ToastService.showToast("success", "Rating success.");
        } else {
          ToastService.showToast(
            "failed",
            data.data.response.errors[0].message
          );
          return;
        }
        // setRateOrder(
        //   (
        //     parseFloat(
        //       data.data.RateResponse.RatedShipment?.NegotiatedRateCharges
        //         ?.TotalCharge?.MonetaryValue || 0
        //     ) +
        //     parseFloat(
        //       data.data.RateResponse.RatedShipment?.TaxCharges?.MonetaryValue ||
        //         0
        //     )
        //   ).toFixed(2)
        // );

        // setRateCurrency(
        //   data.data.RateResponse.RatedShipment.TotalCharges.CurrencyCode
        // );
        // setDeliveryDate(
        //   formatDate(
        //     data.data.RateResponse.RatedShipment.TimeInTransit.ServiceSummary
        //       .EstimatedArrival.Arrival.Date
        //   )
        // );
        // setDeliveryTime(
        //   formatTime(
        //     data.data.RateResponse.RatedShipment.TimeInTransit.ServiceSummary
        //       .EstimatedArrival.Arrival.Time
        //   )
        // );
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.data) {
          ToastService.showToast("failed", error.response.data.data);
        } else {
          ToastService.showToast("failed", "Rating failed");
        }
      });
  };
  const handleShowRatings = () => {
    setShowRatingDialog(true);
  };
  console.log(selectedRow);
  const handleAddressValidation = () => {
    upsService
      .addressValidation(
        selectedRow?.street +
          ", " +
          selectedRow?.city +
          ", " +
          selectedRow?.state +
          ", " +
          selectedRow?.zip +
          ", " +
          selectedRow?.country
      )
      .then((data) => {
        const fieldScore = data.data.items[0].scoring.fieldScore;
        if (
          fieldScore.city >= 0.9 &&
          fieldScore.country >= 0.9 &&
          // fieldScore.houseNumber >= 0.9 &&
          fieldScore.postalCode >= 0.9 &&
          (fieldScore.state ? fieldScore.state >= 0.9 : 1) &&
          fieldScore.streets[0] >= 0.9
        ) {
          setAddressValidation("Valid Address");
          // ToastService.showToast("success", "Valid Address");
        } else {
          setAddressValidation("Invalid Address");
          // ToastService.showToast("failed", "Invalid Address");
        }
      })
      .catch((error) => {
        // ToastService.showToast("failed", "Address Validation Failed");

        setAddressValidation("Invalid Address");
      });
  };

  const handleTaxIdTypeChange = (event: SelectChangeEvent) => {
    handleShipmentChanged("taxIdType", event.target.value);
  };
  const initOptions = async () => {
    if (shipmentData["shipfrom_location"] === "") {
      const resPackages = await upsService.getPackages();
      const packagesOptions = (
        typeof resPackages === "string"
          ? JSON.parse(resPackages)?.packages ?? []
          : []
      ) as Array<UpsPackageData>;
      setPackages(packagesOptions);
      setPackageIndex(packagesOptions?.[0]?.id ?? "");

      const resFromLocations = await upsService.getFromLocations();
      const locationsOptions = (
        typeof resFromLocations === "string"
          ? JSON.parse(resFromLocations)?.fromLocations ?? []
          : []
      ) as Array<FromLocationData>;
      console.log(shipmentData);
      setFromLocations(locationsOptions);
      onShipmentChange({
        ...shipmentData,
        shipfrom_location: (
          locationsOptions.find((item) => item?.selected) ??
          locationsOptions?.[0]
        )?.locationName,
        width: packagesOptions?.[0]?.width,
        height: packagesOptions?.[0]?.height,
        length: packagesOptions?.[0]?.length,
        package_code: packagesOptions?.[0]?.packageCode,
      } as ShipmentData);
    }
  };

  useEffect(() => {
    // setPackageCode("01-UPS Letter");
    initOptions();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    handleShipmentChanged("service_code", minServiceCode);
    handleRateOrder(minServiceCode);
  }, [services, minServiceCode]);
  useEffect(() => {
    handleAddressValidation();
  }, [
    selectedRow?.street,
    selectedRow?.city,
    selectedRow?.state,
    selectedRow?.zip,
    selectedRow?.country_iso2,
  ]);
  return (
    <div className="w-[350px] min-h-[calc(100vh-140px)] flex flex-col right-0 p-2 shadow-md rounded-sm  bg-[#FAFAFA]">
      <div className="text-2xl mt-2 ml-2 pb-2 pr-2">Create Label</div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="flex justify-between">
          <Typography className="w-[200px] text-left flex items-center justify-start">
            Ship Account:
          </Typography>
          <Select
            labelId="accountNumber"
            id="accountNumber"
            value={accountNumber}
            // label={fromLocation}
            size="small"
            onChange={handleAccountNumberChanged}
            className="ml-2 w-full bg-white"
          >
            {upsAccounts?.map((upsAccount: any, index: any) => {
              return (
                <MenuItem key={index} value={upsAccount.accountNumber}>
                  {upsAccount.accountNumber}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div className="flex justify-between">
          <ShipRateBrowser
            showDialog={showRatingDialog}
            orderData={selectedRow}
            shipData={shipmentData}
            fromLocations={fromLocations}
            services={services}
            onClose={onCloseRatingDialog}
          />

          <Typography className="w-[230px] text-left flex items-center justify-start">
            Ship From:
          </Typography>
          <Select
            labelId="fromLocationSelect"
            id="fromLocationSelect"
            value={shipmentData.shipfrom_location}
            // label={fromLocation}
            size="small"
            onChange={handleFromLocationChange}
            className="ml-2 w-full  bg-white"
          >
            {fromLocations?.map((location, index) => {
              return (
                <MenuItem key={index} value={location.locationName}>
                  {location.locationName}
                </MenuItem>
              );
            })}
          </Select>
          <IconButton color="primary" onClick={handleShowRatings} size="small">
            <Calculate />
          </IconButton>
        </div>

        <Accordion
          sx={{
            borderRadius: "4px",
            overflow: "hidden",
            "&.Mui-expanded": {
              margin: "8px",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              backgroundColor: "#6D6E6F",
              color: "white",
              "&.Mui-expanded": {
                backgroundColor: "#77BC3F",
              },
            }}
          >
            <Typography>Shipment</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2} className="pt-2">
              <Grid xs={12} md={12}>
                <FormControl
                  className="w-full"
                  variant="outlined"
                  sx={{ minWidth: 120 }}
                >
                  <InputLabel
                    id="servicecodeid"
                    sx={{ top: "-7px", fontSize: "12px" }}
                  >
                    Service Code
                  </InputLabel>
                  <Select
                    className="w-full"
                    value={shipmentData.service_code}
                    label="UPS Service Code"
                    labelId="servicecodeid"
                    size="small"
                    sx={{
                      fontSize: "12px",
                    }}
                    onChange={handleServiceCodeChange}
                  >
                    {serviceCodes.map((item) =>
                      services.includes(item.key) ? (
                        <MenuItem
                          key={item.key}
                          value={item.key}
                          sx={{
                            fontSize: "12px",
                          }}
                        >
                          {item.text}
                        </MenuItem>
                      ) : null
                    )}
                  </Select>
                </FormControl>
                {/* 
                  <InputLabelTxt
                    label="Packaging Code"
                    name="package_code"
                    handleLabelChange={handleLabelChange}
                  /> */}
              </Grid>

              <Grid xs={12} md={12}>
                <FormControl
                  className="w-full"
                  variant="outlined"
                  sx={{ minWidth: 120 }}
                >
                  <InputLabel id="packagecodelabel">PackageCode</InputLabel>
                  <Select
                    className="w-full"
                    value={packageIndex}
                    label="Shipment Charge"
                    labelId="packagecodelabel"
                    size="small"
                    sx={{
                      fontSize: "12px",
                    }}
                    onChange={handlePackageCodeChange}
                  >
                    {packages.map((item, index) => (
                      <MenuItem
                        key={index}
                        value={item.id}
                        sx={{
                          fontSize: "12px",
                        }}
                      >
                        {item.packageName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl
                  className="w-full"
                  variant="outlined"
                  sx={{ minWidth: 120 }}
                >
                  <InputLabel id="unit">Unit Weight</InputLabel>
                  <Select
                    className="w-full"
                    value={shipmentData.weight_code}
                    size="small"
                    label="Unit Weight"
                    labelId="unit"
                    sx={{
                      fontSize: "12px",
                    }}
                    onChange={handleWeightChange}
                  >
                    <MenuItem
                      value="LBS"
                      sx={{
                        fontSize: "12px",
                      }}
                    >
                      LBS/IN
                    </MenuItem>
                    <MenuItem
                      value="KG"
                      sx={{
                        fontSize: "12px",
                      }}
                    >
                      KG/CM
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  className="w-full"
                  variant="outlined"
                  label="Weight*"
                  name="weight"
                  size="small"
                  value={shipmentData.weight == 0 ? "" : shipmentData.weight}
                  onChange={handleShipToLabelChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: "12px",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "12px",
                    },
                  }}
                />
              </Grid>
              <Grid xs={12} md={4}>
                <TextField
                  className="w-full"
                  variant="outlined"
                  label="Length"
                  name="length"
                  size="small"
                  value={shipmentData.length == 0 ? "" : shipmentData.length}
                  onChange={handleShipToLabelChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: "12px",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "12px",
                    },
                  }}
                />
              </Grid>
              <Grid xs={12} md={4}>
                <TextField
                  className="w-full"
                  variant="outlined"
                  label="Width"
                  name="width"
                  size="small"
                  value={shipmentData.width == 0 ? "" : shipmentData.width}
                  onChange={handleShipToLabelChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: "12px",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "12px",
                    },
                  }}
                />
              </Grid>
              <Grid xs={12} md={4}>
                <TextField
                  className="w-full"
                  variant="outlined"
                  label="Height"
                  name="height"
                  size="small"
                  value={shipmentData.height == 0 ? "" : shipmentData.height}
                  onChange={handleShipToLabelChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: "12px",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "12px",
                    },
                  }}
                />
              </Grid>
              <Grid xs={12} md={12}>
                <TextField
                  className="w-full"
                  variant="outlined"
                  label="Insurance Amount"
                  name="declared_value"
                  size="small"
                  value={
                    shipmentData.declared_value == 0
                      ? ""
                      : shipmentData.declared_value
                  }
                  onChange={handleShipToLabelChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: "12px",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "12px",
                    },
                  }}
                />
              </Grid>
              <Grid xs={12} md={12}>
                <div className="flex justify-between">
                  <TextField
                    className="w-full p-2"
                    variant="outlined"
                    label="Description"
                    name="description"
                    size="small"
                    value={shipmentData.description}
                    onChange={handleShipToLabelChange}
                    sx={{
                      "& .MuiInputLabel-root": {
                        fontSize: "12px",
                      },
                      "& .MuiOutlinedInput-input": {
                        fontSize: "12px",
                      },
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        {/* <div className="flex  justify-between">
            <div className="flex justify-center items-center">
              {rateOrder ? (
                <AttachMoney color="success" />
              ) : (
                <Warning color="warning" />
              )}
              <Typography fontSize={12}>
                &nbsp;Rate: {rateOrder}
                {rateCurrency}
              </Typography>
            </div>
            <IconButton
              color="primary"
              onClick={() => {
                handleRateOrder(minServiceCode);
                handleShipmentChanged("service_code", minServiceCode);
              }}
              size="small"
            >
              <Refresh />
            </IconButton>
            {showButton && (
              <Button
                sx={{
                  backgroundColor: "#77BC3F",
                  color: "#FFFFFF",
                  width: "180px",
                  height: "35px",
                  marginRight: "10px",
                  textTransform: "none",
                }}
                variant="outlined"
                onClick={onCreateLabelClicked}
              >
                Create Label
              </Button>
            )}
          </div>
          <div className="flex items-center">
            <Typography fontSize={12}>Delivery At: </Typography> 
            <LocalShipping
              color={deliveryDate ? "success" : "warning"}
            ></LocalShipping>
            <Typography fontSize={12}>Deliver At:</Typography>
             <div> 
            <Typography fontSize={12}>&nbsp;{deliveryDate}</Typography>
            <Typography fontSize={12}>&nbsp;{deliveryTime}</Typography>
            </div> 
          </div> */}
        <Accordion
          sx={{
            borderRadius: "4px",
            overflow: "hidden",
            "&.Mui-expanded": {
              margin: "8px",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              backgroundColor: "#6D6E6F",
              color: "white",
              "&.Mui-expanded": {
                backgroundColor: "#77BC3F",
              },
            }}
          >
            <Typography>Ship To:</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2} className="pt-2">
              <Grid xs={12} md={6}>
                <TextField
                  className="w-full"
                  variant="outlined"
                  label="FullName"
                  name="recipient"
                  size="small"
                  value={selectedRow?.recipient || ""}
                  onChange={handleShipToLabelChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: "12px",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "12px",
                    },
                  }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  className="w-full"
                  variant="outlined"
                  label="Attention Name"
                  name="attention"
                  size="small"
                  value={selectedRow?.attention || ""}
                  onChange={handleShipToLabelChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: "12px",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "12px",
                    },
                  }}
                />
              </Grid>
              <Grid xs={12} md={12}>
                <TextField
                  className="w-full"
                  variant="outlined"
                  label="Phone"
                  name="phone"
                  size="small"
                  value={selectedRow?.phone || ""}
                  onChange={handleShipToLabelChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: "12px",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "12px",
                    },
                  }}
                />
              </Grid>
              <Grid xs={1} md={1}>
                {addressValidation == "Invalid Address" ||
                addressValidation == "Not Validated" ? (
                  <LocationOff fontSize="medium" color="warning" />
                ) : (
                  <LocationOn fontSize="medium" color="success" />
                )}
              </Grid>
              <Grid xs={11} md={11} className="">
                <SearchInput
                  searchInputValue={selectedRow?.street || ""}
                  placeholder="Address"
                  options={[]}
                  // value={selectedRow?.street || ""}
                  onClickFunction={onChangeAddress}
                />
              </Grid>

              <Grid xs={12} md={12} style={{ display: "none" }}>
                <TextField
                  className="w-full"
                  variant="outlined"
                  label="Address Line"
                  name="street"
                  size="small"
                  value={selectedRow?.street || ""}
                  onChange={handleShipToLabelChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: "12px",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "12px",
                    },
                  }}
                />
              </Grid>
              <Grid xs={12} md={12}>
                <div className="flex">
                  {selectedRow ? (
                    <ReactCountryFlag
                      className="mr-1 border border-gray-200 shadow-md rounded-md"
                      style={{ width: "32px", height: "32px" }}
                      countryCode={selectedRow?.country_iso2 ?? ""}
                      svg
                      cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                      cdnSuffix="svg"
                      title={selectedRow?.country_iso2 ?? ""}
                    />
                  ) : null}
                  <Select
                    value={selectedRow?.country_iso2 ?? ""}
                    size="small"
                    onChange={handleCountryChange}
                    className="w-full"
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    {options.map((country) => (
                      <MenuItem
                        id={country.value}
                        key={country.value}
                        value={country.value}
                        sx={{
                          fontSize: "12px",
                        }}
                      >
                        {"(" +
                          countryCodeEmoji(country.value) +
                          ") " +
                          country.label}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </Grid>
              <Grid xs={12} md={12}>
                <TextField
                  className="w-full"
                  variant="outlined"
                  label="City"
                  name="city"
                  size="small"
                  value={selectedRow?.city || ""}
                  onChange={handleShipToLabelChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: "12px",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "12px",
                    },
                  }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  className="w-full"
                  variant="outlined"
                  label="State Code"
                  name="state"
                  size="small"
                  value={selectedRow?.state ?? ""}
                  onChange={handleShipToLabelChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: "12px",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "12px",
                    },
                  }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  className="w-full"
                  variant="outlined"
                  label="PostalCode"
                  name="zip"
                  size="small"
                  value={selectedRow?.zip || ""}
                  onChange={handleShipToLabelChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: "12px",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "12px",
                    },
                  }}
                />
              </Grid>
              <Grid xs={12}>
                <div className="flex  justify-between w-100">
                  <div className="flex justify-center items-center">
                    {addressValidation == "Not Validated" ||
                    addressValidation == "Invalid Address" ? (
                      <Warning color="warning" />
                    ) : (
                      <Verified color="success" />
                    )}
                    <Typography fontSize={12}>{addressValidation}</Typography>
                  </div>
                  <IconButton
                    color="primary"
                    onClick={handleAddressValidation}
                    size="small"
                  >
                    <Refresh />
                  </IconButton>
                </div>
              </Grid>
              <Grid xs={4}>
                <FormControl
                  className="w-full"
                  variant="outlined"
                  sx={{ minWidth: 100 }}
                >
                  <InputLabel
                    id="taxidtype"
                    sx={{
                      fontSize: "12px",
                    }}
                    className="mt-[-7px]"
                  >
                    Tax Id Type
                  </InputLabel>
                  <Select
                    className="w-full"
                    value={shipmentData.taxIdType}
                    label="Tax ID Type"
                    labelId="taxidtype"
                    size="small"
                    sx={{
                      fontSize: "12px",
                    }}
                    onChange={handleTaxIdTypeChange}
                  >
                    {[
                      "TIN",
                      "EIN",
                      "SSN",
                      "VAT",
                      "EORI",
                      "IOSS",
                      "PAN",
                      "VOEC",
                    ].map((item, index) => (
                      <MenuItem
                        key={index}
                        value={item}
                        sx={{
                          fontSize: "12px",
                        }}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={8}>
                <TextField
                  className="w-full"
                  variant="outlined"
                  label="Tax ID"
                  name="taxId"
                  size="small"
                  value={shipmentData.taxId || ""}
                  onChange={handleShipToLabelChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: "12px",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "12px",
                    },
                  }}
                />
              </Grid>
              <Grid xs={12} md={12}>
                <FormControlLabel
                  className="w-full"
                  control={
                    <Checkbox
                      checked={shipmentData.isSoldTo}
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: "12px",
                        },
                        "& .MuiOutlinedInput-input": {
                          fontSize: "12px",
                        },
                      }}
                      onChange={() => {
                        const updatedData = {
                          ...shipmentData,
                          isSoldTo: !shipmentData.isSoldTo,
                        };
                        onShipmentChange(updatedData);
                      }}
                    />
                  }
                  label="Set ship to address to sold to address"
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {!shipmentData.isSoldTo && (
          <Accordion
            sx={{
              borderRadius: "4px",
              overflow: "hidden",
              "&.Mui-expanded": {
                margin: "8px",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                backgroundColor: "#6D6E6F",
                color: "white",
                "&.Mui-expanded": {
                  backgroundColor: "#77BC3F",
                },
              }}
            >
              <Typography>Sold To:</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <SoldToForm
                formData={shipmentData.soldTo}
                onChange={(v: SoldTo) => {
                  const updatedShipment = { ...shipmentData, soldTo: v };
                  onShipmentChange(updatedShipment);
                }}
              />
            </AccordionDetails>
          </Accordion>
        )}

        <Accordion
          sx={{
            borderRadius: "4px",
            overflow: "hidden",
            "&.Mui-expanded": {
              margin: "8px",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              backgroundColor: "#6D6E6F",
              color: "white",
              "&.Mui-expanded": {
                backgroundColor: "#77BC3F",
              },
            }}
          >
            <Typography>Payment Method</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <PaymentForm
              data={shipmentData.paymentInformation}
              onChange={(p: PaymentInformation) => {
                const updatedShipment = {
                  ...shipmentData,
                  paymentInformation: p,
                };
                onShipmentChange(updatedShipment);
              }}
            />
          </AccordionDetails>
        </Accordion>
        {fromLocations.find(
          (item) => item.locationName === shipmentData.shipfrom_location
        )?.countryCode !== shipmentData.country_iso2 && (
          <>
            <Accordion
              sx={{
                borderRadius: "4px",
                overflow: "hidden",
                "&.Mui-expanded": {
                  margin: "8px",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  backgroundColor: "#6D6E6F",
                  color: "white",
                  "&.Mui-expanded": {
                    backgroundColor: "#77BC3F",
                  },
                }}
              >
                <Typography>Duties and Taxes</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <DutiesAndTaxesForm
                  data={shipmentData.dutiesAndTaxesInformation}
                  onChange={(p: DutiesAndTaxesInformation) => {
                    const updatedShipment = {
                      ...shipmentData,
                      dutiesAndTaxesInformation: p,
                    };
                    onShipmentChange(updatedShipment);
                  }}
                />
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{
                borderRadius: "4px",
                overflow: "hidden",
                "&.Mui-expanded": {
                  margin: "8px",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  backgroundColor: "#6D6E6F",
                  color: "white",
                  "&.Mui-expanded": {
                    backgroundColor: "#77BC3F",
                  },
                }}
              >
                <Typography>International Form</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <InternationalForm
                  rowId={selectedRow?.order_id ?? ""}
                  formData={shipmentData.internationalForm}
                  onChange={(p: InternationalFormData) => {
                    const updatedShipment = {
                      ...shipmentData,
                      internationalForm: p,
                    };
                    onShipmentChange(updatedShipment);
                  }}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                borderRadius: "4px",
                overflow: "hidden",
                "&.Mui-expanded": {
                  margin: "8px",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  backgroundColor: "#6D6E6F",
                  color: "white",
                  "&.Mui-expanded": {
                    backgroundColor: "#77BC3F",
                  },
                }}
              >
                <Typography>Custom Declaration</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <CustomDeclaration
                  data={shipmentData.customData}
                  onChange={(p: CustomDeclarationDataType) => {
                    const updatedShipment = {
                      ...shipmentData,
                      customData: p,
                    };
                    onShipmentChange(updatedShipment);
                  }}
                />
                <ShipProductsForm
                  onChange={(value = [] as Array<ProductDataType>) =>
                    handleProductsChanged(value)
                  }
                  data={selectedRow?.products ?? []}
                />
              </AccordionDetails>
            </Accordion>
          </>
        )}
      </Box>
    </div>
  );
};
export const InputLabelTxt: React.FC<InputLabelProps> = ({
  label,
  name,
  handleLabelChange,
}) => {
  return (
    <TextField
      className="w-full"
      variant="outlined"
      label={label}
      name={name}
      size="small"
      onChange={handleLabelChange}
      sx={{
        "& .MuiInputLabel-root": {
          fontSize: "12px",
        },
        "& .MuiOutlinedInput-input": {
          fontSize: "12px",
        },
      }}
    />
  );
};
export function formatDate(inputDate: string) {
  if (!inputDate) return ``;
  const year = inputDate.substring(0, 4);
  const month = inputDate.substring(4, 6);
  const day = inputDate.substring(6, 8);
  const weekday = getWeekday(year, month, day);
  const formattedDate = `${weekday} ${month}-${day}`;
  return formattedDate;
}
export function formatTime(inputTime: string) {
  if (!inputTime) return ``;
  const hour = parseInt(inputTime.substring(0, 2), 10);
  const minute = inputTime.substring(2, 4);
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const period = hour < 12 ? "AM" : "PM";

  const formattedTime = `By ${formattedHour}:${minute} ${period}`;
  return formattedTime;
}
export function getWeekday(year: string, month: string, day: string) {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(parseInt(year), parseInt(month), parseInt(day));
  const weekdayIndex = date.getDay();
  const weekday = weekdays[weekdayIndex];

  return weekday;
}
export default ShipComponent;
