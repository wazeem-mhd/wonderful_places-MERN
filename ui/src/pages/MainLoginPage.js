import { Divider, Grid, Grow, Typography } from "@mui/material";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import sideImage from "../assets/images/frontLoginImg.svg";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/Api";
import "./styles/MainLoginStyle.css";
import { useMediaQuery } from "react-responsive";

const formValidation = Yup.object().shape({
  email: Yup.string()
    .required("Please enter an email address or phone number")
    .min(2, "Email or phone number must be between 3 to 128 characters"),
  password: Yup.string()
    .required("Please enter a password")
    .min(6, "The password you provided must have at least 6 characters"),
});

const MainLoginPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 319px)" });
  const isLargerMobile = useMediaQuery({ query: "(min-width: 320px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 641px)" });
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formValidation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      // const emailRegex =new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
      // if(emailRegex.test(values)){}

      var mailformat =
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!values.email.match(mailformat)) {
        navigate("/auth/login", { state: values.email });
      } else {
        const { data: response } = await loginUser(values);
        if (response?.user) {
          localStorage.setItem("profile", JSON.stringify(response));
          navigate("/");
        } else {
          setErrMsg(response.message);
        }

        if (response?.token) {
          localStorage.setItem("profile", JSON.stringify(response));
          navigate("/home");
        }
      }
      // console.log(values);
      // resetForm();
    },
  });

  return (
    <div
      style={{ width: "100%", marginTop: "40px", position: "relative" }}
      className="loginContainer"
    >
      <Grow in>
        <Grid container spacing={5} columns={16}>
          <Grid item xs={16} lg={8} md={10} className="fmControll">
            <p
              style={{
                fontSize: "40px",
                lineHeight: "60px",
                color: "rgb(150, 48, 1)",
              }}
              className="loginText fw-light"
            >
              Welcome to your professional community
            </p>

            {errMsg && (
              <Typography color={"red"} fontSize={"25px"}>
                {errMsg}
              </Typography>
            )}
            <Form className="mt-4 w-100" onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    color: `${
                      formik.errors.email ? "rgb(226, 4, 4)" : "black"
                    }`,
                  }}
                >
                  Email or Phone
                </Form.Label>
                <Form.Control
                  {...formik.getFieldProps("email")}
                  type="text"
                  size={`${isTablet ? "lg" : "sm"}`}
                  style={{ height: "40px" }}
                  className={`mainLoginForm ${
                    isTablet ? "w-75" : "w-100"
                  }  border border-black`}
                />
                {formik.errors.email && (
                  <Typography
                    sx={{
                      color: "red",
                      fontSize: "14px",
                      marginTop: "15px",
                    }}
                  >
                    {formik.errors.email}
                  </Typography>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label
                  style={{
                    color: `${
                      formik.errors.password ? "rgb(226, 4, 4)" : "black"
                    }`,
                  }}
                >
                  Password
                </Form.Label>
                <Form.Control
                  {...formik.getFieldProps("password")}
                  type="password"
                  size={`${isTablet ? "lg" : "sm"}`}
                  style={{ height: "40px" }}
                  className={`mainLoginForm ${
                    isTablet ? "w-75" : "w-100"
                  } h-14 border border-black`}
                />
                {formik.errors.password && (
                  <Typography
                    sx={{
                      color: "red",
                      fontSize: "14px",
                      marginTop: "15px",
                    }}
                  >
                    {formik.errors.password}
                  </Typography>
                )}
              </Form.Group>
              <Typography>
                <Link
                  to="/auth/login"
                  style={{
                    textDecoration: "none",
                    color: "#38bb9a",
                    fontWeight: 600,
                  }}
                >
                  Forgot Password
                </Link>
              </Typography>
              <Button
                style={{
                  height: "40px",
                  background: "#38bb9a",
                  border: "none",
                  fontWeight: "600",
                }}
                className={`${
                  isTablet ? "w-75" : "w-100"
                } signinbtn rounded-pill mt-3`}
                type="submit"
              >
                Sign in
              </Button>
            </Form>

            <Divider
              sx={{ width: "75%", marginTop: "25px" }}
              orientation="horizontal"
            >
              or
            </Divider>
            <Button
              className={`rounded-pill ${
                isTablet ? "w-75" : "w-100"
              } text-bg-light mt-3`}
            >
              <FcGoogle /> Continue with google
            </Button>
            <Button
              className={`${
                isTablet ? "w-75" : "w-100"
              } rounded-pill fw-bolder mt-3 text-bg-secondary ${
                isTablet ? "w-75" : "w-100"
              } mb-5`}
              onClick={() => navigate("/auth/signup")}
            >
              New to wonderin? join now
            </Button>
          </Grid>
          <Grid item sm={16} lg={7} md={6}>
            <div
              className="loginImage"
              style={{
                marginTop: "50px",
                width: "600px",
                maxWidth: "650px",
                // position: "absolute",
                // top: "20px",
                // right: "-20px",
              }}
            >
              <img src={sideImage} alt="sideImage" style={{ width: "100%" }} />
            </div>
          </Grid>
        </Grid>
      </Grow>
    </div>
  );
};

export default MainLoginPage;
