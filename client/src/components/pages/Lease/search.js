import React from "react";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { Button, InputBase, IconButton, TextField,InputAdornment } from "@mui/material";


const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    backgroundColor: alpha("#FFFFFF", 0.5),
    "&:hover": {
      backgroundColor: alpha("#FFFFFF", 0.25),
    },
    // width: 800,
    borderRadius: "10px",
  },
  searchIcon: {
    height: "85%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    paddingLeft: 30,
  },
  searchButton: {
    display: "flex",
  },
}));

const Search = (props) => {
  const classes = useStyles();
  const [localSearch, setLocalSearch] = useState("");

  //create a search button with a search icon
  const SearchButton = () => {
    return (
      // <Button
      //   className={classes.searchButton}
      //   onClick={() => {
      //     props.search(localSearch);
      //   }}
      // >
      //create a outline button with a search icon
      <Button
        className={classes.searchButton}
        onClick={() => {
          props.search(localSearch);
        }}
      >
        <SearchIcon color="orange" />
      </Button>
    );
  };

  //craete a search input
  const SearchInput = () => {
    return (
      <TextField
        onChange={(e) => {
          setLocalSearch(e.target.value);
        }}
        label="Search"
        floatingLabel
        style={{ width: "100%" }}
      />
    );
  };

  return (
    <div className={classes.searchButton}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          {/* <SearchIcon /> */}
        </div>
        <TextField
          label="Search for a lease"
          //dont move label to the right
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="orange" />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            setLocalSearch(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon 
                  color="orange"
                  onClick={() => {
                    props.setQuery(localSearch);
                  }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      {/* <SearchButton /> */}

      {/* <Button
      variant="contained"
      className={classes.searchStyle}
      onClick={() => {
        props.setQuery(localSearch);
      }}
    >
    </Button> */}
    </div>
  );
};

export default Search;
