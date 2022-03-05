import React, { useEffect } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Toolbar,
} from "@mui/material";
import logo from "./Images/container logo.PNG";
import "./styles.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";

let endpoint = "http://localhost:8080";

const Profile = (props) => {
  const decoded = jwt_decode(localStorage.getItem("token"));
  const [firstName, setFirstName] = React.useState(decoded.First_name);
  const [lastName, setLastName] = React.useState(decoded.Last_name);
  const [email, setEmail] = React.useState(decoded.Email);
  console.log(decoded);

  let navigate = useNavigate();
  const fetchUser = () => {
    axios
      .get(endpoint + "/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const displayUser = () => {
    fetchUser();
    return (
      <div>
        <Typography variant="h4">Profile Settings</Typography>
        <Typography variant="h5">
          {firstName} {lastName}
        </Typography>
        <Typography variant="h5">{email}</Typography>
      </div>
    );
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
        </Toolbar>
      </AppBar>

      <Grid item xs={12}>
        <Grid container spacing={10}>
          <Grid
            item
            xs={12}
            sx={{ margin: 10 }}
            style={{ textAlign: "center" }}
          >
            {displayUser()}
            <Button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
