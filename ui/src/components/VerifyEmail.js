import React, { Fragment, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import verifyImage from "../assets/images/verifiedEmail.png";
import { Typography } from "@mui/material";
import axios from "axios";
import { Button } from "react-bootstrap";

const VerifyEmail = () => {
  const params = useParams();
  const [isVerify, setIsVerify] = useState(false);

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `https://fedorain-api.onrender.com/api/v1/user/${params.user_id}/verify/${params.token}`;
        const response = await axios.get(url);
        if (response.data.isVerify) {
          setIsVerify(true);
        } else {
          setIsVerify(false);
        }
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    verifyEmailUrl();
  });

  return (
    <Fragment>
      <div
        style={{
          minHeight: "100vh",
          minWidth: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        {!isVerify ? (
          <>
            <div style={{ width: "300px", height: "200px" }}>
              <img
                src={verifyImage}
                alt="success-img"
                style={{ width: "100%", height: "100%" }}
              />
            </div>

            <Typography component={"h1"} fontSize={"20px"}>
              Email verified successfully
            </Typography>
            <Link to={"/auth/login"}>
              <Button>Login</Button>
            </Link>
          </>
        ) : (
          <Typography>Your request could not verified, Invalid Link</Typography>
        )}
      </div>
    </Fragment>
  );
};

export default VerifyEmail;
