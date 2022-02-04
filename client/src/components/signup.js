import React, { Component } from "react";
import { Grid, Paper, TextField, Button, Typography } from "@mui/material";
import logo from "./Images/container logo.PNG";
import "./styles.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ParticleBackground  from '../ParticleBackground'
import axios from "axios";

let endpoint = "http://localhost:8080";

class Signup extends Component {
  //create state for the form
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    console.log(this.state);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post(endpoint + "api/users/signup", newUser) 
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const paperStyle = {
      padding: 20,
      height: "70vh",
      width: 500,
      margin: "100px  auto",
      borderRadius: '25px'
    };
    const theme = createTheme({
      palette: {
        background: {
          default: "#163766",
        },
      },
    });
    return (
      <ThemeProvider theme={theme}>
        <ParticleBackground/>
        <CssBaseline />
        <Grid>
          <Paper elevation={24} style={paperStyle}>
            <Grid align="center">
              <img src={logo} alt="My logo" />
              <h2>Sign Up</h2>
            </Grid>
            <form onSubmit={this.onSubmit}>
              <Grid container direction={"column"} spacing={2}>
                <Grid item>
                  <TextField
                    label="Enter First Name"
                    placeholder="Enter First Name"
                    fullWidth
                    required
                    onChange={(e) => {
                      this.setState({ firstName: e.target.value });
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Enter Last Name"
                    placeholder="Enter Last Name"
                    fullWidth
                    required
                    onChange={(e) => {
                      this.setState({ lastName: e.target.value });
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="E-mail Address"
                    placeholder="Enter E-mail Address"
                    fullWidth
                    required
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Create Password"
                    placeholder="Enter Password"
                    type="password"
                    fullWidth
                    required
                    onChange={(e) => {
                      this.setState({ password: e.target.value });
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Confirm Password"
                    placeholder="Enter Password"
                    type="password"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    fullWidth
                  >
                    Register
                  </Button>
                </Grid>
                <Grid item>
                  <Typography align="center">
                    Already have an account?
                  </Typography>
                  <a href="/login">
                    <Typography> Sign in!</Typography>
                  </a>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </ThemeProvider>
    );
  }
}

export default Signup;
