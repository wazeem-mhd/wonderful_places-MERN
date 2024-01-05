import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Paper,
  CircularProgress,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { useParams, useNavigate, Link } from "react-router-dom";
import moment from "moment";
import PostComment from "../components/PostComment";
import {
  postdetails,
  createComment,
  postComments,
} from "../redux/features/PostSlice";

const PostDetailsPage = () => {
  const { post, posts, loading, message, comments } = useSelector(
    (state) => state.Posts
  );

  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [comment, setComment] = useState("");

  // const post = useSelector((state) =>
  //   id ? state.Posts.posts.find((post) => post._id === id) : null
  // );

  useEffect(() => {
    dispatch(postdetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(postComments(id));
  }, [dispatch, id]);

  // useEffect(() => {
  //   if (post) {
  //     dispatch(postBySearch({ tags: post.tags.join(",") }));
  //   }
  // }, [dispatch, post]);

  if (!post) return <div>Invalid Post id</div>;

  const openPost = (_id) => {
    navigate(`/post/details/${_id}`);
  };

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "10px",
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "70%",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto 400px",
              }}
            >
              <div>
                <Typography variant="h3" component={"h2"}>
                  {post.title}
                </Typography>
                <Typography variant="h6">
                  Created By: {post.creatorName}
                </Typography>
                <Typography variant="body1">
                  {moment(post.createdAt).fromNow()}
                </Typography>

                <Typography
                  color="blue"
                  variant="h6"
                  component={"h2"}
                  gutterBottom
                >
                  {post?.tags?.map((tag) => (
                    <Link to={"/"} style={{ textDecoration: "none" }}>
                      #{tag}&nbsp;&nbsp;
                    </Link>
                  ))}
                </Typography>
              </div>

              <div>
                <img
                  style={{ width: "100%", height: "250px" }}
                  src={
                    post.selectedFile ||
                    "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                  }
                  alt="placeImage"
                />
              </div>
            </div>
            <Typography variant="h5" marginY={"15px"}>
              More Information
            </Typography>
            <Typography gutterBottom variant="body1" component={"p"}>
              {post.description}
            </Typography>

            <Divider style={{ margin: "20px 0" }} />
            <Typography variant="body1">
              <strong>Realtime chat -comming soon...</strong>
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
            {/* <Comment post={post} /> */}
            <Divider style={{ margin: "20px 0" }} />
          </div>
          <div
            style={{ width: "30%", display: "flex", flexDirection: "column" }}
          >
            {user ? (
              <div className="createComment">
                <Typography>Comment</Typography>
                <TextField
                  multiline={true}
                  rows={6}
                  fullWidth
                  value={comment}
                  placeholder="comment this post"
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  variant="contained"
                  size="small"
                  sx={{ marginTop: "10px", textTransform: "none" }}
                  onClick={() => {
                    dispatch(createComment(comment, post._id));
                    // console.log(comment);
                    setComment("");
                  }}
                >
                  Send
                </Button>
              </div>
            ) : (
              <Paper
                elevation={3}
                sx={{
                  paddingY: "15px",
                  paddingX: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6">
                  Create your own account or sigin for comment a post
                </Typography>
                <Button
                  sx={{ textTransform: "none" }}
                  variant="contained"
                  size="small"
                  onClick={() => navigate("/auth/signup")}
                >
                  Sign up
                </Button>
              </Paper>
            )}
            <div
              className="comments"
              style={{
                height: "200px",
                width: "100%",
                overflow: "auto",
              }}
            >
              {comments
                ? comments.map((result) => (
                    <div>
                      <Typography>{result.userName}</Typography>
                      <Typography>{result.comment}</Typography>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

//  {recommendedPosts?.length && (
//   <div>
//     <Typography variant="h6" gutterBottom>
//       You might also like this
//     </Typography>
//     <div>
//       {recommendedPosts.map(
//         ({ title, message, name, likes, selectedFile, _id }) => (
//           <div
//             style={{ margin: "20px", cursor: "pointer" }}
//             onClick={() => openPost(_id)}
//             key={_id}
//           >
//             <Typography variant="h6">{title}</Typography>
//             <Typography variant="subtitle2">{name}</Typography>
//             <Typography variant="subtitle2">{message}</Typography>
//             <Typography variant="subtitle1">
//               Likes: {likes.length}
//             </Typography>
//             <img src={selectedFile} width={"200px"} />
//           </div>
//         )
//       )}
//     </div>
//   </div>
// )}

export default PostDetailsPage;
