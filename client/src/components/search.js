import React from "react";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { Button, InputBase } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "absolute",
    backgroundColor: alpha("#FFFFFF", 0.5),
    "&:hover": {
      backgroundColor: alpha("#FFFFFF", 0.25),
    },
    width: 600,
    borderRadius: "10px",
    marginLeft: 350,
    height: "4%",
  },
  searchIcon: {
    height: "85%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    paddingLeft: 30,
  },
  searchButton: {
    display: "flex",
    paddingLeft: 880,
  },
}));

const Search = (props) => {
  const classes = useStyles();
  const [localSearch, setLocalSearch] = useState("");
  return (
    <div>
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
      </div>
      <div className={classes.searchButton}>
        <Button
          variant="contained"
          onClick={() => {
            props.setQuery(localSearch);
          }}
        >
          SEARCH
        </Button>
      </div>
    </div>
  );
};

export default Search;
