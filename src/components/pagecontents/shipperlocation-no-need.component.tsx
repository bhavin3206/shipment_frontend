import { Save } from "@mui/icons-material";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import upsService from "../../services/ups.service";
import { Context } from "../../provider/ContextProvider";
import Grid from "@mui/material/Unstable_Grid2";
import { countryCodeEmoji, emojiCountryCode } from "country-code-emoji";
import ReactCountryFlag from "react-country-flag";
import countryList from "react-select-country-list";
import ToastService from "../toast/toast.component";

export interface ShipperLocation {
  shipper_fullName: string;
  shipper_attentionname: string;
  shipper_taxidnum: string;
  shipper_phone: string;
  shipper_number: string;
  shipper_fax: string;
  shipper_address: string;
  shipper_city: string;
  shipper_statecode: string;
  shipper_postalcode: string;
  shipper_countrycode: string;
}
type InputLabelProps = {
  label: string;
  name: string;
  value: string;
  handleLabelChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const ShipperLocation = () => {
  const { state } = useContext(Context);
  const options = useMemo(() => countryList().getData(), []);
  const [countryValue, setCountryValue] = useState("CA");
  const handleCountryChange = (event: SelectChangeEvent) => {
    setCountryValue(event.target.value);
    handleShipperChange("shipper_countrycode", event.target.value);
  };
  const [shipperLocation, setShipperLocationData] = useState<ShipperLocation>({
    shipper_fullName: "",
    shipper_attentionname: "",
    shipper_taxidnum: "",
    shipper_phone: "",
    shipper_number: "",
    shipper_fax: "",
    shipper_address: "",
    shipper_city: "",
    shipper_statecode: "",
    shipper_postalcode: "",
    shipper_countrycode: "",
  });
  const handleSaveClick = () => {
    upsService
      .addUser(shipperLocation)
      .then(() => {
        ToastService.showToast("success", "Shipper information saved");
      })
      .catch((error) => {
        ToastService.showToast("failed", "Error");
      });
  };
  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    handleShipperChange(name, value);
  };
  const handleShipperChange = (name: string, value: string) => {
    setShipperLocationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    handleShipperChange("shipper_countrycode", countryValue);
    upsService
      .getUsers()
      .then((data) => {
        const shipperLocation: ShipperLocation = {
          shipper_fullName: data.fullName,
          shipper_attentionname: data.attentionname,
          shipper_taxidnum: data.taxidnum,
          shipper_phone: data.phone,
          shipper_number: data.shipperno,
          shipper_fax: data.fax,
          shipper_address: data.address,
          shipper_city: data.city,
          shipper_statecode: data.statecode,
          shipper_postalcode: data.postalcode,
          shipper_countrycode: data.countrycode,
        };
        setCountryValue(data.countrycode);
        setShipperLocationData(shipperLocation);
      })
      .catch((error) => {
        console.log(error);
        ToastService.showToast("failed", "Error");
      });
  }, []);
  return (
    <div>
      <div className=" mt-4 mb-4">
        <Typography variant="h5" className="text-center" gutterBottom>
          User Profile
        </Typography>
      </div>
      <Box className="rounded-lg mb-4 border border-gray-300 shadow-md " sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={12} sx={{ p: 1 }} md={12}>
            <Typography variant="h6" className="text-center" gutterBottom>
              🚛 Shipper Information 📍
            </Typography>
          </Grid>
          <Grid xs={12} sx={{ p: 1 }} md={4}>
            <InputLabelTxt
              label="Full Name"
              name="shipper_fullName"
              value={shipperLocation.shipper_fullName}
              handleLabelChange={handleLabelChange}
            />
            {/* <InputLabel
              shrink={shipperLocation.shipper_fullName !== ""}
              htmlFor="shipper_fullName"
            >
              Full Name
            </InputLabel> */}
          </Grid>
          <Grid xs={12} sx={{ p: 1 }} md={4}>
            <InputLabelTxt
              label="Attention Name"
              name="shipper_attentionname"
              value={shipperLocation.shipper_attentionname}
              handleLabelChange={handleLabelChange}
            />
          </Grid>
          <Grid xs={12} sx={{ p: 1 }} md={4}>
            <InputLabelTxt
              label="TaxIdentificationNumber"
              name="shipper_taxidnum"
              value={shipperLocation.shipper_taxidnum}
              handleLabelChange={handleLabelChange}
            />
          </Grid>
          <Grid xs={12} sx={{ p: 1 }} md={6}>
            <InputLabelTxt
              label="Phone"
              name="shipper_phone"
              value={shipperLocation.shipper_phone}
              handleLabelChange={handleLabelChange}
            />
          </Grid>
          <Grid xs={12} sx={{ p: 1 }} md={3}>
            <InputLabelTxt
              label="Shipper No"
              name="shipper_number"
              value={shipperLocation.shipper_number}
              handleLabelChange={handleLabelChange}
            />
          </Grid>
          <Grid xs={12} sx={{ p: 1 }} md={3}>
            <InputLabelTxt
              label="FaxNo"
              name="shipper_fax"
              value={shipperLocation.shipper_fax}
              handleLabelChange={handleLabelChange}
            />
          </Grid>

          <Grid xs={12} sx={{ p: 1 }} md={5}>
            <InputLabelTxt
              label="Address Line"
              name="shipper_address"
              value={shipperLocation.shipper_address}
              handleLabelChange={handleLabelChange}
            />
          </Grid>
          <Grid xs={12} sx={{ p: 1 }} md={7}>
            <div className="flex">
              <ReactCountryFlag
                className="mr-1 border border-gray-200 shadow-md rounded-md"
                style={{ width: "32px", height: "32px" }}
                countryCode={countryValue ? countryValue : ""}
                svg
                cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                cdnSuffix="svg"
                title={countryValue ? countryValue : ""}
              />
              <Select
                value={countryValue}
                size="small"
                name="shipper_countrycode"
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
          <Grid xs={12} sx={{ p: 1 }} md={4}>
            <InputLabelTxt
              label="City"
              name="shipper_city"
              value={shipperLocation.shipper_city}
              handleLabelChange={handleLabelChange}
            />
          </Grid>
          <Grid xs={12} sx={{ p: 1 }} md={4}>
            <InputLabelTxt
              label="State Code"
              name="shipper_statecode"
              value={shipperLocation.shipper_statecode}
              handleLabelChange={handleLabelChange}
            />
          </Grid>
          <Grid xs={12} sx={{ p: 1 }} md={4}>
            <InputLabelTxt
              label="PostalCode"
              name="shipper_postalcode"
              value={shipperLocation.shipper_postalcode}
              handleLabelChange={handleLabelChange}
            />
          </Grid>

          <Grid xs={12} sx={{ p: 1 }} md={10}></Grid>
          <Grid xs={12} sx={{ p: 1 }} md={2}>
            <Button variant="outlined" startIcon={<Save />} onClick={handleSaveClick}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
const InputLabelTxt: React.FC<InputLabelProps> = ({ label, name, value, handleLabelChange }) => {
  return (
    <TextField
      className="w-full"
      variant="outlined"
      label={label}
      value={value}
      name={name}
      size="small"
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
  );
};
export default ShipperLocation;
