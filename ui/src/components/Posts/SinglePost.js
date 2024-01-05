import React from "react";
import {
  Card,
  Box,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import {
  ThumbUpAlt,
  ThumbUpAltOutlined,
  Delete,
  MoreVert,
} from "@mui/icons-material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

const SinglePost = ({ post }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <CardMedia
        title={post.title}
        image={post.selectedFile}
        sx={{
          backgroundColor: "rgba(0,0,0,0.5)",
          backgroundBlendMode: "darken",
          height: "150px",
          width: "100%",
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          padding: "15px",
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "white" }} fontWeight="bold">
            {post.creatorName.split(" ")[0].length > 10
              ? `${post.creatorName.split(" ")[0]} ...`
              : `${post.creatorName.split(" ")[0]} ${post.creatorName
                  .split(" ")[1]
                  .slice(0, 3)}...`}
          </Typography>

          <IconButton
            sx={{ color: "white" }}
            onClick={(e) => {
              // e.stopPropagation();
              // setcurrentid(post._id);
            }}
          >
            <MoreVert color="white" />
          </IconButton>
        </Box>

        <Box>
          <Typography sx={{ color: "white" }}>
            {moment(post.createdAt).fromNow()}
          </Typography>
        </Box>
      </Box>

      <Box margin={"10px 15px"}>
        <Typography variant="body2" color="primary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
        <Typography variant="h5" component="h2">
          {post.title}
        </Typography>
      </Box>

      <CardContent
        sx={{
          paddingBottom: 0,
          paddingTop: 0,

          "&:last-child": {
            paddingBottom: 0,
          },
        }}
      >
        <div
          style={{
            height: "80px",
            maxHeight: "80px",
            // border: "1px solid black",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {post.description.substring(0, 100)}&nbsp;...
          </Typography>
          <Link to={`/post/details/${post._id}`}>
            <Button
              variant="text"
              sx={{
                cursor: "pointer",
                textTransform: "none",
                padding: "0",
                "&:hover": {
                  background: "white",
                },
              }}
            >
              see more
            </Button>
          </Link>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default SinglePost;
