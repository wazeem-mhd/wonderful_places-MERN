import { Container, Paper, Typography, Divider } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../redux/features/AuthSlice";
import SecondSignupPage from "./SecondSignupPage";
import { useMediaQuery } from "react-responsive";

const formValidation = Yup.object().shape({
  email: Yup.string()
    .required("please enter your email address")
    .email("Invalid email"),
  password: Yup.string()
    .required("please enter the password")
    .min(6, "must be contain 6 letters"),
  confirmPassword: Yup.string()
    .required("password doesn't match")
    .oneOf([Yup.ref("password"), null], "password doesn't match"),
});

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: formValidation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, { resetForm }) => {
      navigate("/auth/signup/userinfo", { state: values });
      // console.log(values)
    },
  });

  const isMobile = useMediaQuery({ query: "(max-width: 319px)" });
  const isLargerMobile = useMediaQuery({ query: "(min-width: 320px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 641px)" });

  return (
    <div style={{ marginTop: "40px" }}>
      <Typography
        fontSize={isTablet ? "30px" : isMobile ? "18px" : "24px"}
        sx={{ textAlign: "center", marginBottom: "20px" }}
      >
        Make the most of your professional life
      </Typography>
      <Container maxWidth={"xs"}>
        <Paper elevation={3} sx={{ padding: "15px", marginBottom: "20px" }}>
          <Form className="mt-4" onSubmit={Formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label
                style={{
                  color: `${Formik.errors.email ? "rgb(226, 4, 4)" : "black"}`,
                }}
              >
                Email
              </Form.Label>
              <Form.Control
                {...Formik.getFieldProps("email")}
                type="text"
                size="sm"
                className="w-100 border border-black"
              />
              {Formik.errors.email && (
                <Typography
                  sx={{
                    color: "red",
                    fontSize: "14px",
                    marginTop: "15px",
                  }}
                >
                  {Formik.errors.email}
                </Typography>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label
                style={{
                  color: `${
                    Formik.errors.password ? "rgb(226, 4, 4)" : "black"
                  }`,
                }}
              >
                Password (6+ characters)
              </Form.Label>
              <Form.Control
                {...Formik.getFieldProps("password")}
                type="password"
                size="sm"
                className="w-100 border border-black"
              />
              {Formik.errors.password && (
                <Typography
                  sx={{
                    color: "red",
                    fontSize: "14px",
                    marginTop: "15px",
                  }}
                >
                  {Formik.errors.password}
                </Typography>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label
                style={{
                  color: `${
                    Formik.errors.confirmPassword ? "rgb(226, 4, 4)" : "black"
                  }`,
                }}
              >
                Confirm Password
              </Form.Label>
              <Form.Control
                {...Formik.getFieldProps("confirmPassword")}
                type="password"
                size="sm"
                className="w-100 border border-black"
              />
              {Formik.errors.confirmPassword && (
                <Typography
                  sx={{
                    color: "red",
                    fontSize: "14px",
                    marginTop: "15px",
                  }}
                >
                  {Formik.errors.confirmPassword}
                </Typography>
              )}
            </Form.Group>
            <Button
              type="submit"
              style={{ backgroundColor: "rgb(36, 72, 170)" }}
              className="signinbtn w-100 rounded-pill mt-3"
            >
              Sign up
            </Button>
          </Form>
          <Divider
            sx={{ width: "100%", marginTop: "15px" }}
            orientation="horizontal"
          >
            or
          </Divider>
          <Button className="rounded-pill w-100  text-bg-light mt-3">
            <FcGoogle /> Continue with google
          </Button>
          <Typography sx={{ textAlign: "center", marginTop: "20px" }}>
            Do you have an account ? <Link to="/auth/login">Sign in</Link>
          </Typography>
        </Paper>
        <Typography
          sx={{ textAlign: "center", marginTop: "20px", marginBottom: "40px" }}
        >
          Looking to create a page for your own?{" "}
          <Link to="/auth/login">Get help</Link>
        </Typography>
      </Container>
    </div>
  );
};

export default SignupPage;
