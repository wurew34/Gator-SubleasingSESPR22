import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { makeStyles, ThemeProvider } from "@mui/styles";
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
  rent: 0.0,
  lease_term: 1,
  description: "",
  address: "",
};

export default function CreateLease(props) {
  const [lease, setLease] = useState(InitalLeaseValues);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLease({ ...lease, [e.target.name]: e.target.value });
  };

  return (
    <ThemeProvider>
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
      <form>
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
          name="rent"
          value={lease.rent}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Lease Term"
          name="lease_term"
          value={lease.lease_term}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Bedrooms"
          name="bedrooms"
          value={lease.bedrooms}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Bathrooms"
          name="bathrooms"
          value={lease.bathrooms}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <button
          onClick={() => {
            axios
              .post("http://localhost:8080/api/lease", lease)
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
    </ThemeProvider>
  );
}
