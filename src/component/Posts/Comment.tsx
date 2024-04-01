import { Box, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";

interface CommentProps {
  isSending?: boolean;
  comment?: any;
  deleteComment?: () => void;
}

const Comment = ({ isSending, comment, deleteComment }: CommentProps) => {
  const userData = useSelector((state: any) => state?.loginReducer?.userData);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        marginTop: 1,
        marginBottom: 1,
      }}
    >
      <Box
        component="img"
        sx={{
          height: 30,
          width: 30,
          borderRadius: 7,
          marginTop: 1,
        }}
        alt="Image"
        src="https://images.unsplash.com/photo-1709667642843-12864d3d78e8?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <Box
        sx={{
          backgroundColor: "#ededed",
          borderRadius: 2,
          marginLeft: 2,
          padding: 1,
        }}
      >
        <Typography
          style={{
            fontSize: 14,
            fontStyle: isSending ? "italic" : "normal",
            color: isSending ? "rgba(110, 110, 110, 1)" : "black",
          }}
        >
          {isSending
            ? `${userData?.firstName} ${userData?.lastName}`
            : `${comment?.user?.firstName} ${comment?.user?.lastName}`}
        </Typography>
        <Typography
          style={{
            fontSize: 12,
            fontStyle: isSending ? "italic" : "normal",
            color: isSending ? "rgba(110, 110, 110, 1)" : "black",
          }}
        >
          {comment?.body}
        </Typography>
      </Box>
      {!isSending && comment?.user?._id === userData?._id && (
        <DeleteIcon
          style={{ cursor: "pointer", height: 18 }}
          onClick={() => deleteComment?.()}
        />
      )}
    </Box>
  );
};

export default Comment;
