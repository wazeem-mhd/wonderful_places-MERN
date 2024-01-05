import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Paper,
  Typography,
  Container,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { useMediaQuery } from "react-responsive";
import { Modal } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { loginUser } from "../redux/Api";
import "./styles/SecondLoginStyle.css";

const formValidation = Yup.object().shape({
  email: Yup.string()
    .required("please enter your email address")
    .email("Invalid email"),
  password: Yup.string()
    .required("please enter the password")
    .min(6, "must be contain 6 letters"),
});

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>{props.message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const SecondLoginPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 349px)" });
  const isLargerMobile = useMediaQuery({ query: "(min-width: 350px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 641px)" });

  const location = useLocation();

  const beforeEmail = location.state;
  // console.log(location);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const Formik = useFormik({
    initialValues: {
      email: beforeEmail ? beforeEmail : "",
      password: "",
    },
    validationSchema: formValidation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { resetForm }) => {
      // console.log(values);

      const responseData = await loginUser(values);

      if (!responseData) {
        console.log("there is an error");
      }
      setMessage("");
      if (responseData.data?.user) {
        localStorage.setItem("profile", JSON.stringify(responseData.data));
        navigate("/");
      }
      if (responseData.data?.message) {
        setMessage(responseData.data.message);
        setModelShow(true);
      }
    },
  });

  const [modelShow, setModelShow] = useState(false);

  return (
    <div style={{ marginTop: "30px" }}>
      <Container maxWidth={"xs"}>
        {message && (
          <MyVerticallyCenteredModal
            message={message}
            show={modelShow}
            onHide={() => setModelShow(false)}
          />
        )}
        <Paper
          elevation={3}
          sx={{ borderRadius: "10px", padding: "20px", marginBottom: "20px" }}
        >
          <Typography
            className="signIn-text"
            fontSize={"30px"}
            sx={{ fontWeight: "700" }}
          >
            Sign in
          </Typography>
          <Typography sx={{ paddingBottom: "30px" }} className="after-signup">
            Stay update on your professional world
          </Typography>
          <form autoComplete="false" onSubmit={Formik.handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <TextField
                className="textFields"
                {...Formik.getFieldProps("email")}
                variant="standard"
                fullWidth
                label="Email or Phone No"
                sx={{
                  height: isTablet ? "50px" : "40px",
                  border: "1px solid black",
                  borderRadius: "5px",
                  "&:focus": {
                    border: "1px solid blue",
                  },
                }}
                InputProps={{
                  className: "textFields",
                  disableUnderline: true,
                  sx: {
                    paddingLeft: "16px",
                    height: isTablet ? "40px" : "24px",
                    fontSize: isTablet ? "20px" : "16px",
                  },
                }}
                InputLabelProps={{
                  className: "textFields",
                  sx: {
                    height: isTablet ? "40px" : "24px",
                    fontSize: isTablet ? "20px" : "16px",
                    paddingLeft: "20px",
                    textAlign: "center",
                  },
                }}
              />
              {Formik.errors.email && (
                <Typography
                  sx={{
                    color: "red",
                    fontSize: "14px",
                  }}
                >
                  {Formik.errors.email}
                </Typography>
              )}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <TextField
                className="textFields"
                {...Formik.getFieldProps("password")}
                variant="standard"
                fullWidth
                label="Password"
                sx={{
                  height: isTablet ? "50px" : "40px",
                  border: "1px solid black",
                  borderRadius: "5px",
                }}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    paddingLeft: "16px",
                    height: isTablet ? "40px" : "24px",
                    fontSize: isTablet ? "20px" : "16px",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    height: isTablet ? "40px" : "24px",
                    fontSize: isTablet ? "20px" : "16px",
                    paddingLeft: "20px",
                    textAlign: "center",
                  },
                }}
              />
              {Formik.errors.password && (
                <Typography
                  sx={{
                    color: "red",
                    fontSize: "14px",
                  }}
                >
                  {Formik.errors.password}
                </Typography>
              )}
            </div>
            <Link to="/home">
              <Button
                variant="text"
                sx={{
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                Forgot password?
              </Button>
            </Link>
            <Button
              className="submit-button"
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                borderRadius: "25px",
                minHeight: "45px",
                textTransform: "none",
                marginTop: "10px",
                fontWeight: "600",
                fontSize: "18px",
                backgroundColor: "#38bb9a",
              }}
            >
              Sign in
            </Button>
          </form>

          <Divider
            sx={{ width: "100%", marginTop: "15px" }}
            orientation="horizontal"
          >
            or
          </Divider>
          <Button
            className="form-button rounded-pill w-100 text-bg-light mt-3 bg-white"
            sx={{ minHeight: "40px" }}
            variant="outlined"
          >
            <FcGoogle /> Continue with google
          </Button>
          <Button
            className="form-button rounded-pill w-100 text-bg-light mt-3 bg-white"
            sx={{ minHeight: "40px" }}
            variant="outlined"
          >
            Continue without Sign in
          </Button>
        </Paper>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          New to WonderIn?{" "}
          <Link to="/auth/signup">
            <Button
              variant="text"
              className="rounded-pill"
              sx={{
                fontWeight: "600",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              join now
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default SecondLoginPage;
