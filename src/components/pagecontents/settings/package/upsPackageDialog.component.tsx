import { Fragment, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import upsService from "../../../../services/ups.service";
import Grid from "@mui/material/Unstable_Grid2";
import ToastService from "../../../toast/toast.component";
import { UpsPackageData } from "./upsPackage.component";
interface UPSPackageDialogProps {
  open: boolean;
  editMode: boolean;
  packageData: UpsPackageData;
  handleClose: () => void;
  setPackageData: (name: string, value: string) => void;
}

export default function UpsPackageDialog(props: UPSPackageDialogProps) {
  const { open, editMode, packageData, handleClose, setPackageData } = props;
  const handleDimensionChange = (event: SelectChangeEvent) => {
    setPackageData(event.target.name, event.target.value);
  };
  const handleAddPackage = () => {
    upsService.addPackage(packageData).then(
      (response) => {
        ToastService.showToast("success", "Package Data Saved");
        handleClose();
      },
      (error) => {
        console.log(error?.response?.data?.email ?? "");
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        ToastService.showToast("failed", resMessage);
      }
    );
  };
  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setPackageData(name, value);
  };

  return (
    <div>
      <ToastService.MyToastContainer />
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        PaperProps={{ sx: { width: "100%", height: "50%" } }}
      >
        <DialogTitle sx={{ mb: 2 }}>
          {editMode ? "Edit Package" : "Add Package"}
        </DialogTitle>
        <DialogContent>
          <div className="mb-4">
            <Divider />
            <Typography className="text-left pt-2" gutterBottom>
              Please enter the details of your package below. This package will
              be available in addition to the standard packaging. Selecting this
              package will automatically apply the dimensions below.
            </Typography>
          </div>
          <Box sx={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid xs={12} sx={{ p: 1 }} md={12} xl={12}>
                <div className="flex justify-between">
                  <Typography className="text-center w-1/3 flex items-center justify-left">
                    Package Name:
                  </Typography>
                  <TextField
                    className="w-2/3"
                    variant="outlined"
                    name="packageName"
                    value={packageData.packageName}
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
                </div>
              </Grid>

              <Grid xs={12} sx={{ p: 1 }} md={12} xl={12}>
                <div className="flex justify-between">
                  <Typography className="p-2 text-left w-1/3 flex items-center justify-left">
                    Measure Unit:
                  </Typography>
                  <Select
                    labelId="measureUnit"
                    name="measureUnit"
                    className="w-2/3"
                    value={packageData.measureUnit}
                    size="small"
                    sx={{ fontSize: "14px" }}
                    onChange={handleDimensionChange}
                  >
                    <MenuItem value="CM" sx={{ fontSize: "14px" }}>
                      cm
                    </MenuItem>
                    <MenuItem value="IN" sx={{ fontSize: "14px" }}>
                      in
                    </MenuItem>
                  </Select>
                </div>
              </Grid>
              <Grid xs={12} sx={{ p: 1 }} md={4} xl={4}>
                <TextField
                  className="w-full"
                  variant="outlined"
                  label="Length"
                  name="length"
                  value={packageData.length}
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
              </Grid>
              <Grid xs={12} sx={{ p: 1 }} md={4} xl={4}>
                <TextField
                  className="w-full"
                  variant="outlined"
                  label="Width"
                  name="width"
                  value={packageData.width}
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
              </Grid>
              <Grid xs={12} sx={{ p: 1 }} md={4} xl={4}>
                <TextField
                  className="w-full"
                  variant="outlined"
                  label="Height"
                  name="height"
                  value={packageData.height}
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
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddPackage}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
