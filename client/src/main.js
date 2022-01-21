import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from './components/landing';
import Login from "./components/login";
import AboutUs from "./components/aboutus";

function Main() {
    return(
<div>
    <Routes>
    <Route path="/" element={<Landing/>} />
    <Route path="/login" element={<Login/>}/>
    <Route path="/aboutus" element={<AboutUs/>} />
    </Routes>
</div>
);

}

export default Main;