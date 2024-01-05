import React from "react";
import { Outlet } from "react-router-dom";
import { Button, Divider, IconButton, Typography } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HomeIcon from "@mui/icons-material/Home";
import "./styles/LoginStyle.css";

const LoginLayout = () => {
  return (
    <div
      className="loginNavbar"
      style={{ width: "100vw", paddingLeft: "95px", paddingTop: "14px" }}
    >
      <div
        className="navbar"
        style={{
          display: "flex",
          paddingRight: "95px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="navbar-header1">
          <Typography
            sx={{ color: "#38bb9a", fontSize: "28px" }}
            className="navbar-header-text"
          >
            Wonder
            <span
              style={{
                background: "#38bb9a",
                marginLeft: "3px",
                color: "white",
                paddingLeft: "3px",
                paddingRight: "5px",
                borderRadius: "3px",
              }}
            >
              in
            </span>
          </Typography>
        </div>
        <div
          className="navbar-action"
          style={{ display: "flex", flexDirection: "row", gap: "20px" }}
        >
          <div
            className="action1"
            style={{ display: "flex", flexDirection: "row", gap: "20px" }}
          >
            <IconButton
              className="accountIcon"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ManageAccountsIcon />
              <Typography sx={{ fontSize: "13px" }}>account</Typography>
            </IconButton>
            <IconButton
              className="homeIcon"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <HomeIcon />
              <Typography sx={{ fontSize: "13px" }}>home</Typography>
            </IconButton>
          </div>
          <Divider
            className="devider"
            sx={{ border: "1px solid" }}
            orientation="vertical"
            flexItem
            variant="middle"
          />
          <div
            className="action2"
            style={{
              display: "flex",
              gap: "20px",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="text"
              size="large"
              sx={{ borderRadius: "30px" }}
              className="join-button"
            >
              Join now
            </Button>
            <Button
              className="signin-button"
              variant="outlined"
              size="large"
              sx={{ borderRadius: "30px" }}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default LoginLayout;
