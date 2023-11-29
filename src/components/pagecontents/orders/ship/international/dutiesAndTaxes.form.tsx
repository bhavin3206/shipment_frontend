import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { PropsWithChildren, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { DutiesAndTaxesInformation } from "../ship.component";

const DutiesAndTaxesForm: React.FC<
  PropsWithChildren<{
    data: DutiesAndTaxesInformation;
    onChange: (p: DutiesAndTaxesInformation) => void;
  }>
> = ({ data, onChange }) => {
  const accountNumber = useSelector(
    (state: RootState) => state.authReducer.accountNumber
  );
  const handleInputChanged = (event: any) => {
    const updatedData = { ...data, [event.target.name]: event.target.value };
    onChange(updatedData);
    console.log(updatedData);
  };
  return (
    <div>
      <Grid2 container spacing={2} className="pt-2">
        <Grid2 xs={12} md={12}>
          <FormControl
            className="w-full"
            variant="outlined"
            sx={{ minWidth: 120 }}
          >
            <InputLabel id="paymentLabel">Payment Method</InputLabel>
            <Select
              className="w-full"
              value={data.paymentMethod}
              label="Payment Method"
              labelId="paymentLabel"
              name="paymentMethod"
              size="small"
              sx={{
                fontSize: "14px",
              }}
              onChange={handleInputChanged}
            >
              <MenuItem
                key={"01"}
                value={"01"}
                sx={{
                  fontSize: "12px",
                }}
              >
                Charge receiver for duties and taxes
              </MenuItem>
              <MenuItem
                key={"02"}
                value={"02"}
                sx={{
                  fontSize: "12px",
                }}
              >
                Bill my account
              </MenuItem>
              <MenuItem
                key={"03"}
                value={"03"}
                sx={{
                  fontSize: "12px",
                }}
              >
                Bill receiver's account
              </MenuItem>
              <MenuItem
                key={"04"}
                value={"04"}
                sx={{
                  fontSize: "12px",
                }}
              >
                Bill a third-party account
              </MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        {(data.paymentMethod === "03" || data.paymentMethod === "04") && (
          <>
            <Grid2 xs={12} md={12}>
              <TextField
                className="w-full"
                variant="outlined"
                label="Account Number"
                name="accountNumber"
                size="small"
                value={data?.accountNumber}
                onChange={handleInputChanged}
                sx={{
                  "& .MuiInputLabel-root": {
                    fontSize: "14px",
                  },
                  "& .MuiOutlinedInput-input": {
                    fontSize: "14px",
                  },
                }}
              />
            </Grid2>
            <Grid2 xs={12} md={12}>
              <TextField
                className="w-full"
                variant="outlined"
                label="Postal Code"
                name="postalCode"
                size="small"
                value={data?.postalCode}
                onChange={handleInputChanged}
                sx={{
                  "& .MuiInputLabel-root": {
                    fontSize: "14px",
                  },
                  "& .MuiOutlinedInput-input": {
                    fontSize: "14px",
                  },
                }}
              />
            </Grid2>
            {data.paymentMethod === "04" && (
              <Grid2 xs={12} md={12}>
                <TextField
                  className="w-full"
                  variant="outlined"
                  label="Country Code"
                  name="countryCode"
                  size="small"
                  value={data?.countryCode}
                  onChange={handleInputChanged}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: "14px",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "14px",
                    },
                  }}
                />
              </Grid2>
            )}
          </>
        )}
      </Grid2>
    </div>
  );
};

export default DutiesAndTaxesForm;
