import React from "react";
import { useState, useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import { Card } from "@mui/material";
import "./listings.css";
import Colors from "./Colors";
import DetailsThumb from "./DetailsThumb";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import logo from "./Images/container logo.PNG";
import Toolbar from "@mui/material/Toolbar";
import ParticleBackground from "../ParticleBackground";
import { useLocation } from "react-router-dom";
const Listings = (props) => {
  const imgsrc = [
    "https://images.unsplash.com/photo-1594484208280-efa00f96fc21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXBhcnRtZW50JTIwYnVpbGRpbmd8ZW58MHx8MHx8&w=1000&q=80",
    "https://leasingkc.com/wp-content/uploads/2018/12/IMG_0873.jpg",
    "https://i.ytimg.com/vi/RfYc0BUqkMs/maxresdefault.jpg",
    "https://www.irvinecompanyapartments.com/rental-living/wp-content/uploads/2020/04/apartment-kitchen-decorating.jpg",
  ];

  const [imageInd, setImageInd] = useState(0);
  const { state } = useLocation();
  const sublease = state.sublease;
  const [search, setSearch] = useState("");

  const ViewImage = ({images}) => {
    return (
      <div className="thumb">
        {images.map((img, index) => (
          // highlight the current image
          <img
            key={index}
            src={img}
            alt=""
            className={imageInd === index ? "active" : ""}
            onClick={() => setImageInd(index)}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar id="app-bar" style={{ background: "#00529B" }}>
          {console.log(sublease)}
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <a href="/dashboard">
                <img src={logo} alt="logo" />
              </a>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <ParticleBackground />
      <div className="app" style={{ backgroundColor: "white" }}>
        <div className="details" key={sublease._id}>
          <div className="big-img">
            <img src={imgsrc[imageInd]} alt="" />
          </div>
          <div className="box">
            <div className="row">
              <h2>{sublease.title}</h2>
              <span>Rent: ${sublease.price}</span>
            </div>
            <p>Location: {sublease.address}</p>
            <p>Description: {sublease.description}</p>
            <p>Bathrooms: {sublease.bathrooms}</p>
            <p>Bedrooms: {sublease.bedrooms}</p>
            <ViewImage images={imgsrc} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Listings;