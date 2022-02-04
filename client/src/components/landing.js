import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import imag from './Images/uf.jpg'
import styles from './background.css';
class Landing extends Component {
    render() {
        return(
            <div style={{width: '100%', margin: 'auto'}}>
                <Grid className="landing-grid">
                    <Cell col={12}>
                        
                        

                        <div className='image'>
                            <image>
                                 <img src={imag} alt="UF" style={{width: 1550, height: 600}}/>
                                 

                            </image>
                            
                            <h1 style={{color: "#FFFFFF", fontSize: 59, }}>
                                Welcome to Gator Subleasing!
                            </h1>
                            
                        </div>
                        

                        <div className="banner-text">
                            
                        </div>

                    </Cell>

                </Grid>
                </div>
        )
    }
}

export default Landing;