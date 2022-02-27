import React, { useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Paper,
  TextField,
  Button,
  Typography,
  Autocomplete,
  Pagination,
  PaginationItem,
  Avatar,
  CssBaseline,
  IconButton,
  Tooltip,
} from "@mui/material";
import logo from "./Images/container logo.PNG";
import mockImage from "./Images/Initial Logo.PNG";
import "./styles.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowFowardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Search from "./search";
import { makeStyles } from "@mui/styles";
import Image from "./Images/uf.jpg";

// let endpoint = "http://localhost:8080";

// const Dashboard = (props) => {
//   const decoded = jwt_decode(localStorage.getItem("token"));
//   const [firstName, setFirstName] = React.useState(decoded.First_name);
//   const [lastName, setLastName] = React.useState(decoded.Last_name);
//   const [email, setEmail] = React.useState(decoded.Email);
//   console.log(decoded);

//   let navigate = useNavigate();
//   const fetchUser = () => {
//     axios
//       .get(endpoint + "/api/user", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const displayUser = () => {
//     fetchUser();
//     return (
//       <div>
//         <Typography variant="h4">Welcome to Dashboard!</Typography>
//         <Typography variant="h5">
//           {firstName} {lastName}
//         </Typography>
//         <Typography variant="h5">{email}</Typography>
//       </div>
//     );
//   };
//   return (
//     <Grid item xs={12}>
//       <Grid container spacing={10}>
//         <Grid item xs={16}>
//           <Typography variant="h5">Welcome to your dashboard</Typography>
//         </Grid>
//         <Grid item xs={12} style={{textAlign:"center"}}>
//           {displayUser()}
//           <Button
//             onClick={() => {
//               localStorage.removeItem("token");
//               navigate("/login");
//             }}
//           >
//             Logout
//           </Button>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  container: {
    paddingTop: "10px",
    paddingLeft: "300px",
    paddingRight: "600px",
  },
}));

const getSubleaseInfo = () => {
  return (
    <Grid item xs={3.9}>
      <Card>
        <CardContent>
          {" "}
          <img src={mockImage} alt="mock" />{" "}
        </CardContent>
      </Card>
    </Grid>
  );
};

const paperStyle = {
  height: "80vh",
  width: 1600,
  margin: "300px  ",
};

const paginationStyle = {
  padding: 65,
  margin: "100px auto",
};

const theme = createTheme({
  palette: {
    background: {
      default: "#163766",
    },
  },
});

const Dashboard = () => {
  const classes = useStyles();
  let navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar id="app-bar" style={{ background: "#00529B" }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <a href="/">
                <img src={logo} alt="logo" />
              </a>
            </Box>
            <Box sx={{ flexGrow: 4 }}>
              <Search />
            </Box>
            <Tooltip title="Profile">
              <IconButton
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <Avatar>T</Avatar>
              </IconButton>
            </Tooltip>
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
      </Box>
      <Paper
        elevation={5}
        sx={{
          margin: 0,
          marginTop: 20,
          padding: 30,
          paddingLeft: 4,
          paddingRight: 4,
        }}
      >
        <Grid container spacing={10} className={classes.container}>
          {getSubleaseInfo()}
          {getSubleaseInfo()}
          {getSubleaseInfo()}
          {getSubleaseInfo()}
          {getSubleaseInfo()}
          <Pagination
            style={paginationStyle}
            count={5}
            renderItem={(item) => (
              <PaginationItem
                components={{
                  previous: ArrowBackIcon,
                  next: ArrowFowardIcon,
                }}
                {...item}
              />
            )}
          ></Pagination>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
};

export default Dashboard;
