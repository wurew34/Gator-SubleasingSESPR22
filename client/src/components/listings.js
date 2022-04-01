import React from 'react'
import { Paper, Typography  } from '@mui/material';
import {Card} from "@mui/material";
import './listings.css';
import Colors from './Colors'
import DetailsThumb from './DetailsThumb'
class Listings extends React.Component{

    state = {
      products: [
        {
          "_id": "1",
          "title": "Aero on 24th",
          "src": [
              "https://images.unsplash.com/photo-1594484208280-efa00f96fc21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXBhcnRtZW50JTIwYnVpbGRpbmd8ZW58MHx8MHx8&w=1000&q=80",
              "https://images.unsplash.com/photo-1594484208280-efa00f96fc21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXBhcnRtZW50JTIwYnVpbGRpbmd8ZW58MHx8MHx8&w=1000&q=80",
              "https://images.unsplash.com/photo-1594484208280-efa00f96fc21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXBhcnRtZW50JTIwYnVpbGRpbmd8ZW58MHx8MHx8&w=1000&q=80",
              "https://images.unsplash.com/photo-1594484208280-efa00f96fc21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXBhcnRtZW50JTIwYnVpbGRpbmd8ZW58MHx8MHx8&w=1000&q=80"
            ],
            
          
          "bedrooms": 2,
          "bathrooms": 2,
          "location": "3658 SW 24th Ave, Gainesville, FL 32607",
          "description": "Near CVS",
          
          "price": 800,
          
          "count": 1
        }
      ],
      index: 0
    };
  
    myRef = React.createRef();
  
    handleTab = index =>{
      this.setState({index: index})
      const images = this.myRef.current.children;
      for(let i=0; i<images.length; i++){
        images[i].className = images[i].className.replace("active", "");
      }
      images[index].className = "active";
    };
  
    componentDidMount(){
      const {index} = this.state;
      this.myRef.current.children[index].className = "active";
    }
  
  
    render(){
      const {products, index} = this.state;
      return(
          
            
        <div className="app" style={{backgroundColor: 'white'}}>
          {
            products.map(sublease =>(
              <div className="details" key={sublease._id}  >
                <div className="big-img" >
                  <img src={sublease.src[index]} alt=""/>
                </div>
  
                <div className="box" >
                  <div className="row" >
                    <h2>{sublease.title}</h2>
                    <span>Rent: ${sublease.price}</span>
                  </div>
                  <p>Bathrooms: {sublease.bathrooms}</p>
                  <p>Bedrooms: {sublease.bedrooms}</p>
                  <p>Location: {sublease.location}</p>
  
                  <p>{sublease.description}</p>
                  
  
                  <DetailsThumb images={sublease.src} tab={this.handleTab} myRef={this.myRef} />
                  
  
                </div>
              </div>
            ))
          }
        </div>
        
      );
    };
  }
  
  export default Listings;