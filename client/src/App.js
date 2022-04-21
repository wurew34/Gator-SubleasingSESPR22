import React from "react";
import "./App.css";
import { Layout, Content } from "react-mdl";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Landing from "./components/landing";
import Login from "./components/login";
import Signup from "./components/signup";
import Profile from "./components/profile";
import Listing from "./components/listings";
import CreateLease from "./components/Lease/createLease";
import MyListings from "./components/mylistings";
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
            <Route path="/create-listing" element={<CreateLease />} />
            <Route path="/sublease/:lease_id" element={<Listing />} />
            <Route path="/mylistings" element={<MyListings />} />
          </Routes>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
