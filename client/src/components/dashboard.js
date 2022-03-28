import React, { useEffect, useState } from "react";
import {
  Grid,
  FormControl,
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
  AppBar,
  IconButton,
  Toolbar,
  Box,
  Tooltip,
  CardMedia,
  InputLabel,
} from "@mui/material";
import Select from "react-select";
import logo from "./Images/container logo.PNG";
import mockImage from "./Images/Initial Logo.PNG";
import "./styles.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import Search from "./Lease/search";
import { makeStyles } from "@mui/styles";
import AppPagination from "./pagination";
import SubleaseInfo from "./Lease/subleaseInfo";
import { borderRadius } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    display: "flex",
    borderRadius: 4,
  },
  container: {
    paddingLeft: "50px",
    paddingRight: "50px",
  },
}));

const theme = createTheme({
  palette: {
    background: {
      default: "#163766",
    },
  },
});

const Dashboard = () => {
  const data = [
    {
      value: 1,
      label: "Price: Low to High",
      queryRequest: "price_asc",
    },
    {
      value: 2,
      label: "Price: High to Low",
      queryRequest: "price_desc",
    },
    {
      value: 3,
      label: "Alphabetical: A-Z",
      queryRequest: "title",
    },
    {
      value: 4,
      label: "Latest",
      queryRequest: "created_at",
    },
    {
      value: 5,
      label: "Term Length: Low to High",
      queryRequest: "term_asc",
    },
    {
      value: 6,
      label: "Term Length: High to Low",
      queryRequest: "term_desc",
    },
  ];

  const classes = useStyles();
  let navigate = useNavigate();

  const [subleases, setSublease] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(5);
  const [search, setSearchQuery] = useState("");

  const [sort, setSort] = useState("");
  const handleChange = (obj) => {
    setSort(obj.queryRequest);
    console.log(sort);
  };

  const fetchSublease = async () => {
    try {
      console.log(search);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:8080/api/lease?page=${page}&s=${search}&sort=${sort}`
      );
      setSublease(data?.leases);
      setNumberOfPages(data?.last_page);
      console.log(data);
      console.log(data.last_page);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSublease();
  }, [page, search, sort]);

  //create a button to navigate to create page using add icon
  const CreateButton = () => {
    return (
      <Tooltip title="Create a new lease">
        <IconButton
          aria-label="create"
          onClick={() => {
            navigate("/CreateLease");
          }}
        >
          <AddCircleRoundedIcon
            fontSize="large"
            style={{
              color: "orange",
            }}
          />
        </IconButton>
      </Tooltip>
    );
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
            <CreateButton />
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
      <Grid sx={{ marginTop: 12, marginLeft: 10 }} container>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            navigate("/create-listing");
          }}
        >
          Create Listing
        </Button>
        <Search setQuery={(search) => setSearchQuery(search)} />
        <FormControl sx={{ marginLeft: 50 }} className={classes.root}>
          <Select
            placeholder="Sort by..."
            value={sort}
            onChange={handleChange}
            options={data}
          />
        </FormControl>
      </Grid>
      <Paper
        elevation={5}
        sx={{
          marginTop: 3,
          padding: 10,
          paddingLeft: 4,
          paddingRight: 4,
        }}
      >
        <Grid
          container
          spacing={10}
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.container}
        >
          {subleases?.map((sublease) => (
            <Grid item md={5}>
              <SubleaseInfo sublease={sublease} />
            </Grid>
          ))}
        </Grid>
        <AppPagination setPage={setPage} pageNumber={numberOfPages} />
      </Paper>
    </ThemeProvider>
  );
};

export default Dashboard;
