import React, { useEffect } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Toolbar,
  Divider,
  Snackbar,
} from "@mui/material";
import logo from "./Images/container logo.PNG";
import "./styles.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MuiAlert from "@mui/material/Alert";

let endpoint = "http://localhost:8080";

const paperStyle = {
  padding: "1.2em",
  height: "70vh",
  width: 500,
  borderRadius: "10px",
};

const paperStyle1 = {
  padding: "1.2em",
  height: "70vh",
  width: 500,
  borderRadius: "10px",
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = (props) => {
  const decoded = jwt_decode(localStorage.getItem("token"));
  const [firstName, setFirstName] = React.useState(decoded.First_name);
  const [lastName, setLastName] = React.useState(decoded.Last_name);
  const [email, setEmail] = React.useState(decoded.Email);
  const [password, setPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);
  console.log(decoded);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  let navigate = useNavigate();
  const fetchUser = () => {
    axios
      .get(endpoint + "/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.password);
        setPassword(res.data.password);
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
        setEmail(res.data.email);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const editUser = () => {
    setOpen(true);

    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");

    axios
      .put(endpoint + "/api/user", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        user_id: decoded.user_id,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //edit profile
  const editProfile = () => {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <AccountCircleIcon />
              </Grid>
              <Grid item>
                <Typography variant="h6">Welcome!</Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography padding={3} variant="h5">
              Profile Settings
            </Typography>
            <Divider style={{ marginBottom: 50 }} />
            <Box display="flex" flexDirection="row" justifyContent="center">
              <Box display="flex" flexDirection="column" width="50%">
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => editUser()}
              >
                Save
              </Button>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Successfully updated your profile!
                </Alert>
              </Snackbar>
            </Box>
          </Grid>
        </Grid>
      </div>
    );
  };

  const displayUser = () => {
    fetchUser();
    return (
      <div>
        <Typography variant="h4">Profile Settings</Typography>
        <Typography variant="h6">Name:</Typography>
        <Typography variant="h5">
          {firstName} {lastName}
        </Typography>
        <Typography variant="h6">Email:</Typography>
        <Typography variant="h5">{email}</Typography>
      </div>
    );
  };

  //upload image
  const uploadImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    axios
      .post(endpoint + "/api/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar id="app-bar" style={{ background: "#00529B" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <a href="/dashboard">
              <img src={logo} alt="logo" />
            </a>
          </Box>
          <Button
            color="primary"
            variant="raised"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div>
        <Grid
          container
          spacing={2}
          direction="row"
          marginTop="6em"
          marginLeft="15em"
          align="center"
          flex-direction="column"
        >
          <Grid item xs={1}>
            <Paper style={paperStyle}> {editProfile()}</Paper>
          </Grid>
          <Grid item xs>
            <label>
              <input
                accept="image/*"
                style={{ display: "none" }}
                name="upload-photo"
                type="file"
                id="upload-photo"
                onChange={uploadImage}
              />
              <Button variant="contained" component="span">
                Upload Photo
              </Button>
            </label>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default Profile;
