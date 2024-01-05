import React from "react";
import { Outlet } from "react-router-dom";
import { Typography } from "@mui/material";
import "./styles/SignupStyle.css";

const SignupLayout = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <div
        className="navbar-header"
        style={{ width: "100%", paddingLeft: "95px", paddingTop: "50px" }}
      >
        <Typography
          className="header-text"
          sx={{ color: "#38bb9a", fontSize: "35px", fontWeight: "700" }}
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
      <Outlet />
    </div>
  );
};

export default SignupLayout;
