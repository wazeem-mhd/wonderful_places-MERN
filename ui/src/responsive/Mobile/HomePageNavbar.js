import React, { useState, useEffect } from "react";
import { Avatar, IconButton, Typography, Button } from "@mui/material";
import { Search, Add, Menu } from "@mui/icons-material";
import { FiHome } from "react-icons/fi";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Form, Modal } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postsBySearch } from "../../redux/features/PostSlice";
import CreatePost from "../../components/CreatePost";

const HomePageNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { allPosts } = useSelector((state) => state.Posts);
  const [allSearchResult, setAllResult] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postsBySearch(searchText));
    setShowSearch(false);
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

  if (showSearch) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          minHeight: "100vh",
          backgroundColor: "white",
          padding: "15px",
        }}
      >
        <div
          style={{
            width: "100%",
            paddingBottom: "10px",
            borderWidth: "0px 0px 1px 0px",
            borderStyle: "solid",
            borderColor: "black",
            display: "grid",
            // gridTemplateColumns:"repeat(12,1fr)",
            gridTemplateColumns: "auto 30px",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <Form
            style={{
              borderRadius: "14px",
              backgroundColor: "#f7f7f7",
              paddingLeft: "5px",
              paddingRight: "5px",
              width: "100%",
            }}
            onSubmit={handleSubmit}
          >
            <Form.Control
              autoFocus={true}
              className="searchBox"
              placeholder="fedorain search..."
              name="search"
              style={{
                backgroundColor: "#f7f7f7",
                height: "25px",
                width: "100%",
                border: "none",
              }}
              value={searchText}
              onChange={(e) => handleChange(e)}
            />
          </Form>
          <IconButton sx={{ padding: "3px", width: "30px" }} type="submit">
            <Search />
          </IconButton>
        </div>
      </div>
    );
  }

  return (
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
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // gap: "20px",
          padding: "0px 0px",
          backgroundColor: "white",
          borderStyle: "solid",
          borderWidth: "0px 0px 1px 0px",
          borderColor: "black",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "0px 0px 0px 10px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ color: "#0d77da", fontSize: "22px", fontWeight: 700 }}
          >
            fedorain
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{ padding: "5px" }}
              onClick={currentUser ? handleShow : () => navigate("/auth/login")}
            >
              <Avatar
                sx={{
                  width: 26,
                  height: 26,
                  backgroundColor: "#deded9",
                }}
              >
                <Add sx={{ color: "black" }} />
              </Avatar>
            </IconButton>
            <IconButton
              sx={{ padding: "5px" }}
              onClick={() => {
                setShowSearch(true);
              }}
            >
              <Avatar
                sx={{ width: 26, height: 26, backgroundColor: "#deded9" }}
              >
                <Search sx={{ fontSize: "22px", color: "black" }} />
              </Avatar>
            </IconButton>
            <IconButton sx={{ padding: "5px" }}>
              <Avatar
                sx={{ width: 26, height: 26, backgroundColor: "#deded9" }}
              >
                <Menu sx={{ color: "black", fontSize: "22px" }} />
              </Avatar>
            </IconButton>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            width: "100%",
          }}
        >
          <IconButton
            onClick={() => {
              navigate("/");
            }}
          >
            <FiHome style={{ fontSize: "22px" }} />
          </IconButton>
          <IconButton>
            <LoginOutlinedIcon />
          </IconButton>
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default HomePageNavbar;
