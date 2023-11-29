import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import ToastService from "../components/toast/toast.component";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  CancelScheduleSend,
  CardMembership,
  DataThresholding,
  LocalShipping,
  Payments,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import {
  Button,
  Menu,
  MenuItem,
  MenuProps,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import upsService from "../services/ups.service";
import LoadingCircle from "../components/loading";
import EnhancedTable, {
  TableDatatype,
} from "../components/pagecontents/orders/ordertable.component";
import ShipComponent, {
  ShipmentData,
} from "../components/pagecontents/orders/ship/ship.component";
import LabelView from "../components/pagecontents/orders/labelview.component";
import InvoiceView from "../components/pagecontents/orders/invoiceview.component";
import bigcommerceService from "../services/bigcommerce.service";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { useDebounce } from "use-debounce";

import { setAccountNumber, setUpsAccounts } from "../redux/authslice";
import { UpsUsersRowData } from "../components/pagecontents/settings/upsUsers/upsUser.component";
import { getStateCodeFromString } from "../constant/countrystate";
import { ProductDataType } from "../components/pagecontents/orders/ship/ship.product.form";
import TotalCharges from "../components/pagecontents/orders/ship/international/totalCharges";
import shopifyService from "../services/shopify.service";
import TrackingDialog, {
  TrackingInfo,
} from "../components/pagecontents/orders/tracking.dialog";
import { useNavigate } from "react-router-dom";
import paymentService from "../services/payment.service";
import { setSubscriptionCount } from "../redux/authslice";
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
export default function Order() {
  const navigate = useNavigate();
  const [shipmentData, setShipmentData] = useState<ShipmentData>({
    recipient: "",
    attentionName: "",
    phone: "",
    street: "",
    city: "",
    stateCode: "",
    zip: "",
    countryCode: "",
    country_iso2: "",
    shipfrom_location: "",
    service_code: "",
    description: "",
    package_code: "",
    dimension_code: "IN",
    length: 0,
    width: 0,
    height: 0,
    weight_code: "LBS",
    weight: 0,
    declared_value: 0,
    products: [] as Array<ProductDataType>,
    taxIdType: "",
    taxId: "",
    isSoldTo: true,
    soldTo: {
      companyName: "",
      attentionName: "",
      taxId: "",
      phone: "",
      street: "",
      city: "",
      stateCode: "",
      postalCode: "",
      countryCode: "CA",
      email: "",
    },
    customData: {
      itn: "",
      taxId: "",
    },
    internationalForm: {
      reasonForExport: "",
      additionalComment: "",
      declarationStatement: "",
      discount: "",
      freightCharge: "",
      insurance: "",
      invoiceNumber: "",
      purchaseOrder: "",
      otherCharge: "",
      shipmentDescription: "",
      specify: "",
      termsOfSale: "",
      curCode: "CAD",
    },
    paymentInformation: {
      paymentMethod: "01",
      creditCardType: "",
      creditCardNumber: "",
      creditSecurityCode: "",
      creditExpirationDate: "",
      creditAddress: "",
      creditCity: "",
      creditStateCode: "",
      creditPostalCode: "",
      creditCountryCode: "",
      alternatePaymentMethod: "",
      accountNumber: "",
      postalCode: "",
      countryCode: "",
    },
    dutiesAndTaxesInformation: {
      accountNumber: "",
      alternatePaymentMethod: "",
      countryCode: "",
      paymentMethod: "01",
      postalCode: "",
    },
  });
  const [debouncedShipmentData] = useDebounce(shipmentData, 2000);
  const [totalCharges, setTotalCharges] = useState<any>();
  function createData(
    order: string,
    age: string,
    date: string,
    notes: string,
    gift: string,
    itemsku: string,
    itemname: string,
    batch: string,
    recipient: string,
    attention: string,
    quantity: number,
    ordertotal: number,
    label: string,
    invoice: string,
    street: string,
    city: string,
    state: string,
    country: string,
    country_iso2: string,
    phone: string,
    zip: string,
    products: Array<ProductDataType>,
    orderstatus: string,
    fulfillment_status: string,
    order_id: string,
    shoptype: string, //"bigcommerce" "shopify"
    storename: string
  ) {
    return {
      order,
      age,
      date,
      notes,
      gift,
      itemsku,
      itemname,
      batch,
      recipient,
      attention,
      quantity,
      ordertotal,
      label,
      invoice,
      street,
      city,
      state,
      country,
      country_iso2,
      phone,
      zip,
      products,
      orderstatus,
      fulfillment_status,
      order_id,
      shoptype,
      storename,
    };
  }

  const [rows, setRows] = useState<TableDatatype[]>([
    createData(
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      0,
      0,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      [],
      "",
      "",
      "",
      "",
      ""
    ),
  ]);
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = React.useState<string[]>([]);
  const drawerWidth = 250;
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedRow, setSelectedRow] = useState<TableDatatype | undefined>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorStateEl, setStateAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const [imageSource, setImageSource] = useState("");
  const [showPdfForm, setShowPdfForm] = useState(false);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [services, setServices] = useState<string[]>([]);
  const [minServiceCode, setMinServiceCode] = useState("");
  const menubuttonopen = Boolean(anchorEl);

  const [isHovered, setIsHovered] = useState(false);

  const [destination, setDestination] = useState("All");
  const accountNumber = useSelector(
    (state: RootState) => state.authReducer.accountNumber
  );

  const showRight = useSelector(
    (state: RootState) => state.authReducer.showRight
  );
  const subscriptionCount = useSelector(
    (state: RootState) => state.authReducer.subscriptionCount
  );
  const apiStatus = useSelector(
    (state: RootState) => state.authReducer.apiStatus
  );
  const [selectedStore, setSelectedStore] = useState("All");
  const [shopifyStores, setShopifyStores] = useState<Array<any>>(
    [] as Array<any>
  );
  const [orderActions, setOrderActions] = useState<Array<string>>(
    [] as Array<string>
  );
  const [bigcommerceStores, setBigCommerceStores] = useState<Array<any>>(
    [] as Array<any>
  );
  const [tracking_info, setTrackingInfo] = useState({
    carrier: "",
    tracking_number: "",
    tracking_url: "",
  } as TrackingInfo);
  const [showTrackingInfo, setShowTrackingInfo] = useState(false);
  const getServices = (shipmentData: ShipmentData) => {
    upsService
      .getRateServices(shipmentData, accountNumber)
      .then((data) => {
        if (data?.result == "failed") {
          ToastService.showToast("failed", data.result);
        }
        if (data?.data?.response?.errors[0]?.code)
          // ToastService.showToast(
          //   "failed",
          //   data.data.response.errors[0].message
          // );
          upsService
            .refreshToken(accountNumber)
            .then()
            .catch((error) => ({}));
        else {
          const shipments = data.data.RateResponse.RatedShipment;
          let services: Array<any> = [];
          let minValue = parseFloat(shipments[0].TotalCharges.MonetaryValue);
          let minServiceCode = shipments[0].Service.Code;
          if (Array.isArray(shipments)) {
            shipments.map((shipment: any, index: any) => {
              if (minValue > parseFloat(shipment.TotalCharges.MonetaryValue)) {
                minValue = parseFloat(shipment.TotalCharges.MonetaryValue);
                minServiceCode = shipment.Service.Code;
              }
              services.push(shipment.Service.Code);
            });
            setMinServiceCode(minServiceCode);
            setServices(services);
          } else {
            services.push(shipments.Service.Code);
            setServices(services);
            // shipments is not an array
            // handle the error or unexpected data format here
          }
        }
      })
      .catch((error) => {
        if (error?.response?.data?.result == "failed") {
          upsService
            .refreshToken(accountNumber)
            .then()
            .catch((error) => ({}));
        }
        // ToastService.showToast("failed", error?.response?.data?.data);
      });
  };
  const handleSelectedRowChanged = (selected: TableDatatype | undefined) => {
    console.log(selected);
    setSelectedRow(selected);
    if (
      (selected?.shoptype.includes("bigcommerce") &&
        (selected?.orderstatus === "Awaiting Fulfillment" ||
          selected?.orderstatus === "Incomplete" ||
          selected?.orderstatus === "Awaiting Shipment" ||
          selected?.orderstatus === "Awaiting Pickup" ||
          selected?.orderstatus === "Partially Shipped")) ||
      (selected?.shoptype.includes("shopify") &&
        selected?.orderstatus === "paid" &&
        (selected?.fulfillment_status === null ||
          selected?.fulfillment_status === "unfulfilled"))
    ) {
      console.log("_-----------------------------");
      setShowButton(true);
    } else setShowButton(false);
    const updatedShipment = { ...shipmentData, ...selected };
    setShipmentData(updatedShipment);
    getServices(updatedShipment);
    if (selected?.shoptype.includes("bigcommerce")) {
      if (
        [
          "Awaiting Fulfillment",
          "Incomplete",
          "Awaiting Shipment",
          "Awaiting Pickup",
          "Partially Shipped",
        ].includes(selected.orderstatus)
      ) {
        setOrderActions(["On Hold", "Shipped", "Cancelled"]);
      } else if (
        ["Pending", "Awaiting Payment"].includes(selected.orderstatus)
      ) {
        setOrderActions(["Awaiting Fulfillment"]);
      } else if (["Cancelled", "Declined"].includes(selected.orderstatus)) {
        setOrderActions(["Awaiting Fulfillment"]);
      } else if (
        ["Disputed", "Manual Verification Required"].includes(
          selected.orderstatus
        )
      ) {
        setOrderActions(["Awaiting Fulfillment"]);
      } else if (
        ["Completed", "Shipped", "Refunded", "Partially Refunded"].includes(
          selected.orderstatus
        )
      ) {
        setOrderActions([]);
      }
    } else if (selected?.shoptype.includes("shopify")) {
      if (
        selected.orderstatus === "paid" &&
        (selected?.fulfillment_status === null ||
          selected?.fulfillment_status === "unfulfilled")
      ) {
        setOrderActions(["On Hold", "Shipped", "Cancelled"]);
      } else if (
        ["pending", "partially_paid", "unpaid", "authorized"].includes(
          selected.orderstatus
        ) &&
        selected.fulfillment_status === "unfulfilled"
      ) {
        setOrderActions(["Awaiting Fulfillment"]);
      } else if (["cancelled"].includes(selected.orderstatus)) {
        setOrderActions(["Awaiting Fulfillment"]);
      } else if (
        ["pending"].includes(selected.orderstatus) &&
        selected.fulfillment_status === null
      ) {
        setOrderActions(["Awaiting Fulfillment"]);
      } else if (["shipped"].includes(selected.orderstatus)) {
        setOrderActions([]);
      }
    }
  };
  const handleShowFormClose = () => {
    setShowPdfForm(false);
  };
  const handleShowInvoiceClose = () => {
    setShowInvoiceForm(false);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleStoreChanged = (event: SelectChangeEvent) => {
    setSelectedStore(event.target.value);
    getTableData(apiStatus, destination, event.target.value);
  };
  const dispatch = useDispatch();

  const getTableData = async (
    text: string,
    destination: string,
    storeName: string
  ) => {
    setLoading(true);
    if (
      localStorage.getItem("parentuser") != "0" &&
      localStorage.getItem("roles") === ""
    )
      return;
    let status_ids = [] as Array<string>;
    let status_id = "0";
    if (text === "Awaiting Payment") status_id = "7";
    else if (text === "Awaiting Fulfillment") status_id = "11";
    else if (text === "Cancelled") status_id = "5";
    else if (text === "On Hold") status_id = "13";
    else if (text === "Shipped") status_id = "2";
    status_ids.push(status_id);
    let storeNames: any = [] as any;
    console.log(bigcommerceStores);
    console.log(shopifyStores);
    if (storeName == "All") {
      storeNames = [
        ...bigcommerceStores.map((store) => "BigCommerce_" + store),
        ...shopifyStores.map((store) => store.domain),
      ];
      console.log(storeNames);
    } else if (storeName.includes("BigCommerce")) {
      storeNames = [storeName];
    } else if (storeName.includes("shopify")) {
      storeNames = [storeName];
    }
    setLoading(true);
    const promises = storeNames.map((store: any, index: number) => {
      let storeService: any = null;
      if (store.includes("BigCommerce")) storeService = bigcommerceService;
      else if (store.includes("shopify")) storeService = shopifyService;
      return storeService
        .getorders(status_ids, destination, store)
        .then((data: any) => {
          setSelected([]);
          data = JSON.parse(data);
          const newRows = data.map((datarow: any) => {
            const labelValue = datarow.label == "true" ? "[View]" : "";
            const invoiceValue = datarow.invoice === "true" ? "[View]" : "";
            return createData(
              datarow.id,
              datarow.age ? datarow.age + " days" : "",
              datarow.date_created,
              "",
              "",
              datarow.sku,
              datarow.itemname,
              "",
              datarow.recipient,
              datarow.attention,
              datarow.items_total,
              datarow.total_ex_tax,
              labelValue,
              invoiceValue,
              datarow.street,
              datarow.city,
              getStateCodeFromString(datarow.state),
              datarow.country,
              datarow.country_iso2,
              datarow.phone,
              datarow.zip,
              datarow.products,
              datarow.orderstatus,
              datarow.fulfillment_status,
              datarow.order_id,
              datarow.shoptype,
              datarow.storename
            );
          });
          return newRows;
        })
        .catch((error: any) => {
          setLoading(false);
          // Handle errors
          return [];
        });
    });
    Promise.all(promises)
      .then((results) => {
        setLoading(false);
        const newRows = results.flat();
        console.log(newRows);
        setRows(newRows);
      })
      .catch((error) => {
        setLoading(false);
        // Handle errors
      });
  };
  console.log(subscriptionCount);
  const handleCreateLabel = () => {
    if (subscriptionCount <= 0) {
      ToastService.showToast(
        "failed",
        "Sorry, you cannot create a label with free subscription. Please upgrade the subscription"
      );
      navigate("/application/settings/payment");
      return;
    }

    if (!selectedRow) return;
    upsService
      .createLabel(selectedRow.order, shipmentData, accountNumber)
      .then((data) => {
        ToastService.showToast("success", "Label was created.");

        if (selectedRow.shoptype.includes("bigcommerce"))
          bigcommerceService
            .markAsShipped(
              [selectedRow.order_id],
              "UPS",
              data.trackingnumber,
              data.trackingurl
            )
            .then(() => {
              upsService
                .getLabel(selectedRow.order, accountNumber)
                .then((data) => {
                  setImageSource(data.image);
                  setShowPdfForm(true);
                  getTableData(apiStatus, destination, selectedStore);
                })
                .catch((error) => {
                  ToastService.showToast("failed", error.response.data.status);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        else if (selectedRow.shoptype.includes("shopify"))
          shopifyService
            .markAsShipped(
              [selectedRow.order_id],
              selectedRow.storename,
              "UPS",
              data.trackingnumber,
              data.trackingurl
            )
            .then(() => {
              upsService
                .getLabel(selectedRow.order, accountNumber)
                .then((data) => {
                  setImageSource(data.image);
                  setShowPdfForm(true);
                  getTableData(apiStatus, destination, selectedStore);
                })
                .catch((error) => {
                  setLoading(false);
                  ToastService.showToast("failed", error.response.data.status);
                });
            })
            .catch((error) => {});
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.data && error.response.data.data) {
          ToastService.showToast("failed", error.response.data.data);
        }
      });
  };
  const handleMarkAsShipped = () => {
    if (selectedStore.includes("BigCommerce")) {
      bigcommerceService
        .markAsShipped(
          selectedRows,
          tracking_info.carrier,
          tracking_info.tracking_number,
          tracking_info.tracking_url
        )
        .then((data) => {
          getTableData("Shipped", destination, selectedStore);
          // setSelectedText("Shipped");
        })
        .catch((error) => {
          setLoading(false);
          ToastService.showToast("failed", error.data.statusText);
        });
    } else if (selectedStore.includes("myshopify.com")) {
      const orderIdsArray = rows
        .filter((row: TableDatatype) => selectedRows.includes(row.order))
        .map((row) => row.order_id);
      shopifyService
        .markAsShipped(
          orderIdsArray,
          selectedStore,
          tracking_info.carrier,
          tracking_info.tracking_number,
          tracking_info.tracking_url
        )
        .then((data) => {
          getTableData("Shipped", destination, selectedStore);
          // setSelectedText("Shipped");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          ToastService.showToast("failed", error?.response?.data?.data[0]);
        });
    } else {
      ToastService.showToast("failed", "Select a store");
    }
  };
  const handleClose = (text: string) => {
    if (selectedStore == "All") {
      ToastService.showToast("failed", "Select a Store");
      setAnchorEl(null);
      return;
    }
    if (text === "Shipped") {
      setAnchorEl(null);
      setShowTrackingInfo(true);
      return;
    }
    if (typeof text === "string") {
      // text is a string
      //shpped:2, awaitingshipment:9,canceled:5,Awaiting payment:7
      if (selectedStore.includes("BigCommerce")) {
        let status_id = 0;
        if (text === "Awaiting Payment") {
          status_id = 7;
        } else if (text === "Awaiting Fulfillment") {
          setShowButton(true);
          status_id = 11;
        } else if (text === "Cancelled") {
          status_id = 5;
        } else if (text === "On Hold") status_id = 13;
        setLoading(true);
        bigcommerceService
          .updateToShipment(selectedRows, status_id)
          .then((data) => {
            getTableData(text, destination, selectedStore);
          })
          .catch((error) => {
            setLoading(false);
            ToastService.showToast("failed", error.response.statusText);
          });
      } else if (selectedStore.includes("myshopify.com")) {
        setLoading(true);
        const orderIdsArray = rows
          .filter((row: TableDatatype) => selectedRows.includes(row.order))
          .map((row) => row.order_id);
        shopifyService
          .updateToShipment(orderIdsArray, text, selectedStore)
          .then((data) => {
            getTableData(text, destination, selectedStore);
          })
          .catch((error) => {
            setLoading(false);
            ToastService.showToast("failed", error.response.statusText);
          });
      }
    }
    setAnchorEl(null);
  };
  function handleSelectionChange(selected: string[]) {
    setSelectedRows(selected);
  }
  function handleViewPdfChange(order: string) {
    setLoading(true);

    upsService
      .getLabel(order, accountNumber)
      .then((data) => {
        setImageSource(data.image);
        setShowPdfForm(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        ToastService.showToast("failed", error.response.data.status);
      });
  }
  function handleViewInvoiceChange(order: string) {
    setLoading(true);

    upsService
      .getInvoice(order, accountNumber)
      .then((data) => {
        setLoading(false);
        if (data?.data?.response?.errors[0]?.message) {
          ToastService.showToast(
            "Error code:" + data?.data?.response?.errors[0]?.code,
            data?.data?.response?.errors[0]?.message
          );
        }
        setShowInvoiceForm(true);

        setImageSource(data.invoice);
      })
      .catch((error) => {
        setLoading(false);
        if (
          error.response &&
          error.response.data &&
          error.response.data.status
        ) {
          ToastService.showToast("failed", error.response.data.status);
        }
      });
  }
  const handleDestinationChange = (event: SelectChangeEvent) => {
    setDestination(event.target.value);
    getTableData(apiStatus, event.target.value, selectedStore);
  };
  const handleRefreshRate = () => {
    getServices(shipmentData);
  };
  useEffect(() => {
    Promise.all([
      shopifyService.getShopifyStores(),
      bigcommerceService.getBigCommerceStores(),
    ])
      .then(([shopifyData, bigcommerceData]) => {
        if (shopifyData.result) setShopifyStores(shopifyData.data);
        setBigCommerceStores(
          bigcommerceData.data.map((item: any) => item.name)
        );
      })
      .catch((error) => {
        setShopifyStores([] as Array<any>);
        setBigCommerceStores([] as Array<any>);
      })
      .finally(() => {});
    upsService
      .getUsers()
      .then(
        (data) => {
          data = JSON.parse(data);
          dispatch(setUpsAccounts(data.carriers));
          data.carriers.map((dataRow: UpsUsersRowData) => {
            if (dataRow.selected === true) {
              dispatch(setAccountNumber(dataRow.accountNumber));
            }
          });
        },
        (error) => {
          if (error.response.status === 401) {
          }
        }
      )
      .catch((error: any) => {});
    paymentService
      .getSubscriptions()
      .then((data) => {
        if (data.data.result == "success") {
          dispatch(setSubscriptionCount(data.data.count));
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // getTableData(["Awaiting Fulfillment"], "All", "All");
    // setShowButton(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (shopifyStores.length > 0 || bigcommerceStores.length > 0) {
      getTableData("Awaiting Fulfillment", "All", "All");
    }
  }, [shopifyStores, bigcommerceStores]);
  console.log(subscriptionCount);
  useEffect(() => {
    if (
      shipmentData.service_code != "" &&
      shipmentData.service_code != undefined &&
      shipmentData.weight != 0
    )
      upsService
        .getOrderRate(debouncedShipmentData, accountNumber)
        .then((data) => {
          setTotalCharges(data.data.RateResponse.RatedShipment);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [debouncedShipmentData]);

  useEffect(() => {
    getTableData(apiStatus, destination, selectedStore);
  }, [apiStatus]);

  return (
    <>
      <ToastService.MyToastContainer />
      <LabelView
        open={showPdfForm}
        handleClose={handleShowFormClose}
        imageSource={imageSource}
      />
      <InvoiceView
        open={showInvoiceForm}
        handleClose={handleShowInvoiceClose}
        imageSource={imageSource}
      />
      <TrackingDialog
        formData={tracking_info}
        onChange={(v) => {
          setTrackingInfo(v);
        }}
        onClose={() => {
          setShowTrackingInfo(false);
          handleMarkAsShipped();
        }}
        open={showTrackingInfo}
      ></TrackingDialog>
      {loading && <LoadingCircle />}
      <div className="w-full mt-[75px] ">
        <div className="w-full flex">
          <div
            style={{ height: `calc(100vh - 145px)` }}
            className="w-full flex-1 items-start justify-between p-4 relative"
          >
            <div className="w-full flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex">
                  <Select
                    value={selectedStore}
                    size="small"
                    sx={{
                      fontSize: "14px",
                    }}
                    onChange={handleStoreChanged}
                  >
                    <MenuItem
                      value={"All"}
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      All Stores
                    </MenuItem>

                    {bigcommerceStores.map((item, index: number) => (
                      <MenuItem
                        value={"BigCommerce(" + item + ")"}
                        key={"big" + index}
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        BigCommerce{"(" + item + ")"}
                      </MenuItem>
                    ))}
                    {shopifyStores.map((item, index: number) => (
                      <MenuItem
                        value={item.domain}
                        key={"shopify" + index}
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        Shopify{"(" + item.domain + ")"}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography className="w-[100px] text-right flex items-center justify-end">
                    Destination:
                  </Typography>
                  <Select
                    value={destination}
                    size="small"
                    sx={{
                      fontSize: "14px",
                    }}
                    onChange={handleDestinationChange}
                  >
                    <MenuItem
                      key={0}
                      value={"All"}
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      All
                    </MenuItem>
                    <MenuItem
                      key={1}
                      value={"Domestic"}
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Domestic
                    </MenuItem>
                    <MenuItem
                      key={2}
                      value={"International"}
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      International
                    </MenuItem>
                  </Select>
                </div>
                <div className="text-2xl pb-2 pr-2">
                  {selectedStore == "" ? "All Stores" : selectedStore}
                </div>
                <div className="flex">
                  {selectedRows.length > 0 ? (
                    <Button
                      id="customized-button"
                      aria-controls={
                        menubuttonopen ? "customized-menu" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={menubuttonopen ? "true" : undefined}
                      variant="contained"
                      disableElevation
                      sx={{ textTransform: "none" }}
                      onClick={handleClick}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      Order Action
                    </Button>
                  ) : null}

                  <StyledMenu
                    id="customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "customized-button",
                    }}
                    anchorEl={anchorEl}
                    open={menubuttonopen}
                    onClose={handleClose}
                  >
                    {orderActions.map((text, index) => {
                      return (
                        <MenuItem
                          key={index}
                          onClick={() => handleClose(text)}
                          disableRipple
                        >
                          {text === "Awaiting Payment" ? (
                            <Payments />
                          ) : text === "On Hold" ? (
                            <DataThresholding />
                          ) : text === "Awaiting Fulfillment" ? (
                            <LocalShipping />
                          ) : text === "Shipped" ? (
                            <CardMembership />
                          ) : text === "Cancelled" ? (
                            <CancelScheduleSend />
                          ) : (
                            text
                          )}
                          {text}
                        </MenuItem>
                      );
                    })}
                  </StyledMenu>
                </div>
              </div>

              <EnhancedTable
                rows={rows}
                onSelectionChange={handleSelectionChange}
                onViewPdfChange={handleViewPdfChange}
                onViewInvoiceChange={handleViewInvoiceChange}
                selectedRow={selectedRow}
                selectedRowChanged={handleSelectedRowChanged}
                selected={selected}
                setSelected={setSelected}
                selectedState={apiStatus}
              />
            </div>
            {/* <TotalCharges
              hovered={isHovered}
              formData={totalCharges}
              createLabel={handleCreateLabel}
            /> */}
          </div>
          <div
            style={{
              width: 350,
              display: showRight ? "block" : "",
            }}
            className={showRight ? "" : "xl:block hidden"}
          >
            <ShipComponent
              onUpdateRow={(v: TableDatatype) => {
                setShipmentData((prev) => ({
                  ...prev,
                  products: v?.products ?? [],
                }));
                setSelectedRow(v);

                const selectedRowIndex = rows.findIndex(
                  (item) => item.order === v.order
                );
                if (selectedRowIndex != -1) {
                  let newRows: TableDatatype[] = [];
                  newRows = newRows.concat(
                    rows.slice(0, selectedRowIndex),
                    v,
                    rows.slice(selectedRowIndex + 1)
                  );
                  setRows(newRows);
                }
              }}
              onShipmentChange={(
                v: ShipmentData | ((s: ShipmentData) => ShipmentData)
              ) => {
                console.log(v);
                setShipmentData(v);
              }}
              onServicesParamChange={(v: ShipmentData) => {
                getServices(v);
              }}
              minServiceCode={minServiceCode}
              services={services}
              shipmentData={shipmentData}
              selectedRow={selectedRow}
              showButton={showButton}
              onCreateLabelClicked={handleCreateLabel}
            ></ShipComponent>
            <TotalCharges
              hovered={isHovered}
              formData={totalCharges}
              createLabel={handleCreateLabel}
              refreshRate={handleRefreshRate}
            />
          </div>
        </div>
      </div>
    </>
  );
}
