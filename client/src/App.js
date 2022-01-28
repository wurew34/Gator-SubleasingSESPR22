import React from "react";
import './App.css';
import { Layout, Header, Drawer, Content, Navigation} from "react-mdl";
import { Link } from "react-router-dom";
import Main from "./main";

function App() {
  return (
    <div className = "heading">
      <Layout>
        <Header title="Gator Subleasing" scroll>
          <Navigation>
            <Link to="/login">Log-In</Link>
            <Link to="/aboutus">About Us</Link>
          </Navigation>
        </Header>
        <Content>
          <div className='page-content' />
          <Main/>
        </Content>
      </Layout>
    </div>
  );
}

export default App;