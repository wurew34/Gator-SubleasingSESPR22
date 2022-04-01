import React from "react";
import mockImage from "../Images/apartment photo.jpg";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SubleaseInfo = ({ sublease }) => {
  let navigate = useNavigate();
  return (
    <div>
      <Card
        onClick={() => {
          console.log(sublease);
          navigate(`/sublease/${sublease._id}`, {
            state: {
              sublease: sublease,
            },
          });
        }}
      >
        <CardMedia
          style={{
            margin: "auto",
          }}
        >
          {" "}
          <img src={mockImage} alt="mock" />{" "}
        </CardMedia>
        <CardContent>
          <Typography>{sublease?.description}</Typography>
          <Typography>{sublease?.price}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubleaseInfo;
