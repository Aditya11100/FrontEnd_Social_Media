import { Box, Button, Typography } from "@mui/material";
import React from "react";

const index = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        boxShadow: 3,
        padding: 2,
        borderRadius: 2,
        marginTop: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
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
        <Typography style={{ fontSize: 14, marginLeft: 10 }}>
          FirstName LastName
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Button variant="contained">Accept</Button>
        <Button variant="text" style={{ marginLeft: 10 }}>
          Reject
        </Button>
      </Box>
    </Box>
  );
};

export default index;
