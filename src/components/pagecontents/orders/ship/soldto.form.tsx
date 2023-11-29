import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { PropsWithChildren, useMemo } from "react";
import { SoldTo } from "./ship.component";
import ReactCountryFlag from "react-country-flag";
import { countryCodeEmoji } from "country-code-emoji";
import countryList from "react-select-country-list";
import SearchInput from "./address/SearchInput";
const SoldToForm: React.FC<
  PropsWithChildren<{
    formData: SoldTo;
    onChange: (v: SoldTo) => void;
  }>
> = ({ formData, onChange }) => {
  const options = useMemo(() => countryList().getData(), []);
  const handleSoldToLabelChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    const updatedData = { ...formData, [name]: value };
    onChange(updatedData);
  };
  const handleCountryChange = (event: SelectChangeEvent) => {
    const updatedData = {
      ...formData,
      countryCode: event.target.value,
    };
    onChange(updatedData);
  };
  const onChangeAddress = (curRow: any) => {
    const countryItem = options.find(
      (item) => item.label === curRow.address.countryName
    );
    const updatedData = {
      ...formData,
      countryCode: String(countryItem?.value),
      street: curRow.address.label.split(",")[0],
      postalCode: curRow.address.postalCode,
      stateCode: curRow.address.stateCode,
      city: curRow.address.city,
    };
    onChange(updatedData);
  };
  return (
    <div>
      <Grid container spacing={2} className="pt-2">
        <Grid xs={12} md={6}>
          <TextField
            className="w-full"
            variant="outlined"
            label="CompanyName"
            name="companyName"
            size="small"
            value={formData.companyName || ""}
            onChange={handleSoldToLabelChange}
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
        <Grid xs={12} md={6}>
          <TextField
            className="w-full"
            variant="outlined"
            label="Attention Name"
            name="attentionName"
            size="small"
            value={formData.attentionName || ""}
            onChange={handleSoldToLabelChange}
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
            label="Phone"
            name="phone"
            size="small"
            value={formData.phone || ""}
            onChange={handleSoldToLabelChange}
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
          <SearchInput
            searchInputValue={formData?.street || ""}
            placeholder="Address"
            options={[]}
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
            value={formData?.street || ""}
            onChange={handleSoldToLabelChange}
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

        <Grid xs={12} md={12} style={{ display: "none" }}>
          <TextField
            className="w-full"
            variant="outlined"
            label="Address Line"
            name="street"
            size="small"
            value={formData.street || ""}
            onChange={handleSoldToLabelChange}
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
            {formData ? (
              <ReactCountryFlag
                className="mr-1 border border-gray-200 shadow-md rounded-md"
                style={{ width: "32px", height: "32px" }}
                countryCode={formData?.countryCode ?? ""}
                svg
                cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                cdnSuffix="svg"
                title={formData?.countryCode ?? ""}
              />
            ) : null}
            <Select
              value={formData?.countryCode ?? ""}
              size="small"
              onChange={handleCountryChange}
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
        <Grid xs={12} md={12}>
          <TextField
            className="w-full"
            variant="outlined"
            label="City"
            name="city"
            size="small"
            value={formData?.city || ""}
            onChange={handleSoldToLabelChange}
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
        <Grid xs={12} md={6}>
          <TextField
            className="w-full"
            variant="outlined"
            label="State Code"
            name="stateCode"
            size="small"
            value={formData?.stateCode ?? ""}
            onChange={handleSoldToLabelChange}
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
        <Grid xs={12} md={6}>
          <TextField
            className="w-full"
            variant="outlined"
            label="PostalCode"
            name="postalCode"
            size="small"
            value={formData?.postalCode || ""}
            onChange={handleSoldToLabelChange}
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
        <Grid xs={12} md={6}>
          <TextField
            className="w-full"
            variant="outlined"
            label="Tax ID"
            name="taxId"
            size="small"
            value={formData?.taxId || ""}
            onChange={handleSoldToLabelChange}
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
        <Grid xs={12} md={6}>
          <TextField
            className="w-full"
            variant="outlined"
            label="Email"
            name="email"
            size="small"
            value={formData?.email || ""}
            onChange={handleSoldToLabelChange}
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

export default SoldToForm;
