import { makeStyles } from "@mui/styles";
import SearchIcon from '@mui/icons-material/Search';
import Fade from '@mui/material/Fade';
import { InputBase } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        backgroundColor: Fade(theme.palette)

    }
}));

const Search = (props) => {
    const classes = useStyles();
    return (
        <div>
        <SearchIcon/>
        <InputBase
        placeholder="Search..."
        />
        </div>
    )
}

export default Search;
