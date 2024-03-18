import { Box, Button, SxProps, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import SeeMore from "../SeeMore";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import Comment from "./Comment";

const Posts = () => {
  const [like, setLike] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");

  return (
    <Box sx={boxContainer}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          component="img"
          sx={{
            height: 40,
            width: 40,
            borderRadius: 10,
          }}
          alt="Image"
          src="https://images.unsplash.com/photo-1709667642843-12864d3d78e8?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Box sx={{ display: "flex", flexDirection: "column", marginLeft: 1 }}>
          <Typography
            onClick={() => console.log("HI123")}
            style={{ cursor: "pointer" }}
            variant="subtitle2"
          >
            User Name
          </Typography>
          <Typography
            style={{ fontSize: 10 }}
            variant="caption"
            display="block"
          >
            12th Sept, 2024
          </Typography>
        </Box>
      </Box>
      <SeeMore>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </SeeMore>
      <Box
        component="img"
        sx={{
          height: 250,
          width: "100%",
          borderRadius: 2,
          marginTop: 1,
        }}
        alt="The house from the offer."
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
      />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThumbUpIcon
            style={{ cursor: "pointer", color: like ? "#1780d1" : "black" }}
            onClick={() => setLike(!like)}
          />
        </Box>
        <div style={{ height: 30, width: 1, backgroundColor: "#c2c2c2" }} />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CommentIcon
            style={{ cursor: "pointer" }}
            onClick={() => setShowComment(!showComment)}
          />
        </Box>
      </Box>
      {showComment && (
        <Box>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <TextField
              fullWidth
              label="Add Comment"
              id="fullWidth"
              variant="standard"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <Button disabled={comment === ""}>Post</Button>
          </Box>
          <Box sx={{ minHeight: 50, maxHeight: 250, overflow: "scroll" }}>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Posts;

const boxContainer: SxProps = {
  paddingTop: 2,
  paddingBottom: 2,
  // width: {
  //   sm: "100%", // theme.breakpoints.up('sm')
  //   md: 600,
  // },
  // margin: "auto",
  width: "100%",
  borderRadius: 2,
  borderWidth: 1,
  borderColor: "#c2c2c2",
  borderStyle: "solid",
  paddingLeft: 2,
  paddingRight: 2,
  marginTop: 2,
  marginBottom: 2,
};
