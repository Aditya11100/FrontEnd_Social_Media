import { Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import Requests from "../../component/Requests";

const drawerWidth = 240;

const Search = () => {
  const [search, setSearch] = useState("");

  const searchUser = () => {
    setSearch("");
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          width: {
            sm: "100%", // theme.breakpoints.up('sm')
            md: 600,
          },
          margin: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            boxShadow: 3,
            paddingTop: 1,
            paddingBottom: 1,
            paddingLeft: 2,
            paddingRight: 2,
            borderRadius: 1,
          }}
        >
          <TextField
            fullWidth
            label="Add Post"
            id="fullWidth"
            variant="standard"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Button disabled={search?.trim() === ""} onClick={searchUser}>
            Search User
          </Button>
        </Box>
        <Typography style={{ fontSize: 22, fontWeight: "bold", marginTop: 20 }}>
          Requests
        </Typography>
        <Requests />
      </Box>
    </Box>
  );
};

export default Search;
