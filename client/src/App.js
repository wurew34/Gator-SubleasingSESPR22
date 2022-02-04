import React from "react";
import "./App.css";
import { Layout, Content } from "react-mdl";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "./components/Images/container logo.PNG";
import Main from "./main";
import { createTheme } from "@mui/system";

function App() {
  return (
    <div className="heading">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar id="app-bar" style={{ background: "#00529B" }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <a href="/">
                <img src={logo} alt="logo" />
              </a>
            </Box>
            <Link to="/login">
              <Button color="primary" variant="raised">
                Log-in
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>

      <Layout>
        <Content>
          <div className="page-content" />
          <Main />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
