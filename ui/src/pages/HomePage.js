import { Grid, Typography, AppBar, Box } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import AllPosts from "../components/Posts/AllPosts";
import { useDispatch, useSelector } from "react-redux";
import {
  getPosts,
  postsBySearch,
  allPostsOnly,
} from "../redux/features/PostSlice";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Search } from "@mui/icons-material";
import SinglePost from "../components/Posts/SinglePost";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const { posts } = useSelector((state) => state.Posts);

  return (
    <div
      style={{
        paddingLeft: "60px",
        paddingRight: "60px",
        minHeight: "100vh",
        height: "100vh",
        width: "100vw",
        // position: "relative",
        backgroundColor: "#deded9",
      }}
    >
      <div>
        {posts?.length === 0 ? (
          <Typography style={{ textAlign: "center", padding: "20px" }}>
            You have No Post. Create Your Own Post
          </Typography>
        ) : (
          <Grid container spacing={3} marginTop={"10px"}>
            {posts.map((post) => (
              <Grid item key={post._id} xs={12} sm={6} md={4} lg={3}>
                <SinglePost post={post} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default HomePage;
