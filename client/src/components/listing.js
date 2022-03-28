import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import { Card } from "@mui/material";
import "./listing.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Geocode from "../config/geocoding-config";
let endpoint = "http://localhost:8080";

const Listing = (props) => {
  const { state } = useLocation();
  const sublease = state.sublease;

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  // Geocode.fromAddress("2800 SW 35th Place, Gainesville Place Apartments, 32608").then(
  //   (response) => {
  //     const { lat, lng } = response.results[0].geometry.location;
  //     setAddress(sublease.address); 
  //     setCity(sublease.city);
  //     console.log(process.env.GEO_API);
  //     console.log(lat, lng);
  //   },
  //   (error) => {
  //     console.error(error);
  //   }
  // );

  useEffect(() => {
    console.log(process.env.REACT_APP_GEO_API);
    Geocode.fromAddress("2800 SW 35th Place, Gainesville Place Apartments, 32608").then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setAddress(sublease.address); 
        setCity(sublease.city);
        console.log(process.env.GEO_API);
        setLat(lat);
        setLng(lng);
        console.log("Coord:", lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );

    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        console.log("Address:", address);
      },
      (error) => {
        console.error(error);
      }
    );

  }, []);



  return (
    <div class="container">
      {console.log(state.sublease)}
      <Paper
        elevation={14}
        style={{
          padding: 13,
          backgroundColor: "orange",
          margin: "10px 10px 10px 10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div class="image">
          <img
            src="https://images.unsplash.com/photo-1594484208280-efa00f96fc21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXBhcnRtZW50JTIwYnVpbGRpbmd8ZW58MHx8MHx8&w=1000&q=80"
            style={{ width: 1100, height: 675, margin: 15 }}
          ></img>
        </div>
        <div class="text-col">
          <Card
            style={{
              width: 370,
              height: 850,
              backgroundColor: "blue",
              margin: 10,
            }}
          >
            <h1 wordWrap>
              Title: {sublease?.title}
              <h2>Bedrooms: {sublease?.bedrooms}</h2>
              <h2>Bathrooms: {sublease?.bathrooms}</h2>
              <h2>Location:</h2>
              <h2 color="white">
                {" "}
                2800 SW 35th Place, Gainesville Place Apartments, 32608
              </h2>
              <h2>Description: {sublease?.description}</h2>
              <h2>Price: ${sublease?.price}/month </h2>
            </h1>
          </Card>
        </div>
      </Paper>
    </div>
  );
};

export default Listing;
