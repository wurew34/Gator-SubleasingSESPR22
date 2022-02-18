import React from "react";
import { Grid, Paper, TextField, Button, Typography } from "@mui/material";
import logo from "./Images/container logo.PNG";
import "./styles.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

let endpoint = "http://localhost:8080";

const Dashboard = (props) => {
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
        setFirstName(res.data.First_name);
        setLastName(res.data.Last_name);
        setEmail(res.data.Email);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUser = () => {
    axios
      .put(endpoint + "/api/user", {
        First_name: firstName,
        Last_name: lastName,
        Email: email,
      })
      .then((res) => {
        console.log(res);
        fetchUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  const displayUser = () => {
    fetchUser();
    return (
      <div>
        <Typography variant="h4">Welcome to Dashboard!</Typography>
        <Typography variant="h5">
          {firstName} {lastName}
        </Typography>
        <Typography variant="h5">{email}</Typography>
      </div>
    );
  };
  return (
    <Grid item xs={12}>
      <Grid container spacing={10}>
        <Grid item xs={16}>
          <Typography variant="h5">Welcome to your dashboard</Typography>
        </Grid>
        <Grid item xs={12} style={{textAlign:"center"}}>
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
  );
};

export default Dashboard;
