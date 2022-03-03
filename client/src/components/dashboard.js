import React, { useEffect, useState } from "react";
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
  CardMedia,
} from "@mui/material";
import logo from "./Images/container logo.PNG";
import mockImage from "./Images/Initial Logo.PNG";
import "./styles.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Search from "./search";
import { makeStyles } from "@mui/styles";
import AppPagination from "./pagination";
import SubleaseInfo from "./Lease/subleaseInfo";

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
  container: {
    paddingLeft: "50px",
    paddingRight: "50px"
  },
}));

// const getSubleaseInfo = () => {
//   return (
//     <Grid item xs={3.2}>
//       <Card>
//         <CardMedia
//           style={{
//             margin: "auto",
//           }}>
//           {" "}
//           <img src={mockImage} alt="mock" />{" "}
//         </CardMedia>
//         <CardContent>
//           <Typography>Location</Typography>
//           <Typography>Price</Typography>
//         </CardContent>
//       </Card>
//     </Grid>
//   );
// };


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
 
  const [subleases, setSublease] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(5);

  const fetchSublease = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/lease?page=${page}`
      );
      setSublease(data?.results);
      setNumberOfPages(data?.total);
      axios.defaults.headers.common["token"] = localStorage.getItem("token");
    } catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSublease();
  },);
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
          marginTop: 20,
          padding: 30,
          paddingLeft: 4,
          paddingRight: 4,
        }}
      >
        <Grid container spacing={10} direction="row" justify="center" alignItems="center" className={classes.container}>
          {subleases?.map(sublease => (
            <Grid item md={5}>
              <SubleaseInfo sublease={sublease} />
              </Grid>
          ))}
        </Grid>
        <AppPagination setPage={setPage} pageNumber={numberOfPages}/>
      </Paper>
    </ThemeProvider>
  );
};

export default Dashboard;
