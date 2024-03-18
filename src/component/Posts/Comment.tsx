import { Box, Typography } from "@mui/material";
import React from "react";

const Comment = () => {
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
        <Typography style={{ fontSize: 14 }}>User Name 1</Typography>
        <Typography style={{ fontSize: 12 }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s,
        </Typography>
      </Box>
    </Box>
  );
};

export default Comment;
