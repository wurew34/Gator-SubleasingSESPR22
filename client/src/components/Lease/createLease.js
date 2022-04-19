import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createTheme, ThemeProvider, makeStyles } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import logo from "../Images/container logo.PNG";
import Toolbar from "@mui/material/Toolbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
  price: 0.0,
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
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.0);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [term, setTerm] = useState(1);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   setLease({ ...lease, [e.target.name]: e.target.value });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    //convert terms to int
    // lease.term = parseInt(lease.term);
    const newLease = {
      bathrooms: parseInt(bathrooms),
      bedrooms: parseInt(bedrooms),
      price: parseFloat(price),
      term: parseInt(term),
      description: description,
      Address: address,
      title: title,
    };
    console.log(newLease);
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");

    axios
      .post("http://localhost:8080/api/lease/create", newLease)
      .then((res) => {
        console.log(res.data);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
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
                <AccountCircleIcon fontSize="large" sx={{ color: "white" }}/>
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
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            data-testid="title"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Address"
            name="Address"
            id="address"
            data-testid="address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            id="description"
            data-testid="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Rent"
            name="price"
            id="price"
            data-testid="price"
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Lease Term"
            name="term"
            id="term"
            data-testid="term"
            type="number"
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
            }}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Bedrooms"
            name="bedrooms"
            id="bedrooms"
            data-testid="bedrooms"
            type="number"
            value={bedrooms}
            onChange={(e) => {
              setBedrooms(e.target.value);
            }}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Bathrooms"
            name="bathrooms"
            id="bathrooms"
            data-testid="bathrooms"
            type="number"
            value={bathrooms}
            onChange={(e) => {
              setBathrooms(e.target.value);
            }}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <Button type="submit">Submit</Button>
        </form>
      </Paper>
    </ThemeProvider>
  );
}
