import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { PropsWithChildren, useMemo, useState } from "react";
import ToastService from "../../../toast/toast.component";
import { TaxData } from "./internationalsettings.component";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ReactCountryFlag from "react-country-flag";
import countryCodeEmoji from "country-code-emoji";
import countryList from "react-select-country-list";
import upsService from "../../../../services/ups.service";
const AddTaxDialog: React.FC<
  PropsWithChildren<{
    open: boolean;
    onClose: () => void;
    onAdd: (p: TaxData) => void;
  }>
> = ({ open, onClose, onAdd }) => {
  const [taxRow, setTaxRow] = useState({
    idType: "",
    authority: "CA",
    description: "",
    nickname: "",
    number: "",
  } as TaxData);
  const handleValueChanged = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setTaxRow((prev) => ({ ...prev, [name]: value }));
  };
  const handleTextValueChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setTaxRow((prev) => ({ ...prev, [name]: value }));
  };
  const handleClose = () => {
    onClose();
  };
  const handleAddPackage = () => {
    upsService
      .addTax(taxRow)
      .then((data) => {
        onAdd(taxRow);
        onClose();
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.data)
          ToastService.showToast("failed", error.response.data.data);
      });
    // onAdd(res as TaxData);
  };
  const options = useMemo(() => countryList().getData(), []);
  return (
    <div>
      <ToastService.MyToastContainer />
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        PaperProps={{ sx: { width: "100%", height: "70%" } }}
      >
        <DialogTitle>Add Tax</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%" }}>
            <Grid2 container>
              <Grid2 xs={12} md={12}>
                <Typography className="mt-2 text-left ">Tax Id Type</Typography>
              </Grid2>
              <Grid2 xs={12} md={12}>
                <Select
                  labelId="idType"
                  name="idType"
                  value={taxRow.idType}
                  size="small"
                  sx={{ fontSize: "12px" }}
                  onChange={handleValueChanged}
                  fullWidth
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
                      sx={{ fontSize: "12px" }}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </Grid2>
              <Grid2 xs={12} md={12} style={{ marginTop: "16px" }}>
                <Typography className="mt-2 text-left ">
                  Issuing Authority
                </Typography>
              </Grid2>
              <Grid2 xs={12} md={12}>
                <div className="flex pt-2">
                  <ReactCountryFlag
                    className="mr-1 border border-gray-200 shadow-md rounded-md"
                    style={{ width: "32px", height: "32px" }}
                    countryCode={taxRow.authority ? taxRow.authority : ""}
                    svg
                    cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                    cdnSuffix="svg"
                    title={taxRow.authority ? taxRow.authority : ""}
                  />
                  <Select
                    value={taxRow.authority}
                    size="small"
                    name="authority"
                    onChange={handleValueChanged}
                    className="w-full border border-gray-400 rounded-md"
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    {options.map((country) => (
                      <MenuItem
                        id={country.value}
                        key={country.value}
                        value={country.value}
                        // sx={{
                        //   fontSize: "14px",
                        // }}
                      >
                        {"(" +
                          countryCodeEmoji(country.value) +
                          ") " +
                          country.label}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </Grid2>
              <Grid2 xs={12} md={12} style={{ marginTop: "16px" }}>
                <Typography className="mt-2 text-left ">Number *</Typography>
              </Grid2>
              <Grid2 xs={12} md={12}>
                <TextField
                  className="w-full"
                  variant="outlined"
                  name="number"
                  value={taxRow.number}
                  size="small"
                  onChange={handleTextValueChanged}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: "12px",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "12px",
                    },
                  }}
                />
              </Grid2>
              <Grid2 xs={12} md={12} style={{ marginTop: "16px" }}>
                <Typography className="mt-2 text-left ">Nickname *</Typography>
              </Grid2>
              <Grid2 xs={12} md={12}>
                <TextField
                  className="w-full"
                  variant="outlined"
                  name="nickname"
                  value={taxRow.nickname}
                  size="small"
                  onChange={handleTextValueChanged}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: "12px",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "12px",
                    },
                  }}
                />
              </Grid2>
              <Grid2 xs={12} md={12} style={{ marginTop: "16px" }}>
                <Typography className="mt-2 text-left ">
                  Description (Optional)
                </Typography>
              </Grid2>
              <Grid2 xs={12} md={12}>
                <TextField
                  className="w-full"
                  variant="outlined"
                  name="description"
                  value={taxRow.description}
                  size="medium"
                  multiline={true}
                  onChange={handleTextValueChanged}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: "12px",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "12px",
                    },
                  }}
                />
              </Grid2>
            </Grid2>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddPackage}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTaxDialog;
