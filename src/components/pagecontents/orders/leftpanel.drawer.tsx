import {
  AddShoppingCart,
  CancelScheduleSendOutlined,
  DataThresholding,
  LocalShipping,
  NotificationsActiveOutlined,
  Payment,
  Settings,
} from "@mui/icons-material";
import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import jwtDecode from "jwt-decode";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSettingPanel } from "../../../redux/authslice";
const LeftDrawer: React.FC<
  PropsWithChildren<{
    onChange: (p: string) => void;
  }>
> = ({ onChange }) => {
  const [userName, setUseName] = useState("");
  const drawerWidth = 250;
  const [selectedIndex, setSelectedIndex] = useState(2);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleListItemClick = (event: any, index: any, text: any) => {
    setSelectedIndex(index);
    onChange(text);
    navigate("/application/orders");
  };
  useEffect(() => {
    const token = String(localStorage.getItem("token"));
    const decodedToken = jwtDecode(token) as { username: string }; // cast the decoded token to an object with a user_id property
    setUseName(decodedToken.username);
  }, []);
  return (
    <Drawer
      style={{ width: drawerWidth }}
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          top: "70px",
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
      open
    >
      <div className="bg-[#4D4D4D] text-[#C1C1C1] h-full">
        <div className=" flex mt-2 mb-2 ml-2 items-center justify-between">
          <div className="flex items-center">
            <Avatar
              alt={userName.toUpperCase()}
              sx={{ bgcolor: "deepskyblue" }}
              variant="rounded"
              className="mr-2"
            ></Avatar>
            <Typography>{userName}</Typography>
          </div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => {
              dispatch(setSettingPanel(true));
            }}
            style={{ color: "white" }} // Set the color to white
          >
            <Settings />
          </IconButton>
        </div>
        {/* <Avatar
          alt=
          src="/static/images/avatar/2.jpg"
        /> */}
        <Divider />
        <List>
          <ListItem
            key={"Awaiting Payment"}
            disablePadding
            className={
              selectedIndex === 0 ? "text-[#FFFFFF]" : "text-[#C1C1C1]"
            }
          >
            <ListItemButton
              onClick={(event) =>
                handleListItemClick(event, 0, "Awaiting Payment")
              }
            >
              <ListItemIcon>
                <Payment
                  className={
                    selectedIndex === 0 ? "text-[#FFFFFF]" : "text-[#C1C1C1]"
                  }
                />
              </ListItemIcon>
              <ListItemText primary={"Awaiting Payment"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"On Hold"}
            disablePadding
            className={
              selectedIndex === 1 ? "text-[#FFFFFF]" : "text-[#C1C1C1]"
            }
          >
            <ListItemButton
              onClick={(event) => handleListItemClick(event, 1, "On Hold")}
            >
              <ListItemIcon>
                <DataThresholding
                  className={
                    selectedIndex === 1 ? "text-[#FFFFFF]" : "text-[#C1C1C1]"
                  }
                />
              </ListItemIcon>
              <ListItemText primary={"On Hold"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"Awaiting Fulfillment"}
            disablePadding
            className={
              selectedIndex === 2 ? "text-[#FFFFFF]" : "text-[#C1C1C1]"
            }
          >
            <ListItemButton
              onClick={(event) =>
                handleListItemClick(event, 2, "Awaiting Fulfillment")
              }
            >
              <ListItemIcon>
                <AddShoppingCart
                  className={
                    selectedIndex === 2 ? "text-[#FFFFFF]" : "text-[#C1C1C1]"
                  }
                />
              </ListItemIcon>
              <ListItemText primary={"Awaiting Fulfillment"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"Shipped"}
            disablePadding
            className={
              selectedIndex === 3 ? "text-[#FFFFFF]" : "text-[#C1C1C1]"
            }
          >
            <ListItemButton
              onClick={(event) => handleListItemClick(event, 3, "Shipped")}
            >
              <ListItemIcon>
                <LocalShipping
                  className={
                    selectedIndex === 3 ? "text-[#FFFFFF]" : "text-[#C1C1C1]"
                  }
                />
              </ListItemIcon>
              <ListItemText primary={"Shipped"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"Cancelled"}
            disablePadding
            className={
              selectedIndex === 4 ? "text-[#FFFFFF]" : "text-[#C1C1C1]"
            }
          >
            <ListItemButton
              onClick={(event) => handleListItemClick(event, 4, "Cancelled")}
            >
              <ListItemIcon>
                <CancelScheduleSendOutlined
                  className={
                    selectedIndex === 4 ? "text-[#FFFFFF]" : "text-[#C1C1C1]"
                  }
                />
              </ListItemIcon>
              <ListItemText primary={"Cancelled"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"Order Alerts"}
            disablePadding
            className={
              selectedIndex === 5 ? "text-[#FFFFFF]" : "text-[#C1C1C1]"
            }
          >
            <ListItemButton
              onClick={(event) => handleListItemClick(event, 5, "Order Alerts")}
            >
              <ListItemIcon>
                <NotificationsActiveOutlined
                  className={
                    selectedIndex === 5 ? "text-[#FFFFFF]" : "text-[#C1C1C1]"
                  }
                />
              </ListItemIcon>
              <ListItemText primary={"Order Alerts"} />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default LeftDrawer;
