import React, { Component } from "react";
import { Grid, Paper, TextField, Button, Typography } from "@mui/material";
import logo from "./Images/container logo.PNG";
import "./styles.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ParticleBackground from "../ParticleBackground";
import { useNavigate } from "react-router-dom";

import axios from "axios";

let endpoint = "https://sleepy-spire-27532.herokuapp.com";

const Signup = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };
    axios
      .post(endpoint + "/api/users/signup", newUser)
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 500,
    margin: "100px  auto",
    borderRadius: "25px",
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
      <ParticleBackground />
      <CssBaseline />
      <Grid>
        <Paper elevation={24} style={paperStyle}>
          <Grid align="center">
            <img src={logo} alt="My logo" />
            <h2>Sign Up</h2>
          </Grid>
          <form onSubmit={handleSubmit}>
            <Grid container direction={"column"} spacing={2}>
              <Grid item>
                <TextField
                  label="Enter First Name"
                  placeholder="Enter First Name"
                  id="first-name"
                  data-testid="first-name"
                  fullWidth
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Enter Last Name"
                  placeholder="Enter Last Name"
                  id="last-name"
                  data-testid="last-name"
                  fullWidth
                  required
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="E-mail Address"
                  placeholder="Enter E-mail Address"
                  id="email"
                  data-testid="email"
                  fullWidth
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Create Password"
                  placeholder="Enter Password"
                  type="password"
                  id="password"
                  data-testid="password"
                  fullWidth
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Confirm Password"
                  placeholder="Enter Password"
                  type="password"
                  id="confirm-password"
                  data-testid="confirm-password"
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
                <Typography align="center">Already have an account?</Typography>
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
};

export default Signup;

// class Signup extends Component {
//   //create state for the form
//   constructor() {
//     super();
//     this.state = {
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//     };
//   }

//   onChange = (e) => {
//     this.setState({ [e.target.id]: e.target.value });
//     console.log(this.state);
//   };

//   onSubmit = (e) => {
//     e.preventDefault();

//     const newUser = {
//       first_name: this.state.firstName,
//       last_name: this.state.lastName,
//       email: this.state.email,
//       password: this.state.password,
//     };
//     axios
//       .post(endpoint + "/api/users/signup", newUser)
//       .then((res) => {
//         console.log(res.data);
//         //redirect to login page
//         this.props.history.push("/login");

//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     this.setState({
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//     });

//   };

//   render() {
//     const paperStyle = {
//       padding: 20,
//       height: "70vh",
//       width: 500,
//       margin: "100px  auto",
//       borderRadius: '25px'
//     };
//     const theme = createTheme({
//       palette: {
//         background: {
//           default: "#163766",
//         },
//       },
//     });
//     return (
//       <ThemeProvider theme={theme}>
//         <ParticleBackground/>
//         <CssBaseline />
//         <Grid>
//           <Paper elevation={24} style={paperStyle}>
//             <Grid align="center">
//               <img src={logo} alt="My logo" />
//               <h2>Sign Up</h2>
//             </Grid>
//             <form onSubmit={this.onSubmit}>
//               <Grid container direction={"column"} spacing={2}>
//                 <Grid item>
//                   <TextField
//                     label="Enter First Name"
//                     placeholder="Enter First Name"
//                     fullWidth
//                     required
//                     onChange={(e) => {
//                       this.setState({ firstName: e.target.value });
//                     }}
//                   />
//                 </Grid>
//                 <Grid item>
//                   <TextField
//                     label="Enter Last Name"
//                     placeholder="Enter Last Name"
//                     fullWidth
//                     required
//                     onChange={(e) => {
//                       this.setState({ lastName: e.target.value });
//                     }}
//                   />
//                 </Grid>
//                 <Grid item>
//                   <TextField
//                     label="E-mail Address"
//                     placeholder="Enter E-mail Address"
//                     fullWidth
//                     required
//                     onChange={(e) => {
//                       this.setState({ email: e.target.value });
//                     }}
//                   />
//                 </Grid>
//                 <Grid item>
//                   <TextField
//                     label="Create Password"
//                     placeholder="Enter Password"
//                     type="password"
//                     fullWidth
//                     required
//                     onChange={(e) => {
//                       this.setState({ password: e.target.value });
//                     }}
//                   />
//                 </Grid>
//                 <Grid item>
//                   <TextField
//                     label="Confirm Password"
//                     placeholder="Enter Password"
//                     type="password"
//                     fullWidth
//                     required
//                   />
//                 </Grid>
//                 <Grid item>
//                   <Button
//                     variant="contained"
//                     type="submit"
//                     color="primary"
//                     fullWidth
//                   >
//                     Register
//                   </Button>
//                 </Grid>
//                 <Grid item>
//                   <Typography align="center">
//                     Already have an account?
//                   </Typography>
//                   <a href="/login">
//                     <Typography> Sign in!</Typography>
//                   </a>
//                 </Grid>
//               </Grid>
//             </form>
//           </Paper>
//         </Grid>
//       </ThemeProvider>
//     );
//   }
// }
