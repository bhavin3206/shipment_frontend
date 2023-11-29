import MenuIcon from "@mui/icons-material/Menu";
import { Hidden } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { setUnAuth, setShowLeft, setShowRight } from "../../redux/authslice";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import type { RootState } from "../../redux/store";
const pages = [
  // "Onboard",
  // "Insights",
  "Orders",
  // "Shipments",
  // "Products",
  // "Customers",
  // "Scan",
];
const menus = [
  "Awaiting Payment",
  "On Hold",
  "Awaiting Fulfillment",
  "Shipped",
  "Cancelled",
  "Order Alerts",
];
const settings = [
  // { value: "profile", label: "Profile" },
  { value: "settings", label: "Settings" },
  { value: "logout", label: "LogOut" },
];
const ResponsiveAppBar = () => {
  const [userName, setUseName] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const showLeft = useSelector(
    (state: RootState) => state.authReducer.showLeft
  );
  const showRight = useSelector(
    (state: RootState) => state.authReducer.showRight
  );
  useEffect(() => {
    const token = String(localStorage.getItem("token"));
    const decodedToken = jwtDecode(token) as { username: string }; // cast the decoded token to an object with a user_id property
    setUseName(decodedToken.username);
    setActivePage(location.pathname.split("/")[2]);
  }, []);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const [activePage, setActivePage] = useState("Orders");
  const navigate = useNavigate();
  const handleCloseNavMenu = (value: string) => (event: any) => {
    setAnchorElNav(null);
    setActivePage(value);
    navigate("/application/" + value);
  };

  const handleCloseUserMenu = (value: string) => {
    if (value === "logout") {
      AuthService.logout();
      dispatch(setUnAuth());
    } else if (value === "profile") {
      navigate("/application/profile");
    } else if (value === "settings") {
      navigate("/application/settings/onboard");
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar
      className="w-full h-[70px] flex"
      sx={{ backgroundColor: "#212C36" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center">
              <Box className="block xl:hidden">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={() => {
                    dispatch(setShowLeft(!showLeft));
                  }}
                  style={{ color: "white" }} // Set the color to white
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { md: "block", xl: "none" },
                  }}
                >
                  {menus.map((menuitem) => (
                    <NavLink
                      key={menuitem}
                      to={`/application/${menuitem.toLowerCase()}`}
                    >
                      <MenuItem
                        key={menuitem}
                        onClick={handleCloseNavMenu(menuitem)}
                      >
                        <Typography textAlign="center">{menuitem}</Typography>
                      </MenuItem>
                    </NavLink>
                  ))}
                </Menu>
              </Box>
              <Hidden mdDown>
                <Logo />
              </Hidden>
              <Hidden mdUp>
                <Logo />
              </Hidden>
              {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) =>
                  localStorage.getItem("parentuser") == "0" ||
                  (localStorage.getItem("parentuser") != "0" &&
                    localStorage.getItem("roles") != "") ? (
                    <NavLink
                      key={page}
                      to={`/application/${page.toLowerCase()}`}
                    >
                      <Button
                        onClick={() => setActivePage(page.toLowerCase())}
                        sx={{
                          my: 2,
                          color:
                            activePage === page
                              ? "primary.contrastText"
                              : "white",
                          bgcolor:
                            activePage === page
                              ? "primary.main"
                              : "transparent",
                          display: "block",
                          "&:hover": {
                            bgcolor: "primary.light",
                          },
                        }}
                      >
                        {page}
                      </Button>
                    </NavLink>
                  ) : null
                )}
              </Box> */}
            </div>
            <div className="flex">
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={userName}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={userName.toUpperCase()}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) =>
                    localStorage.getItem("parentuser") == "0" ||
                    (localStorage.getItem("parentuser") != "0" &&
                      setting.label == "LogOut") ? (
                      <MenuItem
                        key={setting.value}
                        onClick={() => handleCloseUserMenu(setting.value)}
                      >
                        <Typography textAlign="center">
                          {setting.label}
                        </Typography>
                      </MenuItem>
                    ) : null
                  )}
                </Menu>
              </Box>
              <Box className="block xl:hidden">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={() => {
                    dispatch(setShowRight(!showRight));
                  }}
                  style={{ color: "white" }} // Set the color to white
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { md: "block", xl: "none" },
                  }}
                >
                  {menus.map((menuitem) => (
                    <NavLink
                      key={menuitem}
                      to={`/application/${menuitem.toLowerCase()}`}
                    >
                      <MenuItem
                        key={menuitem}
                        onClick={handleCloseNavMenu(menuitem)}
                      >
                        <Typography textAlign="center">{menuitem}</Typography>
                      </MenuItem>
                    </NavLink>
                  ))}
                </Menu>
              </Box>
            </div>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
const Logo = () => (
  <NavLink to="/application/orders">
    <div className="flex items-center">
      <img
        src="/logo.png"
        alt="Logo"
        style={{ height: "50px", marginRight: "10px" }}
      />
      <div className="text-center text-white text-4xl font-bold font-sans">
        Ship<span className="text-baseColor font-sans">Verse</span>
      </div>
    </div>
  </NavLink>
);
export default ResponsiveAppBar;
