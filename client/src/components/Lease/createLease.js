import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createTheme, ThemeProvider, makeStyles } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import logo from "../Images/container logo.PNG";
import Toolbar from "@mui/material/Toolbar";
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

const InitalLeaseValues = {
  bathrooms: 1,
  bedrooms: 1,
  price: 0,
  term: 1,
  description: "",
  address: "",
};

const paperStyle = {
  padding: 40,
  height: "80vh",
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

export default function CreateLease(props) {
  const [lease, setLease] = useState(InitalLeaseValues);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLease({ ...lease, [e.target.name]: e.target.value });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar id="app-bar" style={{ background: "#00529B" }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <a href="/dashboard">
                <img src={logo} alt="logo" />
              </a>
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
      <Paper elevation={24} style={paperStyle}>
        <h2>Create Listing</h2>
        <form>
          <TextField
            label="Title"
            name="title"
            value={lease.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Address"
            name="address"
            value={lease.address}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={lease.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Rent"
            name="price"
            type="number"
            value={lease.price}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Lease Term"
            name="term"
            type="number"
            value={lease.term}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Bedrooms"
            name="bedrooms"
            type="number"
            value={lease.bedrooms}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Bathrooms"
            name="bathrooms"
            type="number"
            value={lease.bathrooms}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log(lease);
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + localStorage.getItem("token");
              axios
                .post("http://localhost:8080/api/lease/create", lease)
                .then((res) => {
                  console.log(res);
                  navigate("/dashboard");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Submit
          </button>
        </form>
      </Paper>
    </ThemeProvider>
  );
}
