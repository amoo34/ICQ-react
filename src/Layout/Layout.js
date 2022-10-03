import React from "react";
import { Box, Button, Link } from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  activeSideBarBackground,
  activeSideBarColor,
  capitalizeFirstLetter,
} from "../utils/utils";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { handleLogout } from "../Redux/user/usr.actions";
import { btnStyles, secondaryColor } from "../Crud/styles";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import { CustomBadge } from "../modules/common/components/CustomBadge";
import { history } from "../utils/utils";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PersonPinIcon from "@mui/icons-material/PersonPin";
const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const theme = createTheme();
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: secondaryColor,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));
export const Layout = ({ children }) => {
  const { role } = useSelector((state) => state?.user?.user);
  const { orders, paidOrders } = useSelector((state) => state?.orders);
  const dispatch = useDispatch();
  console.log(orders?.length, "roleComing");
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  let { pathname } = window.location;
  let currentRoute = pathname.replace("/", "");
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {capitalizeFirstLetter(currentRoute)}
              </Typography>
              <IconButton sx={{ color: "white", mt: 0.7, mx: 1 }}>
                <CustomBadge badgeContent={4}>
                  <NotificationsIcon />
                </CustomBadge>
              </IconButton>
              <IconButton color="inherit">
                <Button
                  onClick={() => {
                    dispatch(handleLogout(""));
                  }}
                  variant="contained"
                  sx={{
                    ...btnStyles,
                  }}
                  size="small"
                >
                  Log Out
                </Button>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <ListItemButton
                onClick={() => history.push("/home")}
                sx={{
                  ...activeSideBarBackground(pathname, "/home"),
                }}
              >
                <ListItemIcon>
                  <DashboardIcon
                    sx={{ ...activeSideBarColor(pathname, "/home") }}
                  />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
              <ListItemButton
                onClick={() => history.push("/profile")}
                sx={{
                  ...activeSideBarBackground(pathname, "/profile"),
                }}
              >
                <ListItemIcon>
                  <PersonPinIcon
                    sx={{ ...activeSideBarColor(pathname, "/profile") }}
                  />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
              {role === "RECRUITER" && (
                <>
                  <ListItemButton
                    onClick={() => history.push("/orders")}
                    sx={{ ...activeSideBarBackground(pathname, "/orders") }}
                  >
                    <ListItemIcon>
                      <CustomBadge
                        badgeContent={orders?.length ? orders?.length : "0"}
                      >
                        <ShoppingCartIcon
                          sx={{ ...activeSideBarColor(pathname, "/orders") }}
                        />
                      </CustomBadge>
                    </ListItemIcon>

                    <ListItemText primary="Orders" />
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => history.push("/OrderedCv's")}
                    sx={{
                      ...activeSideBarBackground(pathname, "/OrderedCv's"),
                    }}
                  >
                    <ListItemIcon>
                      <CustomBadge
                        badgeContent={
                          paidOrders?.length ? paidOrders?.length : "0"
                        }
                      >
                        <ShoppingBasketIcon
                          sx={{
                            ...activeSideBarColor(pathname, "/OrderedCv's"),
                          }}
                        />
                      </CustomBadge>
                    </ListItemIcon>

                    <ListItemText primary="Ordered Cv's" />
                  </ListItemButton>
                </>
              )}
              {role === "ADMIN" && (
                <ListItemButton
                  onClick={() => history.push("/Recruiters")}
                  sx={{ ...activeSideBarBackground(pathname, "/Recruiters") }}
                >
                  <ListItemIcon>
                    <RecordVoiceOverIcon
                      sx={{ ...activeSideBarColor(pathname, "/Recruiters") }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Recruiters" />
                </ListItemButton>
              )}
              {role === "ADMIN" && (
                <ListItemButton
                  onClick={() => history.push("/Workers")}
                  sx={{ ...activeSideBarBackground(pathname, "/Workers") }}
                >
                  <ListItemIcon>
                    <EmojiPeopleIcon
                      sx={{ ...activeSideBarColor(pathname, "/Workers") }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Workers" />
                </ListItemButton>
              )}

              <Divider sx={{ my: 1 }} />
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  {children}
                </Grid>
              </Grid>

              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};
