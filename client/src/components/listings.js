import React from 'react'
import { Paper } from '@mui/material';
function Listings(){
    return(
    <div>
        <Paper elevation={14}
        style={{
            padding:13,
            backgroundColor:"orange",
            margin: "10px 10px 10px 10px"
        }}>
            <img src="https://media.istockphoto.com/photos/large-house-with-steep-roof-and-side-entry-three-car-garage-picture-id1272163106?s=612x612" style={{width: 1200, height: 675,}}></img>
            
        </Paper>
    </div>
    )
}

export default Listings;