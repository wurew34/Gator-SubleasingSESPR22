import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';


class Landing extends Component {
    render() {
        return(
            <div style={{width: '100%', margin: 'auto'}}>
                <Grid className="landing-grid">
                    <Cell col={12}>
                        <img
                        src="https://static.techspot.com/images2/downloads/topdownload/2016/11/7dda385ed3724fea700d45a0349d9e77.png"
                        alt="logo"
                        className="logo-img"
                        />

                        <div className="banner-text">
                            <h1>Welcome to Gator Subleasing!</h1>
                        </div>

                    </Cell>

                </Grid>
                </div>
        )
    }
}

export default Landing;