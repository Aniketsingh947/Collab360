import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AllUserRoute } from "../utils/APIroutes";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronDownIcon from "@mui/icons-material/ChevronDown";
// import  Key from "@mui/icons-material/ChevronDown";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import TextField from "@mui/material/TextField";
import Calendar from "../Calendar";
import SearchDropdown from "../Subcomponents/SearchUserDrop";
import { ChatState } from "../Context/Context";
import { Link } from "react-router-dom";
// import RoutingComponent from "./RoutingComponent";

export default function MiniDrawer({ children }) {
  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
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
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  //   const [isClose, setIsClose] = useState(true);
  //   const [toggle, setToggle] = useState(true);
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const drawerWidth = isSmallerScreen ? 180 : 240;
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Modified AppBar to include search bar and profile */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {/* Menu Icon */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* <TextField
            label="Search"
            variant="outlined"
            size="small"
            sx={{ mr: 2 }}
          /> */}
          <SearcMenu />
          <div style={{ flexGrow: 1 }} />
          {/* Profile with dropdown */}
          <IconButton color="inherit">
            <Avatar alt="Profile" src="/profile.jpg" />
          </IconButton>
          <ProfileMenu />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        className={`w-34 md:w-${drawerWidth}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => {
            const linkTo =
              index === 0
                ? "/"
                : index === 1
                ? "/groups"
                : index === 2
                ? "/dashboard"
                : "/";
            return (
              <ListItem
                key={text}
                disablePadding
                sx={{ display: "block" }}
                className="transform hover:translate-x-2 transition-transform ease-in duration-200 hover:text-orange-400 "
              >
                <ListItemButton
                  component={Link}
                  to={linkTo}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography
          paragraph
          sx={{
            width: "100%",
            height: "100%",
            // background: "brown",
            overflow: "auto",
            mb: 0,
          }}
        >
          {/* <Box width="100%" height="100%"> */}
          {children}
          {/* </Box> */}
        </Typography>
        {/* <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
      </Box>
    </Box>
  );
}
function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="small"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
      >
        <KeyboardArrowDownIcon />
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {/* Add your menu items here */}
        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        <MenuItem onClick={handleMenuClose}>Sign out</MenuItem>
      </Menu>
    </>
  );
}

function SearcMenu() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = ChatState();
  console.log("re rendering");

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Perform search logic here and update searchResults state accordingly
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = async () => {
    if (!searchQuery) {
      // toast({
      //   title: "Please Enter something in search",
      //   status: "warning",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "top-left",
      // });
      return;
    }

    try {
      // setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user._id}`,
        },
      };

      const { data } = await axios.get(`${AllUserRoute}${searchQuery}`, config);

      // setLoading(false);
      console.log(data);
      setSearchResults(data);

      setSearchQuery("");
      setAnchorEl(document.getElementById("outlined-controlled"));
    } catch (error) {
      // toast({
      //   title: "Error Occured!",
      //   description: "Failed to Load the Search Results",
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom-left",
      // });
    }
  };

  return (
    <>
      <TextField
        id="outlined-controlled"
        label="Search"
        size="small"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          console.log(searchQuery);
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            handleSubmit();
          }
        }}
      />
      <SearchDropdown
        searchResults={searchResults}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
      />
    </>
  );
}
