import React, { useEffect, useState, MouseEvent } from "react";
import { Form } from "react-bootstrap";
import RbButton from "react-bootstrap/Button";
import { Search } from "@mui/icons-material";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  IconButton,
  Divider,
  Avatar,
  Box,
  Tooltip,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import Modal from "react-bootstrap/Modal";
import { useMediaQuery } from "react-responsive";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HomeIcon from "@mui/icons-material/Home";
import { jwtDecode } from "jwt-decode";
import HomePageNavbar from "../responsive/Mobile/HomePageNavbar";
import HomePageTabNavbar from "../responsive/Tablet/HomePageTabNavbar";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { postsBySearch } from "../redux/features/PostSlice";
import { MuiChipsInput } from "mui-chips-input";
import FileBase from "react-file-base64";
import { createNewPost } from "../redux/features/PostSlice";
import CreatePost from "../components/CreatePost";

const HomeLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    tags: [],
    selectedFile: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const location = useLocation();

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, currentUser]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (currentUser) {
      const decode = jwtDecode(currentUser.token);

      if (decode.exp * 1000 < new Date().getTime()) handleLogout();
    }
    setCurrentUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postsBySearch(searchText));
  };

  const handleFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [name]: value });
  };
  const handleChipInput = (newChip) => {
    setFormData({ ...formData, tags: newChip });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    dispatch(createNewPost(formData));
    setShow(false);
  };
  const handleCLear = () => {
    setFormData({
      title: "",
      location: "",
      description: "",
      tags: [],
      selectedFile: "",
    });
  };

  const isMobile = useMediaQuery({ query: "(max-width: 319px)" });
  const isLargerMobile = useMediaQuery({ query: "(min-width: 320px)" });
  const isMobilemax = useMediaQuery({ query: "(max-width: 640px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 641px)" });
  const isDesktop = useMediaQuery({ query: "(min-width:1025px)" });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isDesktop ? (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CreatePost />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <div
            style={{
              padding: "5px 10px",
              background: "white",
              // maxWidth: "100vw",
              width: "100vw",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
                gap: "5px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Link to={"/"}>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    backgroundColor: "#0d77da",
                    fontSize: "25px",
                    fontWeight: 600,
                  }}
                >
                  f
                </Avatar>
              </Link>

              <Form
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderRadius: "14px",
                  backgroundColor: "#deded9",
                  alignItems: "center",
                  paddingLeft: "5px",
                }}
                onSubmit={handleSubmit}
              >
                <Form.Control
                  className="searchBox"
                  placeholder="fedorain search..."
                  name="search"
                  style={{
                    backgroundColor: "#deded9",
                    height: "25px",
                    width: "250px",
                  }}
                  value={searchText}
                  onChange={(e) => handleChange(e)}
                />
                <IconButton sx={{ padding: "3px" }} type="submit">
                  <Search />
                </IconButton>
              </Form>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "18px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => navigate("/")}
                className="homeIcon"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0px",
                }}
              >
                <HomeIcon />
                <Typography sx={{ fontSize: "13px" }}>home</Typography>
              </IconButton>

              <IconButton
                className="addIcon"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0px",
                }}
                onClick={
                  currentUser ? handleShow : () => navigate("/auth/login")
                }
              >
                <Add />
                <Typography sx={{ fontSize: "13px" }}>create</Typography>
              </IconButton>
              <IconButton
                className="accountIcon"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0px",
                }}
              >
                <ManageAccountsIcon />
                <Typography sx={{ fontSize: "13px" }}>about</Typography>
              </IconButton>

              <Divider
                sx={{ border: "1px solid" }}
                orientation="vertical"
                flexItem
                variant="middle"
              />
              {currentUser ? (
                <Box
                  sx={{
                    flexGrow: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar sx={{ height: 30, width: 30 }}>
                        {currentUser?.user?.userName?.charAt(0)}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "30px" }}
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
                    <MenuItem
                      onClick={() => {
                        setCurrentUser(localStorage.clear());
                      }}
                    >
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => {}}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                  </Menu>
                  <Typography sx={{ marginLeft: "7px" }}>
                    {currentUser?.user?.userName?.split(" ")[0]}
                  </Typography>
                </Box>
              ) : (
                <>
                  <Button
                    onClick={() => navigate("/auth/signup")}
                    variant="text"
                    size="large"
                    sx={{
                      height: "35px",
                      paddingX: "10px",
                      borderRadius: "30px",
                      fontWeight: "600",
                      textTransform: "none",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "black",
                      gap: "5px",
                    }}
                  >
                    <LoginOutlinedIcon />
                    <Typography sx={{ fontWeight: "600" }}>Join now</Typography>
                  </Button>
                  <Button
                    onClick={() => navigate("/auth/login")}
                    variant="outlined"
                    size="large"
                    sx={{
                      height: "35px",
                      paddingX: "10px",
                      borderRadius: "30px",
                      textTransform: "none",
                      fontWeight: "600",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#0d77da",
                      gap: "5px",
                    }}
                  >
                    <PersonAddOutlinedIcon />
                    <Typography sx={{ fontWeight: "600" }}>Sign in</Typography>
                  </Button>
                </>
              )}
            </div>
          </div>
        </>
      ) : isTablet ? (
        <HomePageTabNavbar />
      ) : (
        <HomePageNavbar />
      )}

      <Outlet />
    </div>
  );
};

export default HomeLayout;
