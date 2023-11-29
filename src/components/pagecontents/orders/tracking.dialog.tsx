import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { PropsWithChildren, useState } from "react";
import ToastService from "../../toast/toast.component";
import Grid from "@mui/material/Unstable_Grid2";
export interface TrackingInfo {
  carrier: string;
  tracking_number: string;
  tracking_url: string;
}
const TrackingDialog: React.FC<
  PropsWithChildren<{
    open: boolean;
    onClose: () => void;
    onChange: (p: TrackingInfo) => void;
    formData: TrackingInfo;
  }>
> = ({ open, onClose, onChange, formData }) => {
  const handleClose = () => {
    onClose();
  };
  const handleCarrierChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onChange({ ...formData, [name]: value });
  };
  return (
    <div>
      <div>
        <ToastService.MyToastContainer />
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="xs"
          PaperProps={{ sx: { width: "100%", height: "50%" } }}
          sx={{
            "& .MuiDialogTitle-root": {
              boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.3)",
            },
            "& .MuiDialogActions-root": {
              boxShadow: "0px -1px 4px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <DialogTitle>Add Tracking Info</DialogTitle>
          <DialogContent>
            <Box sx={{ width: "100%" }}>
              <Grid container spacing={2}>
                <Grid xs={12} sx={{ p: 1 }} md={12} xl={12}>
                  <div className="flex justify-between mt-6">
                    <Typography className="text-center w-1/3 flex items-center justify-left">
                      Company:
                    </Typography>
                    <TextField
                      className="w-2/3"
                      variant="outlined"
                      name="carrier"
                      value={formData.carrier}
                      size="small"
                      onChange={handleCarrierChange}
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: "14px",
                        },
                        "& .MuiOutlinedInput-input": {
                          fontSize: "14px",
                        },
                      }}
                    />
                  </div>
                </Grid>
                <Grid xs={12} sx={{ p: 1 }} md={12} xl={12}>
                  <div className="flex justify-between">
                    <Typography className="text-center w-1/3 flex items-center justify-left">
                      Number:
                    </Typography>
                    <TextField
                      className="w-2/3"
                      variant="outlined"
                      name="tracking_number"
                      value={formData.tracking_number}
                      size="small"
                      onChange={handleCarrierChange}
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: "14px",
                        },
                        "& .MuiOutlinedInput-input": {
                          fontSize: "14px",
                        },
                      }}
                    />
                  </div>
                </Grid>
                <Grid xs={12} sx={{ p: 1 }} md={12} xl={12}>
                  <div className="flex justify-between">
                    <Typography className="text-center w-1/3 flex items-center justify-left">
                      Url:
                    </Typography>
                    <TextField
                      className="w-2/3"
                      variant="outlined"
                      name="tracking_url"
                      value={formData.tracking_url}
                      size="small"
                      onChange={handleCarrierChange}
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: "14px",
                        },
                        "& .MuiOutlinedInput-input": {
                          fontSize: "14px",
                        },
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Ship</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default TrackingDialog;
