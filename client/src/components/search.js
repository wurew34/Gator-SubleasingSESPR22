import React from "react";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { Button, InputBase } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    backgroundColor: alpha("#FFFFFF", 0.5),
    "&:hover": {
      backgroundColor: alpha("#FFFFFF", 0.25),
    },
    width: 800,
    borderRadius: "10px",
  },
  searchIcon: {
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    paddingLeft: 30,
  },
}));

const Search = (props) => {
  const classes = useStyles();
  const [localSearch, setLocalSearch] = useState("");
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search for properties..."
        fullWidth
        required
        className={classes.input}
        onChange={(e) => {
          e.preventDefault();
          setLocalSearch(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          props.setQuery(localSearch);
        }}
      >
        SEARCH
      </Button>
    </div>
  );
};

export default Search;
