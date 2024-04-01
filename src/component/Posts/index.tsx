import { Box, Button, SxProps, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SeeMore from "../SeeMore";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import Comment from "./Comment";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useDispatch, useSelector } from "react-redux";
import {
  commentPost,
  deleteCommentPost,
  dislikePosts,
  likePosts,
} from "../../Redux/posts";
dayjs.extend(advancedFormat);

interface PostsProps {
  post: any;
  fromUserData?: boolean;
}

const Posts = ({ post, fromUserData }: PostsProps) => {
  const userData = useSelector((state: any) => state?.loginReducer?.userData);
  const [like, setLike] = useState(post?.likes?.includes(userData?._id));
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [showSending, setShowSending] = useState(false);
  const dispatch = useDispatch<any>();

  const likePost = () => {
    const data = {
      id: post?._id,
      successCallback: likeCallback,
      errorCallback: dislikeCallback,
    };
    dispatch(likePosts(data));
  };

  const dislikePost = () => {
    const data = {
      id: post?._id,
      successCallback: dislikeCallback,
      errorCallback: likeCallback,
    };
    dispatch(dislikePosts(data));
  };

  const likeCallback = (data: any) => {
    setLike(true);
  };

  const dislikeCallback = (data: any) => {
    setLike(false);
  };

  const addComment = () => {
    setShowSending(true);
    const data = {
      body: {
        body: comment,
      },
      id: post?._id,
      successCallback: commentCallback,
    };
    dispatch(commentPost(data));
  };

  const commentCallback = (response: any) => {
    setShowSending(false);
    setComment("");
  };

  const deleteComment = (item: any) => {
    const data = {
      id: post?._id,
      commentId: item?._id,
    };
    dispatch(deleteCommentPost(data));
  };

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
            {`${
              fromUserData ? userData?.firstName : post?.postedBy?.firstName
            } ${fromUserData ? userData?.lastName : post?.postedBy?.lastName}`}
          </Typography>
          <Typography
            style={{ fontSize: 10 }}
            variant="caption"
            display="block"
          >
            {dayjs(post?.date).format("Do MMM, YYYY")}
          </Typography>
        </Box>
      </Box>
      <SeeMore>{post?.post}</SeeMore>
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
          onClick={() => (like ? dislikePost() : likePost())}
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
            <Button disabled={comment === ""} onClick={addComment}>
              Post
            </Button>
          </Box>
          <Box sx={{ minHeight: 50, maxHeight: 250, overflow: "scroll" }}>
            {showSending && (
              <Comment isSending={true} comment={{ body: comment }} />
            )}

            {post?.comments?.length > 0 ? (
              post?.comments?.map((item: any) => (
                <Comment
                  key={item?._id}
                  comment={item}
                  deleteComment={() => deleteComment(item)}
                />
              ))
            ) : (
              <Typography
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                No comments yet.
              </Typography>
            )}
            {/* <Comment />
            <Comment />
            <Comment />
            <Comment /> */}
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
