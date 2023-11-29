import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import React, { PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setSettingPanel } from "../redux/authslice";
const drawerWidth = 250;

const SettingsPage: React.FC<PropsWithChildren<{}>> = ({}) => {
  const dispatch = useDispatch();
  dispatch(setSettingPanel(true));
  return (
    <Box
      sx={{
        display: "flex",
        p: 3,
        width: "100%",
      }}
      className="mt-[80px]"
    >
      <CssBaseline />
      {/* <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      > */}
      <Outlet />
      {/* </Box> */}
    </Box>
  );
};
export default SettingsPage;
