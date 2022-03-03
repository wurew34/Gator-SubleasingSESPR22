import React from "react";
import mockImage from '../Images/Initial Logo.PNG';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const SubleaseInfo = ({ sublease }) => {
    return(
        <div>
         <Card>
        <CardMedia
          style={{
            margin: "auto",
          }}>
          {" "}
          <img src={mockImage} alt="mock" />{" "}
        </CardMedia>
        <CardContent>
          <Typography>{sublease?.description}</Typography>
          <Typography>{sublease?.price}</Typography>
        </CardContent>
      </Card>
        </div>
    )
}

export default SubleaseInfo;