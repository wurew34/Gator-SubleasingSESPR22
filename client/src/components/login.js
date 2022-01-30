import React, { Component } from 'react';
import { Grid, Paper, TextField, Button, Typography } from '@mui/material';
import logo from'./Images/container logo.PNG';
import './styles.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from "react-router-dom";

class Login extends Component {
    render() {
      const paperStyle = {padding:20, height:'70vh', width:500, margin:"20px  auto"}
      const theme = createTheme({
        palette: {
          background: {
            default: "#FA8627",
          } 
        },
      });
        return(
          <ThemeProvider theme={theme}>
             <CssBaseline/>
            <Grid>
              <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                  <img src={logo} alt="My logo"/>
                  <h2>Sign in</h2>
                </Grid> 
                <form>
                <Grid container direction={"column"} spacing={5}>
                 <Grid item>
                <TextField label ='E-mail Address' placeholder='Enter E-mail Address' fullWidth required/>
                </Grid>
                <Grid item>
                <TextField label ='Password' placeholder='Enter Password' type='password' fullWidth required/>
                </Grid>
                <Grid item>
                <Button variant="contained" type='submit' color='primary' fullWidth>Sign in</Button>
                </Grid>
                <Grid item>
                <Typography align='center'>Don't have an account?</Typography>
                <a href="/signup"><Typography>Sign up!</Typography></a>
                </Grid> 
                </Grid>
                </form>
              </Paper>
              </Grid>
              </ThemeProvider>
        )
    }
}

export default Login;