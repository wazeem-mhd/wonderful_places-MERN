import React, { useState, useEffect } from "react";
import { Search, Add, Home } from "@mui/icons-material";
import { Form } from "react-bootstrap";
import {
  Avatar,
  IconButton,
  Typography,
  Button,
  Menu,
  Box,
  Tooltip,
  MenuItem,
  Divider,
} from "@mui/material";
import { FiHome } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useDispatch } from "react-redux";
import { postsBySearch } from "../../redux/features/PostSlice";

const HomePageTabNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postsBySearch(searchText));
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchText(e.target.value);

    // const titlePosts = allPosts.filter((post) =>
    //   post.title.trim().toLowerCase().includes(value.trim().toLowerCase())
    // );

    // const tagPosts = allPosts.filter((post) =>
    //   post.tags
    //     .map((element) => element.toLowerCase())
    //     .includes(value.toLowerCase())
    // );

    // const allResult=titlePosts.concat(tagPosts)
  };

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px 10px 5px 10px",
        backgroundColor: "white",
        // border: "1px solid black",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          backgroundColor: "white",
          alignItems: "center",
          gap: "5px",
        }}
      >
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
              width: "200px",
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
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
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
              variant="outlined"
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
                color: "blue",
                gap: "5px",
              }}
            >
              <LoginOutlinedIcon />
              <Typography sx={{ fontWeight: "600" }}>Join now</Typography>
            </Button>
          </>
        )}
        <Divider
          sx={{ border: "1px solid" }}
          orientation="vertical"
          flexItem
          variant="middle"
        />

        <Button
          variant="text"
          sx={{
            height: "35px",
            paddingX: "15px",
            borderRadius: "30px",
            fontWeight: "600",
            textTransform: "none",

            color: "GrayText",
          }}
        >
          Add new
        </Button>
        {/*         
        <IconButton sx={{ padding: "0px" }}>
          <Add />
        </IconButton> */}
        <IconButton sx={{ padding: "0px" }}>
          <Home />
        </IconButton>

        <IconButton sx={{ padding: "0px" }}>
          <ManageAccountsIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default HomePageTabNavbar;
