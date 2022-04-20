import React from "react";
import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Tooltip,
  Card,
  IconButton,
  Grid,
} from "@mui/material";
import "./listings.css";
import Colors from "./Colors";
import DetailsThumb from "./DetailsThumb";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import logo from "./Images/container logo.PNG";
import Toolbar from "@mui/material/Toolbar";
import ParticleBackground from "../ParticleBackground";
import { useLocation } from "react-router-dom";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import MySubleaseInfo from "./Lease/mySubleaseInfo";

const MyListings = (props) => {
  //list of my listings
  let endpoint = "http://localhost:8080";
  const decoded = jwt_decode(localStorage.getItem("token"));
  const [subleases, setSublease] = React.useState([]);
  let navigate = useNavigate();

  const fetchUserListings = () => {
    const { data } = axios
      .get(endpoint + `/api/user_leases/${decoded.Uid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setSublease(res.data);
        console.log(res.data);
      });
  };

  const displayListings = () => {
    return (
      <div>
        <Grid
          container
          spacing={10}
          direction="row"
          justify="center"
          alignItems="center"
        >
          {subleases?.map((sublease) => (
            <Grid item md={3}>
              <MySubleaseInfo sublease={sublease} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  };

  useEffect(() => {
    fetchUserListings();
  }, []);

  return (
    <div>
      <div className="AppBar">
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
        </Box>
      </div>
      <div>
        <Paper
          sx={{ marginTop: 10, padding: 10, paddingLeft: 4, paddingRight: 4 }}
        >
          <h1>My Listings</h1>
          {displayListings()}
        </Paper>
      </div>
    </div>
  );
};

export default MyListings;
