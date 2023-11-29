import {
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { InternationalFormData } from "../ship.component";
import upsService from "../../../../../services/ups.service";
import {
  ContentTypes,
  TermsOfSaleItems,
} from "../../../settings/international/internationalsettings.component";
const InternationalForm: React.FC<
  PropsWithChildren<{
    rowId: string;
    formData: InternationalFormData;
    onChange: (p: InternationalFormData) => void;
  }>
> = ({ rowId, formData, onChange }) => {
  const handleReasonForExportChange = (event: any) => {
    const updatedFormData = {
      ...formData,
      reasonForExport: event.target.value,
    };
    onChange(updatedFormData);
  };

  const handleTermsOfSaleChange = (event: any) => {
    const updatedFormData = {
      ...formData,
      termsOfSale: event.target.value,
    };
    onChange(updatedFormData);
  };
  const handleInputBoxChange = (event: any) => {
    const updatedFormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    console.log(updatedFormData);
    onChange(updatedFormData);
  };
  const handleCurrencyCode = (event: SelectChangeEvent<string>) => {
    const updatedFormData = {
      ...formData,
      curCode: event.target.value,
    };
    onChange(updatedFormData);
  };
  console.log(rowId);
  useEffect(() => {
    upsService
      .getInternationalSettings()
      .then((customData) => {
        const customDeclarationData = JSON.parse(customData);
        console.log(customDeclarationData);
        const updatedFormData = {
          ...formData,
          reasonForExport: customDeclarationData?.data?.defaultContentType,
          termsOfSale: customDeclarationData?.data?.termsOfSale,
          declarationStatement:
            customDeclarationData?.data?.declarationStatement == "Standard" ||
            customDeclarationData?.data?.declarationStatement == ""
              ? "I hereby certify that the information on this invoice is true and correct and the contents and value of this shipment is as stated above."
              : "",
        };
        console.log(updatedFormData);
        onChange(updatedFormData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [rowId]);

  return (
    <div className="w-full">
      <Grid container spacing={2} className="pt-2">
        <Grid item xs={12} sm={12} md={12}>
          <FormControl
            className="w-full"
            variant="outlined"
            sx={{ minWidth: 120 }}
          >
            <InputLabel id="reasonSelect">Reason For Export</InputLabel>
            <Select
              className="w-full"
              value={
                formData.reasonForExport ? formData.reasonForExport : "SALE"
              }
              labelId="reasonSelect"
              label="Reason For Export"
              size="small"
              sx={{
                fontSize: "14px",
              }}
              onChange={handleReasonForExportChange}
            >
              {ContentTypes.map((item, index: number) => (
                <MenuItem
                  value={item.name}
                  key={index}
                  sx={{ fontSize: "14px" }}
                >
                  {item.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            className="w-full"
            variant="outlined"
            label="ShipmentDescription"
            name={"shipmentDescription"}
            size="small"
            value={formData.shipmentDescription}
            onChange={handleInputBoxChange}
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-input": {
                fontSize: "14px",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            className="w-full"
            variant="outlined"
            label="InvoiceNumber"
            name="invoiceNumber"
            size="small"
            value={formData.invoiceNumber}
            onChange={handleInputBoxChange}
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-input": {
                fontSize: "14px",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            className="w-full"
            variant="outlined"
            label="Purchase Order"
            name="purchaseOrder"
            size="small"
            value={formData.purchaseOrder}
            onChange={handleInputBoxChange}
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-input": {
                fontSize: "14px",
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <FormControl
            className="w-full"
            variant="outlined"
            sx={{ minWidth: 120 }}
          >
            <InputLabel
              id="termSelect"
              className="mt-[-7px]"
              sx={{
                fontSize: "14px",
              }}
            >
              Term Of Sale
            </InputLabel>
            <Select
              className="w-full"
              value={formData.termsOfSale}
              labelId="termSelect"
              label="Term Of Sale"
              size="small"
              sx={{
                fontSize: "14px",
              }}
              onChange={handleTermsOfSaleChange}
            >
              {TermsOfSaleItems.map((item, index: number) => (
                <MenuItem
                  value={item.name}
                  key={index}
                  sx={{ fontSize: "14px" }}
                >
                  {item.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            className="w-full"
            variant="outlined"
            label="Additional Comment"
            name={"additionalComment"}
            size="small"
            value={formData.additionalComment}
            onChange={handleInputBoxChange}
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-input": {
                fontSize: "14px",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            className="w-full"
            variant="outlined"
            label="Declaration Statement"
            name={"declarationStatement"}
            size="small"
            value={formData.declarationStatement}
            onChange={handleInputBoxChange}
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-input": {
                fontSize: "14px",
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Divider
            style={{
              flexGrow: 1,
              marginLeft: "0.5rem",
              marginRight: "0.5rem",
            }}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
          <FormControl
            className="w-full"
            variant="outlined"
            sx={{ minWidth: 120 }}
          >
            <InputLabel id="curCode">Currency Code</InputLabel>
            <Select
              className="w-full"
              value={formData.curCode}
              name="curCode"
              label="Currency Code"
              labelId="curCode"
              size="small"
              sx={{
                fontSize: "14px",
              }}
              onChange={handleCurrencyCode}
            >
              <MenuItem key="CAD" value="CAD" sx={{ fontSize: "14px" }}>
                CAD
              </MenuItem>
              <MenuItem key="USD" value="USD" sx={{ fontSize: "14px" }}>
                USD
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            className="w-full"
            variant="outlined"
            label="Discount/Rebate"
            name={"discount"}
            size="small"
            value={formData.discount}
            onChange={handleInputBoxChange}
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-input": {
                fontSize: "14px",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            className="w-full"
            variant="outlined"
            label="Freight Charges"
            name={"freightCharge"}
            size="small"
            value={formData.freightCharge}
            onChange={handleInputBoxChange}
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-input": {
                fontSize: "14px",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            className="w-full"
            variant="outlined"
            label="Insurance"
            name={"insurance"}
            size="small"
            value={formData.insurance}
            onChange={handleInputBoxChange}
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-input": {
                fontSize: "14px",
              },
            }}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <TextField
            className="w-full"
            variant="outlined"
            label="Other Charge"
            name={"otherCharge"}
            size="small"
            value={formData.otherCharge}
            onChange={handleInputBoxChange}
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-input": {
                fontSize: "14px",
              },
            }}
          />
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          <TextField
            className="w-full"
            variant="outlined"
            label="If there are other charges,please specify"
            name={"specify"}
            size="small"
            value={formData.specify}
            onChange={handleInputBoxChange}
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-input": {
                fontSize: "14px",
              },
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default InternationalForm;
