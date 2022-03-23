import React from "react";
import "./App.css";
import { Layout, Content } from "react-mdl";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/pages/dashboard";
import Landing from "./components/pages/landing";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
import Profile from "./components/pages/profile";
import Listing from "./components/pages/Lease/listing";
import CreateLease from "./components/pages/Lease/createLease";
// import Listings from "./components/pages/Lease/Listings";
function App() {
  return (
    <div data-test-id="app-1" className="heading">
      <Layout>
        <Content>
          <div className="page-content" />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/listing" element={<Listing />} />
            <Route path="/createLease" element={<CreateLease />} />
            <Route path="/sublease/:lease_id" element={<Listing />} />
          </Routes>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
