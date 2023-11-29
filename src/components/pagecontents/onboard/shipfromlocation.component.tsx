import { useState, useEffect, useMemo } from "react";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { countryCodeEmoji, emojiCountryCode } from "country-code-emoji";
import ReactCountryFlag from "react-country-flag";
import countryList from "react-select-country-list";
interface ShipLocationsDialogProps {
  open: boolean;
  handleClose: () => void;
  handleAddLocation: () => void;
  onFromChange: (name: string, value: string | number) => void;
}
type InputLabelProps = {
  label: string;
  name: string;
  handleLabelChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function ShipFromLocationsDialog(
  props: ShipLocationsDialogProps
) {
  const { open, handleClose, handleAddLocation, onFromChange } = props;
  const options = useMemo(() => countryList().getData(), []);
  const [countryValue, setCountryValue] = useState("CA");
  console.log(countryValue);
  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFromChange(event.target.name, event.target.value);
  };
  const handleCountryChange = (event: SelectChangeEvent) => {
    onFromChange("shipfrom_countrycode", event.target.value);
    setCountryValue(event.target.value);
  };
  useEffect(() => {
    onFromChange("shipfrom_countrycode", "CA");
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ mb: 2 }}>Ship From Locations</DialogTitle>
        <DialogContent>
          <div>
            <Grid container spacing={2}>
              <Grid xs={12} sx={{ pb: 2, pt: 2 }} md={6}>
                <InputLabelTxt
                  label="Full Name"
                  name="shipfrom_fullName"
                  handleLabelChange={handleLabelChange}
                />
              </Grid>
              <Grid xs={12} sx={{ pb: 2, pt: 2 }} md={6}>
                <InputLabelTxt
                  label="Attention Name"
                  name="shipfrom_attentionname"
                  handleLabelChange={handleLabelChange}
                />
              </Grid>
              <Grid xs={12} sx={{ pb: 2 }} md={3}>
                <InputLabelTxt
                  label="Phone"
                  name="shipfrom_phone"
                  handleLabelChange={handleLabelChange}
                />
              </Grid>
              <Grid xs={12} sx={{ pb: 2 }} md={3}>
                <InputLabelTxt
                  label="FaxNumber"
                  name="shipfrom_fax"
                  handleLabelChange={handleLabelChange}
                />
              </Grid>
              <Grid xs={12} sx={{ pb: 2 }} md={6}>
                <InputLabelTxt
                  label="Address Line"
                  name="shipfrom_address"
                  handleLabelChange={handleLabelChange}
                />
              </Grid>
              <Grid xs={12} sx={{ pb: 2 }} md={12}>
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
                    name="shipfrom_countrycode"
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
                        {"(" +
                          countryCodeEmoji(country.value) +
                          ") " +
                          country.label}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </Grid>
              <Grid xs={12} sx={{ pb: 2 }} md={6}>
                <InputLabelTxt
                  label="City"
                  name="shipfrom_city"
                  handleLabelChange={handleLabelChange}
                />
              </Grid>

              <Grid xs={12} sx={{ pb: 2 }} md={3}>
                <InputLabelTxt
                  label="State Code"
                  name="shipfrom_statecode"
                  handleLabelChange={handleLabelChange}
                />
              </Grid>
              <Grid xs={12} sx={{ pb: 2 }} md={3}>
                <InputLabelTxt
                  label="PostalCode"
                  name="shipfrom_postalcode"
                  handleLabelChange={handleLabelChange}
                />
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddLocation}>Add Location</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const InputLabelTxt: React.FC<InputLabelProps> = ({
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
          fontSize: "14px",
        },
        "& .MuiOutlinedInput-input": {
          fontSize: "14px",
        },
      }}
    />
  );
};
