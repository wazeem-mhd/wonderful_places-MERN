import { Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import SinglePost from "./SinglePost";

const AllPosts = () => {
  const { posts } = useSelector((state) => state.Posts);

  return (
    <div style={{ marginTop: "50px" }}>
      {posts?.length === 0 ? (
        <Typography style={{ textAlign: "center", padding: "20px" }}>
          You have No Post. Create Your Own Post
        </Typography>
      ) : (
        <Grid container alignItems="stretch" spacing={3}>
          {posts.map((post) => (
            <Grid item key={post._id} xs={12} sm={6} md={4}>
              <SinglePost post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default AllPosts;
