import Image from "./Images/Oak-Park-City-Apartments-0004.jpg";
import { makeStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${Image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    title: {
        textAlign: "center",
        padding: 350,
        fontFamily: 'Nunito',
        color: '#FFF',
        fontSize: '4.5rem',
    }
}));

const Landing = () => {
        const classes = useStyles();
        return(
                <div className={classes.root}>
                    <CssBaseline/>
                    <h1 className={classes.title}>Welcome to Gator Subleasing!</h1>
                </div>
                
        )
    
};

export default Landing;