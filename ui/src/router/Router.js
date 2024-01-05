import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  Home,
  MainLogin,
  PageNotFound,
  PostDetails,
  SecondLogin,
  Signup,
} from "../pages/PageConfig";
import HomeLayout from "../layout/HomeLayout";
import loginLayout from "../layout/LoginLayout";
import SignupLayout from "../layout/SignupLayout";
import LoginLayout from "../layout/LoginLayout";
import SecondSignupPage from "../pages/SecondSignupPage";
import VerifyEmail from "../components/VerifyEmail";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/home",
        element: <Navigate to={"/"} />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/details/:id",
        element: <PostDetails />,
      },
    ],
  },
  {
    path: "/",
    element: <SignupLayout />,
    children: [
      {
        path: "/auth/login",
        element: <SecondLogin />,
      },
      {
        path: "/auth/signup",
        element: <Signup />,
      },
      {
        path: "/auth/signup/userinfo",
        element: <SecondSignupPage />,
      },
    ],
  },
  {
    path: "/",
    element: <LoginLayout />,
    children: [
      {
        path: "/login",
        element: <MainLogin />,
      },
    ],
  },
  {
    path: "/:user_id/verify/:token",
    element: <VerifyEmail />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default Routes;
