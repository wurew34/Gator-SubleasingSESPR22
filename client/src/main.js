import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Landing from "./components/landing";
import Login from "./components/login";
import Signup from "./components/signup";

function Main() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default Main;
