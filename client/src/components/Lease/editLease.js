import { Paper, Grid, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

//modal for the lease edit
const EditLease = ({ sublease }) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [bedrooms, setBedrooms] = useState();
  const [bathrooms, setBathrooms] = useState();
  const [term, setTerm] = useState();

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
    };
    console.log(changeLease);
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");

    axios
      .put(`http://localhost:8080/api/lease/${sublease._id}`, changeLease)
      .then((res) => {
        console.log(res.data);
        navigate("/mylistings");
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
