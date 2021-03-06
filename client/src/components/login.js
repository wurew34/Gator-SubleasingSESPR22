import React from "react";
import { Grid, Paper, TextField, Button, Typography } from "@mui/material";
import logo from "./Images/container logo.PNG";
import "./styles.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ParticleBackground from "../ParticleBackground";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let endpoint = "http://localhost:8080";

const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    axios
      .post(endpoint + "/api/users/login", newUser)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        console.log(localStorage.getItem("token"));
        // axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
        // axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
        // axios.defaults.headers.common["token"] = localStorage.getItem("token");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const paperStyle = {
    padding: 60,
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
            <h2>Sign in</h2>
          </Grid>
          <form onSubmit={handleSubmit}>
            <Grid container direction={"column"} spacing={5}>
              <Grid item>
                <TextField
                  label="E-mail Address"
                  placeholder="Enter E-mail Address"
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
                  label="Password"
                  placeholder="Enter Password"
                  type="password"
                  data-testid="password"
                  fullWidth
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
                >
                  Sign in
                </Button>
              </Grid>
              <Grid item>
                <Typography align="center">Don't have an account?</Typography>
                <a href="/signup">
                  <Typography>Sign up!</Typography>
                </a>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </ThemeProvider>
  );
};
export default Login;

// class Login extends Component {
//   //create state for login form
//   constructor() {
//     super();
//     this.state = {
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
//       email: this.state.email,
//       password: this.state.password,
//     };

//     axios
//       .post(endpoint + "/api/users/login", newUser)
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     this.setState({
//       email: "",
//       password: "",
//     });

//   };

//   render() {
//     const paperStyle = {
//       padding: 60,
//       height: "70vh",
//       width: 500,
//       margin: "100px  auto",
//       borderRadius: "25px",
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
//         <ParticleBackground />
//         <CssBaseline />
//         <Grid>
//           <Paper elevation={24} style={paperStyle}>
//             <Grid align="center">
//               <img src={logo} alt="My logo" />
//               <h2>Sign in</h2>
//             </Grid>
//             <form onSubmit={this.onSubmit}>
//               <Grid container direction={"column"} spacing={5}>
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
//                     label="Password"
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
//                   <Button
//                     variant="contained"
//                     type="submit"
//                     color="primary"
//                     fullWidth
//                   >
//                     Sign in
//                   </Button>
//                 </Grid>
//                 <Grid item>
//                   <Typography align="center">Don't have an account?</Typography>
//                   <a href="/signup">
//                     <Typography>Sign up!</Typography>
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
