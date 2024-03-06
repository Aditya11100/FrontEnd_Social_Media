import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { validations } from "../../Utils/functions";
import { useDispatch } from "react-redux";
import { loginUser, verifyOtpApi } from "../../Redux/login";
import { IconButton, InputAdornment, Modal } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import OtpInput from "../../component/OtpInput";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [showPassword, setShowPassword] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [otp, setOtp] = React.useState("");

  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState({
    email: false,
    password: false,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errorObj = {
      email: false,
      password: false,
    };
    if (!validations.email.test(formValue.email)) {
      errorObj.email = true;
    }
    if (!validations.password.test(formValue.password)) {
      errorObj.password = true;
    }

    if (errorObj.email || errorObj.password) {
      setError(errorObj);
    } else {
      const data = {
        body: formValue,
        successCallback: successCallback,
        verifyOtpException: () => setOpenModal(true),
      };
      dispatch(loginUser(data));
    }
  };

  const handleChange = (name: string, value: string) => {
    let newFormData: any = {
      ...formValue,
    };
    newFormData[name] = value;
    setFormValue(newFormData);
  };

  const verifyOtp = () => {
    const data = {
      body: {
        email: formValue.email,
        otp: Number(otp),
      },
      successCallback: successCallback,
    };
    dispatch(verifyOtpApi(data));
  };

  const successCallback = (response: any) => {
    if (openModal) {
      setOpenModal(false);
    }
    navigate("/dashboard");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formValue.email}
              onChange={(event) => {
                handleChange(event.target.name, event.target.value);
                if (error.password) {
                  setError({ ...error, email: false });
                }
              }}
              error={error.email}
              helperText={error.email ? "Invalid Email" : null}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={formValue.password}
              onChange={(event) => {
                handleChange(event.target.name, event.target.value);
                if (error.password) {
                  setError({ ...error, password: false });
                }
              }}
              error={error.password}
              helperText={error.password ? "Invalid Password" : null}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link variant="body2">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link
                  href="signup"
                  variant="body2"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <Modal
        open={openModal}
        // onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Please enter OTP sent in your E-Mail.
          </Typography>
          <OtpInput
            separator={<span>-</span>}
            value={otp}
            onChange={setOtp}
            length={4}
          />
          <Button
            type="submit"
            fullWidth={false}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => verifyOtp()}
            disabled={otp.length !== 4}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
