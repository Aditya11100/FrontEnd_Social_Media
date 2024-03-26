import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Posts from "../../component/Posts";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../Redux/posts";

const drawerWidth = 240;

const Dashboard = (props: any) => {
  const [post, setPost] = useState("");
  const dispatch = useDispatch<any>();
  const postData = useSelector((state: any) => state?.postReducer?.postData);

  useEffect(() => {
    const params = "?page=1&limit=10";
    fetchPosts(params);
  }, []);

  const fetchPosts = (params: string) => {
    const obj = {
      // successCallback: successCallback,
      params: params,
    };
    dispatch(getPosts(obj));
  };

  const successCallback = (respoonse: any) => {};

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
      {/* <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
        non enim praesent elementum facilisis leo vel. Risus at ultrices mi
        tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
        tellus. Convallis convallis tellus id interdum velit laoreet id donec
        ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
        suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
        quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
        proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
        tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
        varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
        Lorem donec massa sapien faucibus et molestie ac.
      </Typography>
      <Typography paragraph>
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
        ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
        integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi
        lacus sed viverra tellus. Purus sit amet volutpat consequat mauris.
        Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
        vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra
        accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
        Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique
        senectus et. Adipiscing elit duis tristique sollicitudin nibh sit.
        Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra
        maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
        aliquam ultrices sagittis orci a.
      </Typography> */}
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
            padding: 2,
            borderRadius: 1,
          }}
        >
          <TextField
            fullWidth
            label="Add Post"
            id="fullWidth"
            variant="standard"
            value={post}
            onChange={(event) => setPost(event.target.value)}
          />
          <Button disabled={post === ""} onClick={() => setPost("")}>
            Post
          </Button>
        </Box>
        {postData?.data?.length > 0
          ? postData?.data?.map((item: any) => (
              <Posts key={item.id} post={item} />
            ))
          : null}
        {/* <Posts />
        <Posts />
        <Posts /> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
