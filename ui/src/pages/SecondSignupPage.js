import React, { Fragment, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { Container, Paper, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../redux/features/AuthSlice";
import { signupUser } from "../redux/Api";

const formValidation = Yup.object().shape({
  firstName: Yup.string()
    .required("Please enter your name")
    .min(4, "name must be contain more than 4 letters"),
  lastName: Yup.string().notRequired(),
});

const SecondSignupPage = () => {
  const [err_message, setErr_message] = useState("");
  const [verify_message, setVerify_message] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message } = useSelector((state) => state.user);
  const location = useLocation();

  const userInfo = location.state;

  const Formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    validationSchema: formValidation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const allInfor = {
        email: userInfo.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: userInfo.password,
        confirmPassword: userInfo.confirmPassword,
      };
      console.log(allInfor);
      setErr_message("");
      setVerify_message("");

      const response = await signupUser(allInfor);
      console.log(response.data);
      if (!response.data?.isSuccess) {
        setErr_message(response.data.error_message);
      } else {
        setVerify_message(response.data.verify_message);
      }

      // await dispatch(createUser({ values: allInfor, navigate }));
    },
  });

  if (userInfo === null) {
    return (
      <div>
        <Typography>the server cann't response at this time</Typography>
      </div>
    );
  }

  if (verify_message) {
    return (
      <Fragment>
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography fontSize={"15px"}>{verify_message}</Typography>
        </div>
      </Fragment>
    );
  }

  return (
    <>
      <Container maxWidth={"xs"} sx={{ marginTop: "30px" }}>
        <Paper elevation={1} sx={{ padding: "15px", borderRadius: "10px" }}>
          <Form onSubmit={Formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label
                style={{
                  color: `${
                    Formik.errors.firstName ? "rgb(226, 4, 4)" : "black"
                  }`,
                }}
                className="fw-bolder"
              >
                First name *
              </Form.Label>
              <Form.Control
                {...Formik.getFieldProps("firstName")}
                type="text"
                size=""
                className="mainLoginForm w-100 h-14 border border-black"
              />
              {Formik.errors.firstName && (
                <Typography
                  sx={{
                    color: "red",
                    fontSize: "14px",
                    marginTop: "15px",
                  }}
                >
                  {Formik.errors.firstName}
                </Typography>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label
                style={{
                  color: `${
                    Formik.errors.lastName ? "rgb(226, 4, 4)" : "black"
                  }`,
                }}
                className="fw-bolder"
              >
                Last name
              </Form.Label>
              <Form.Control
                {...Formik.getFieldProps("lastName")}
                type="text"
                className="mainLoginForm w-100 border border-black"
              />
              {Formik.errors.lastName && (
                <Typography
                  sx={{
                    color: "red",
                    fontSize: "14px",
                    marginTop: "15px",
                  }}
                >
                  {Formik.errors.lastName}
                </Typography>
              )}
            </Form.Group>
            <Button
              type="submit"
              style={{ backgroundColor: "rgb(36, 72, 170)" }}
              className="signinbtn w-100 rounded-pill mt-2"
            >
              Sign in
            </Button>
          </Form>
        </Paper>
      </Container>
    </>
  );
};

export default SecondSignupPage;
