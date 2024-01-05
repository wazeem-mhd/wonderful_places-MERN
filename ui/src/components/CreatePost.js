import { Box, CircularProgress, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { MuiChipsInput } from "mui-chips-input";
import { Toast, ToastContainer, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { createNewPost } from "../redux/features/PostSlice";
import { useDispatch, useSelector } from "react-redux";

const CreatePost = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    tags: [],
    selectedFile: "",
  });

  function handleFormChange(e) {
    const { name } = e.target;
    const value = e.target.value;

    setFormData({ ...formData, [name]: value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const result = dispatch(createNewPost(formData));

    if (result) {
      setShow(true);
    } else {
      navigate("/auth/login");
    }

    // console.log(formData);
  }

  const handleChipInput = (newChip) => {
    setFormData({ ...formData, tags: newChip });
  };

  const handleCLear = () => {
    setFormData({
      title: "",
      location: "",
      description: "",
      tags: [],
      selectedFile: "",
    });
  };

  return (
    <>
      <ToastContainer position="middle-start" style={{ zIndex: 1 }}>
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={10000}
          autohide
          bg="secondary"
        >
          <Toast.Header>
            <strong className="me-auto">Information</strong>
            {/* <small>11 mins ago</small> */}
          </Toast.Header>
          <Toast.Body>
            Your post created successfully. you can see on our web site
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Place</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Name of the place"
            name="title"
            autoFocus
            value={formData.title}
            onChange={(e) => handleFormChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Location</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Where is it"
            name="location"
            autoFocus
            value={formData.location}
            onChange={(e) => handleFormChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            required
            aria-multiline
            rows={4}
            aria-expanded
            name="description"
            onChange={(e) => handleFormChange(e)}
            value={formData.description}
          />
        </Form.Group>
        <MuiChipsInput
          label="Tags"
          style={{ marginTop: "15px" }}
          value={formData.tags}
          onChange={handleChipInput}
          fullWidth
        />
        <Box sx={{ width: "100%", margin: "20px 0" }}>
          <FileBase
            // required
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              // console.log(base64);
              setFormData({ ...formData, selectedFile: base64 });
            }}
          />
        </Box>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <Button
            type="submit"
            // fullWidth
            sx={{
              textTransform: "none",
              background: "#38bb9a",
              fontWeight: "600",
              "&:hover": { background: "#38bb9a" },
            }}
            variant="contained"
          >
            Create Post
          </Button>
          <Button
            onClick={handleCLear}
            sx={{
              textTransform: "none",
              background: "#df0000",
              fontWeight: "600",
              "&:hover": { background: "#df0000" },
            }}
            variant="contained"
            // fullWidth
          >
            Clear all
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CreatePost;
