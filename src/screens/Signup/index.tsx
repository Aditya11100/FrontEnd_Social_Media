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
import { IconButton, InputAdornment, Modal } from "@mui/material";
import OtpInput from "../../component/OtpInput";
import { validations } from "../../Utils/functions";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { signUpUser, verifyOtpApi } from "../../Redux/login";

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

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [formValue, setFormValue] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    number: "",
  });
  const [error, setError] = React.useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    number: false,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errorObj = { ...error };
    if (!validations.email.test(formValue.email)) {
      errorObj.email = true;
    }
    if (!validations.password.test(formValue.password)) {
      errorObj.password = true;
    }
    if (formValue.firstName.trim().length === 0) {
      errorObj.firstName = true;
    }
    if (formValue.lastName.trim().length === 0) {
      errorObj.lastName = true;
    }
    if (formValue.number.trim().length < 10) {
      errorObj.number = true;
    }

    if (Object.values(errorObj).includes(true)) {
      setError(errorObj);
    } else {
      let body = { ...formValue, number: Number(formValue.number) };
      const data = {
        body: body,
        successCallback: successSignUpCallback,
      };
      dispatch(signUpUser(data));
    }
  };

  const successSignUpCallback = (response: any) => {
    setOpen(true);
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
      successCallback: successVerifyCallback,
    };
    dispatch(verifyOtpApi(data));
  };

  const successVerifyCallback = (response: any) => {
    setOpen(false);
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formValue.firstName}
                  onChange={(event) => {
                    handleChange(event.target.name, event.target.value);
                    if (error.firstName) {
                      setError({ ...error, firstName: false });
                    }
                  }}
                  error={error.firstName}
                  helperText={
                    error.firstName ? "First Name is Required." : null
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formValue.lastName}
                  onChange={(event) => {
                    handleChange(event.target.name, event.target.value);
                    if (error.lastName) {
                      setError({ ...error, lastName: false });
                    }
                  }}
                  error={error.lastName}
                  helperText={error.lastName ? "Last Name is Required." : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formValue.email}
                  onChange={(event) => {
                    handleChange(event.target.name, event.target.value);
                    if (error.email) {
                      setError({ ...error, email: false });
                    }
                  }}
                  error={error.email}
                  helperText={error.email ? "Invalid Email" : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="number"
                  label="Phone Number"
                  type="tel"
                  id="number"
                  maxRows={10}
                  value={formValue.number}
                  onChange={(event) => {
                    handleChange(event.target.name, event.target.value);
                    if (error.number) {
                      setError({ ...error, number: false });
                    }
                  }}
                  error={error.number}
                  helperText={error.number ? "Number should be 10 digit" : null}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="login"
                  variant="body2"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <Modal
        open={open}
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
