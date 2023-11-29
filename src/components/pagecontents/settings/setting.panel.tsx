import { PropsWithChildren, useEffect } from "react";
import {
  ArrowBackIos,
  DashboardOutlined,
  Inventory,
  LocalShipping,
  LocationOn,
  PersonOutline,
  ProductionQuantityLimitsOutlined,
  Settings,
  Subscriptions,
} from "@mui/icons-material";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { setSettingPanel } from "../../../redux/authslice";
const MENU_ITEMS = [
  {
    link: "/application/settings/onboard",
    label: "Onboard",
    icon: DashboardOutlined,
  },
  { link: "/application/settings/product", label: "Product", icon: Inventory },
  {
    link: "/application/settings/users",
    label: "User Management",
    icon: PersonOutline,
  },
  {
    link: "/application/settings/upsuser",
    label: "Carriers",
    icon: LocalShipping,
  },
  {
    link: "/application/settings/package",
    label: "Packages",
    icon: ProductionQuantityLimitsOutlined,
  },
  {
    link: "/application/settings/fromlocation",
    label: "From Locations",
    icon: LocationOn,
  },
  {
    link: "/application/settings/international",
    label: "International Settings",
    icon: Settings,
  },
  {
    link: "/application/settings/payment",
    label: "Payment & Subscription",
    icon: Subscriptions,
  },
];
const SettingsPanel: React.FC<PropsWithChildren<{}>> = ({}) => {
  const dispatch = useDispatch();
  const showLeft = useSelector(
    (state: RootState) => state.authReducer.showLeft
  );
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: showLeft ? "block" : "none", sm: "block" },
        "& .MuiDrawer-paper": {
          top: "70px",
          boxSizing: "border-box",
          width: 250,
        },
      }}
      open
    >
      <div className="bg-[#4D4D4D] text-[#C1C1C1] h-full">
        <div className="ml-2 items-center">
          <IconButton
            className="ml-2"
            onClick={() => dispatch(setSettingPanel(false))}
          >
            <ArrowBackIos className="text-[#FFFFFF]" />
          </IconButton>
          Back
        </div>
        <Divider />
        <List>
          {MENU_ITEMS.map((item, itemIndex) => (
            <NavLink
              to={item.link}
              key={itemIndex}
              className={({ isActive }) =>
                isActive ? "text-[#FFFFFF]" : "text-[#C1C1C1]"
              }
              end
            >
              <ListItem key={itemIndex} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <item.icon className="text-[#C1C1C1]" />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default SettingsPanel;
