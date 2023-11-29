import React, { FC, PropsWithChildren, useMemo, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import countryCodeEmoji from "country-code-emoji";
import countryList from "react-select-country-list";
export interface ProductDataType {
  id: number;
  description: string;
  quantity: number;
  sku: string;
  value: string;
  unitsOfMeasure: string;
  harmonisation: string;
  countryCode: string;
}
const ShipProductForm: FC<
  PropsWithChildren<{
    data: ProductDataType;
    onChange: (p: ProductDataType) => void;
  }>
> = ({ data = {} as ProductDataType, onChange = () => null }) => {
  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = { ...data, [event.target.name]: event.target.value };
    if (updatedData) onChange(updatedData as ProductDataType);
  };
  const options = useMemo(() => countryList().getData(), []);
  const handleDeclarationCountryChange = (event: SelectChangeEvent) => {
    const updatedData = { ...data, ["countryCode"]: event.target.value };
    if (updatedData) onChange(updatedData as ProductDataType);
  };
  return (
    <div className="w-full">
      <Grid container spacing={2}>
        <Grid xs={12} md={12}>
          <Typography>Product</Typography>
        </Grid>
        <Grid xs={12} md={12}>
          <TextField
            className="w-full"
            variant="outlined"
            label="Description"
            name="description"
            size="small"
            value={data?.description}
            onChange={handleLabelChange}
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
        <Grid xs={12} md={12}>
          <TextField
            className="w-full"
            variant="outlined"
            label="SKU"
            name="sku"
            size="small"
            value={data?.sku}
            onChange={handleLabelChange}
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
        <Grid xs={12} md={5}>
          <TextField
            className="w-full"
            variant="outlined"
            label="Quantity"
            name="quantity"
            size="small"
            value={data?.quantity}
            onChange={handleLabelChange}
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
        <Grid xs={12} md={7}>
          <TextField
            className="w-full"
            variant="outlined"
            label="Item Value"
            name="value"
            size="small"
            value={data?.value}
            onChange={handleLabelChange}
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
        <Grid xs={12} md={12}>
          <TextField
            className="w-full"
            variant="outlined"
            label="Total Value"
            name="totalvalue"
            size="small"
            value={(data?.quantity ?? 0) * parseFloat(data?.value ?? "0")}
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
        <Grid xs={12} md={12}>
          <TextField
            className="w-full"
            variant="outlined"
            label="Harmonisation"
            name="harmonisation"
            size="small"
            value={data?.harmonisation}
            onChange={handleLabelChange}
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
        <Grid xs={12} md={12}>
          <div className="flex">
            <ReactCountryFlag
              className="mr-1 border border-gray-200 shadow-md rounded-md"
              style={{ width: "32px", height: "32px" }}
              countryCode={data?.countryCode ?? ""}
              svg
              cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
              cdnSuffix="svg"
              title={data?.countryCode ?? ""}
            />
            <Select
              value={data?.countryCode ?? ""}
              size="small"
              onChange={handleDeclarationCountryChange}
              className="w-full"
              sx={{
                fontSize: "14px",
              }}
            >
              {options.map((country) => (
                <MenuItem
                  id={country.value}
                  key={country.value}
                  value={country.value}
                  sx={{
                    fontSize: "14px",
                  }}
                >
                  {"(" + countryCodeEmoji(country.value) + ") " + country.label}
                </MenuItem>
              ))}
            </Select>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ShipProductForm;
