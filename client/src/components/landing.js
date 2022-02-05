import Image from "./Images/uf.jpg";
import { makeStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { fontFamily, margin } from "@mui/system";

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
        textShadow: '3px 3px #FA8627'
    }
}));

const Landing = () => {
        const classes = useStyles();
        return(<div>
        <div className={classes.root}>
            <CssBaseline/>
            <h1 className={classes.title}>Welcome to Gator Subleasing!</h1>
        </div>
        <div className="about-text">
            <h2 style={{fontFamily: 'Nunito', margin: 70}}>
            The web application we wish to move forward with will be an 
            augmented subleasing platform for UF Students. The features 
            we wish to implement include viewing, posting, chat messaging, 
            and possibly web scraping the data off of facebook marketplace.
            <br></br>
            <br></br>
            Description of features:
            <br></br>
            - Implement location-based API for auto-complete search function to find housing to sublease (Can use MapBox or Google Maps API)
            <br></br>
            - Create Dashboard/Log-In for Users (Can use JWT)
            <br></br>
            - Implement viewing/posting listings
            <br></br>
            - Create Interactive Chat Function to message between users
            <br></br>
            - Create additional filters for users to search by price, location, term of sublease
            <br></br>
            - (Undecided): Implement additional filter for external platforms (webscraping ex. facebook marketplace)
            </h2>
        </div>
        </div>
        )
        
                
                

        

};

export default Landing;