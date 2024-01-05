import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import CheckConnection from "./components/CheckConnection";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { allPostsOnly, getPosts } from "./redux/features/PostSlice";

// import { useEffect, useState } from "react";
// import { Typography } from "@mui/material";
// import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allPostsOnly());
  }, [dispatch]);

  return (
    // <CheckConnection>
    <RouterProvider router={router} />
    // </CheckConnection>
  );

  // const [isOnline, setIsOnline] = useState(Navigator.onLine);

  // useEffect(() => {
  //   function onlineHandler() {
  //     setIsOnline(true);
  //   }

  //   function offlineHandler() {
  //     setIsOnline(false);
  //   }

  //   window.addEventListener("online", onlineHandler);
  //   window.addEventListener("offline", offlineHandler);

  //   return () => {
  //     window.removeEventListener("online", onlineHandler);
  //     window.removeEventListener("offline", offlineHandler);
  //   };
  // }, []);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [dispatch]);
}

export default App;
