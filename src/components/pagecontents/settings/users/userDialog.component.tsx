import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import jwt from "jwt-decode"; // import dependency
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import AuthService from "../../../../services/auth.service";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ToastService from "../../../toast/toast.component";
interface AddUserDialogProps {
  open: boolean;
  editmode: boolean;
  userData: UserManagementData;
  handleClose: () => void;
  setUserManagementData: (value: UserManagementData) => void;
  handleAddUser: () => void;
  more: boolean;
}
export interface UserManagementData {
  username: string;
  fullName: string;
  email: string;
  password: string;
  active: boolean;
  roles: string;
}
type InputLabelProps = {
  label: string;
  name: string;
  handleLabelChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const UserDialog = (props: AddUserDialogProps) => {
  const {
    open,
    editmode,
    userData,
    handleClose,
    handleAddUser,
    setUserManagementData,
    more,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleLabelChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onAddUserChange(event.target.name, event.target.value);
    setUserManagementData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };
  const onAddUserChange = (name: string, value: string | number) => {
    // setUserManagementData((prevData) => ({
    //   ...prevData,
    //   [name]: value,
    // }));
  };
  const handleSetActive = (checked: boolean) => {
    setUserManagementData({ ...userData, active: checked });
  };
  const handleSetOrderPermission = (checked: boolean) => {
    setUserManagementData({ ...userData, roles: checked ? "Orders" : "" });
  };
  const handleSignUp = async () => {
    const phone = "";
    const token = String(localStorage.getItem("token"));
    const decodedToken = jwt(token) as { user_id: string }; // cast the decoded token to an object with a user_id property
    const parentuser = decodedToken.user_id;
    const roles = userData.roles ? "order" : "";
    const usertype = "user";
    const active = true;
    if (editmode) {
      if (active && !more) {
        handleSetActive(false);
        ToastService.showToast(
          "failed",
          "You cannot active this user. Please upgrade subscription"
        );
        return;
      }
      AuthService.update(
        userData.username,
        userData.fullName,
        userData.email,
        phone,
        userData.password,
        usertype,
        parentuser,
        roles,
        userData.active
      ).then(
        (response) => {
          ToastService.showToast("success", "User Data Saved");
          handleAddUser();
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
    } else {
      AuthService.signup(
        userData.username,
        userData.fullName,
        userData.email,
        phone,
        userData.password,
        usertype,
        parentuser,
        roles,
        active
      ).then(
        (response) => {
          ToastService.showToast("success", "User created");
          handleAddUser();
        },
        (error) => {
          console.log(error);
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.result) ||
            error.message ||
            error.toString();
          ToastService.showToast("failed", resMessage);
        }
      );
    }
  };
  return (
    <div>
      <ToastService.MyToastContainer />
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        PaperProps={{ sx: { width: "100%", height: "70%" } }}
      >
        <DialogTitle sx={{ mb: 2 }}>
          {editmode ? "Edit User" : "Add User"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Information" {...a11yProps(0)} />
                <Tab label="Permissions" {...a11yProps(1)} />
                <Tab label="Restrictions" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Typography className="pb-2">
                Add a user login to your account below. An email will be sent to
                the email address specified with instructions and a temporary
                password to login.
              </Typography>
              <Divider></Divider>
              <div className="w-1/3 pt-4">
                <Grid container spacing={2}>
                  <Grid xs={12} sx={{ pb: 2 }} md={12}>
                    <span>User Name</span>
                    <TextField
                      className="w-full"
                      variant="outlined"
                      placeholder="Callen"
                      name="username"
                      size="small"
                      value={userData.username}
                      onChange={(event) => handleLabelChange(event)}
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
                  <Grid xs={12} sx={{ pb: 2 }} md={12}>
                    <span>Full Name</span>
                    <TextField
                      className="w-full"
                      variant="outlined"
                      placeholder="Callen S."
                      name="fullName"
                      size="small"
                      value={userData.fullName}
                      onChange={(event) => handleLabelChange(event)}
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

                  <Grid xs={12} sx={{ pb: 2 }} md={12}>
                    <span>Email</span>
                    <TextField
                      className="w-full"
                      variant="outlined"
                      placeholder="test@shipverse.com"
                      name="email"
                      size="small"
                      value={userData.email}
                      onChange={(event) => handleLabelChange(event)}
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
                  <Grid xs={12} sx={{ pb: 2 }} md={12}>
                    <span>Password</span>
                    <TextField
                      name="password"
                      size="small"
                      type={showPassword ? "text" : "password"}
                      color="primary"
                      placeholder="min. 6 characters"
                      className="w-full"
                      value={userData.password}
                      onChange={(event) => handleLabelChange(event)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword}>
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
              {editmode ? (
                <div className="w-full">
                  <Grid container spacing={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={userData.active}
                          onChange={(event) =>
                            handleSetActive(event.target.checked)
                          }
                        />
                      }
                      label="Allow this user to log in(deselecting will deactivate and log the user out)."
                    />
                  </Grid>
                </div>
              ) : (
                <div />
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <div className="w-1/3">
                <Grid container spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={userData.roles ? true : false}
                        onChange={(event) =>
                          handleSetOrderPermission(event.target.checked)
                        }
                      />
                    }
                    label="Orders Management"
                  />
                </Grid>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}></CustomTabPanel>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSignUp}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserDialog;
