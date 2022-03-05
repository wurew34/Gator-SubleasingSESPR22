import React from 'react'
import { Paper, Typography  } from '@mui/material';
import {Card} from "@mui/material";
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
                <img src="https://images.unsplash.com/photo-1594484208280-efa00f96fc21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXBhcnRtZW50JTIwYnVpbGRpbmd8ZW58MHx8MHx8&w=1000&q=80" style={{width: 1100, height: 675, margin: 15}}></img>
            </div>
            <div class='text-col'>
            <Card style={{width:370, height: 850, backgroundColor:"blue", margin: 10}}>
                <h1 wordWrap>
                    Title: Apartment at Gainesville Place for lease!
                    
                    <h2>Bedrooms: 2 fully furnished bedrooms with mattress included</h2>
                    
                    <h2>Bathrooms: One attached bathroom per bedroom, with shower and bathtub</h2>
                    
                    <h2>Location:</h2><h2 color="white"> 2800 SW 35th Place, Gainesville Place Apartments, 32608</h2>
                    
                    <h2>Description: Fully furnished house with common living space, TV, balcony, dining table and kitchen.</h2>
                    
                    <h2>Price: $549/month </h2>
                </h1>
            </Card>
                    
                    
            </div>
        </Paper>
    </div>
    )
}

export default Listings;