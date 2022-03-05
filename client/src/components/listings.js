import React from 'react'
import { Paper, Typography  } from '@mui/material';
import './listings.css';
function Listings(){
    return(
        
        
    <div class='container'>
        <Paper elevation={14}
        style={{
            padding:13,
            backgroundColor:"orange",
            margin: "10px 10px 10px 10px",
            display:"flex",
            alignItems: 'center',
        }}>
            <div class='image'>
                <img src="https://media.istockphoto.com/photos/large-house-with-steep-roof-and-side-entry-three-car-garage-picture-id1272163106?s=612x612" style={{width: 1200, height: 675,}}></img>
            </div>
            <div class='text-col'>
                
                <h1>Sample text</h1>
            </div>
        </Paper>
    </div>
    )
}

export default Listings;