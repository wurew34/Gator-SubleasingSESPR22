import React from "react";
import mockImage from "../Images/apartment photo.jpg";
import EditLease from "./editLease";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Tooltip,
  IconButton,
  Modal,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

const MySubleaseInfo = ({ sublease }) => {
  const handleEditLeaseOpen = () => setEditLease(true);
  const handleEditLeaseClose = () => setEditLease(false);
  const [editLease, setEditLease] = React.useState(false);

  const handleClick = () => {
    //delete sublease
    axios
      .delete(`https://sleepy-spire-27532.herokuapp.com/api/lease/${sublease._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
      });

    window.location.reload();
  };

  let navigate = useNavigate();
  return (
    <div>
      <Card
      // onClick={() => {
      //   console.log(sublease);
      //   navigate(`/sublease/${sublease._id}`, {
      //     state: {
      //       sublease: sublease,
      //     },
      //   });
      // }}
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
          <Typography>{sublease?.title}</Typography>
          <Typography>$ {sublease?.price}.00</Typography>
          <Tooltip title="Edit Listing">
            <IconButton onClick={handleEditLeaseOpen}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Modal open={editLease} onClose={handleEditLeaseClose}>
            <EditLease sublease={sublease} />
          </Modal>
          <Button
            sx={{ marginLeft: 28 }}
            color="error"
            variant="contained"
            onClick={handleClick}
          >
            Delete
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MySubleaseInfo;
