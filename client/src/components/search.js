import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { Button, TextField, Autocomplete, InputBase } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "absolute",
    backgroundColor: alpha("#FFFFFF", 0.5),
    "&:hover": {
      backgroundColor: alpha("#FFFFFF", 0.25),
    },
    width: 600,
    borderRadius: "5px",
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
  const [suggestions, setSuggestions] = useState([]);

  const loadTitles = async () => {
    const response = await axios.get("http://localhost:8080/api/search_lease");
    console.log(response.data);
    setSuggestions(response.data);
  };

  useEffect(() => {
    loadTitles();
  }, []);

  return (
    <div>
      <div className={classes.search}>
        <Autocomplete
          id="search-suggest"
          options={suggestions}
          freeSolo
          size="small"
          onChange={(e, value) => setLocalSearch(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search for properties..."
              fullWidth
              required
              className={classes.input}
              onChange={(e) => {
                e.preventDefault();
                setLocalSearch(e.target.value);
              }}
            />
          )}
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
