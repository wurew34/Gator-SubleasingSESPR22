import { makeStyles } from "@mui/styles";
import { alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { collapseClasses, InputBase } from "@mui/material";

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

const Search = ({setSearchQuery}) => {
  const classes = useStyles();
  const [search, setSearch] = React.useState("");
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <form onSubmit={(e) => {setSearchQuery(search)}}>


      <InputBase
        placeholder="Search for properties..."
        fullWidth
        required
        className={classes.input}
        onChange={(e) => setSearch(e.target.value)}
      />
      </form >
    </div>
  );
};

export default Search;
