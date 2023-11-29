import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { PropsWithChildren, useEffect, useState } from "react";
import FromAddress from "./address.component";
import ReturnAddress from "./returnAddress.component";
import upsService from "../../../../../services/ups.service";
export interface FromLocationData {
  id: string;
  locationName: string;
  residential: boolean;
  fullName: string;
  attentionName: string;
  countryCode: string;
  address: string;
  address1: string;
  city: string;
  stateCode: string;
  postalCode: string;
  phone: string;
  email: string;
  selected: boolean;
  timezone: string;
  pickupAddress: boolean;
  returnFullName: string;
  returnAttentionName: string;
  returnCountryCode: string;
  returnAddress: string;
  returnAddress1: string;
  returnCity: string;
  returnStateCode: string;
  returnPostalCode: string;
  returnPhone: string;
  returnEmail: string;
  returnTimezone: string;
}
const FromLocationsDialog: React.FC<
  PropsWithChildren<{
    formData: FromLocationData | undefined;
    onChange: (p: FromLocationData) => void;
    showDialog: boolean;
    onClose: () => void;
  }>
> = ({ showDialog, onClose, formData, onChange }) => {
  const handleSave = () => {
    if (updatedData)
      upsService
        .updateFromLocation(updatedData)
        .then(() => {
          onChange(updatedData);
          onClose();
        })
        .catch((error) => {});
  };
  const [updatedData, setUpdatedData] = useState<FromLocationData>();
  const handleChange = (updatedData: FromLocationData) => {
    setUpdatedData(updatedData);
  };
  useEffect(() => {
    setUpdatedData(formData);
  }, [formData]);
  return (
    <div>
      <Dialog
        open={showDialog}
        onClose={onClose}
        fullWidth={true}
        maxWidth="md"
        sx={{
          "& .MuiDialogTitle-root": {
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.3)",
          },
          "& .MuiDialogActions-root": {
            boxShadow: "0px -1px 4px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <DialogTitle>From Locations</DialogTitle>
        <DialogContent>
          <div className="flex w-full gap-4">
            <FromAddress formData={updatedData} onChange={handleChange} />
            <ReturnAddress formData={updatedData} onChange={handleChange} />
          </div>
        </DialogContent>
        <DialogActions>
          <button className="" onClick={handleSave}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FromLocationsDialog;
