import React from "react";
import { Paper, Grid, Button, TextField, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
//modal for the lease edit
const EditLease = ({ sublease }) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState(sublease.address);
  const [title, setTitle] = useState(sublease.title);
  const [description, setDescription] = useState(sublease.description);
  const [price, setPrice] = useState(sublease.price);
  const [bedrooms, setBedrooms] = useState(sublease.bedrooms);
  const [bathrooms, setBathrooms] = useState(sublease.bathrooms);
  const [term, setTerm] = useState(sublease.term);

  const handleSubmit = (e) => {
    e.preventDefault();
    //convert terms to int
    // lease.term = parseInt(lease.term);
    const changeLease = {
      bathrooms: parseInt(bathrooms),
      bedrooms: parseInt(bedrooms),
      price: parseFloat(price),
      term: parseInt(term),
      description: description,
      Address: address,
      title: title,
      user_id: sublease.user_id,
      lease_id: sublease._id,
    };
    console.log(changeLease);
    console.log(sublease._id);
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");

    axios
      .put(`https://sleepy-spire-27532.herokuapp.com/api/lease/${sublease._id}`, changeLease)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Paper
        style={{
          margin: "auto",
          marginTop: "4em",
          padding: "1.2em",
          height: "70vh",
          width: 500,
          borderRadius: "10px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h1>Edit Lease</h1>
              <TextField
                required
                id="title"
                name="title"
                label="Title"
                fullWidth
                autoComplete="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address"
                name="address"
                label="Address"
                fullWidth
                autoComplete="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="description"
                name="description"
                label="Description"
                fullWidth
                autoComplete="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="price"
                name="price"
                label="Price"
                fullWidth
                autoComplete="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="bedrooms"
                name="bedrooms"
                label="Bedrooms"
                fullWidth
                autoComplete="bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="bathrooms"
                name="bathrooms"
                label="Bathrooms"
                fullWidth
                autoComplete="bathrooms"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="term"
                name="term"
                label="Term"
                fullWidth
                autoComplete="term"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: "1em" }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default EditLease;
