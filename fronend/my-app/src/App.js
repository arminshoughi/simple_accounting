import React from 'react'
import { createRoot } from 'react-dom/client';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Home from './component/Home';
import Login from './component/Login';
import Navbar from './component/Navbar';


import SideBar from './component/sidebar';
import Sighnin from './component/sighnin';

export const App = () => {
  return (
    <>
    
    <Router>
        
        <div className="d-flex flex-row flex-nowrap h-100">
          {window.location.pathname.includes("login") ||window.location.pathname.includes("sighnin")?"":
          <SideBar   />
          
          }
          <div className="w-75 ms-auto">
          {window.location.pathname.includes("login" ) ||window.location.pathname.includes("sighnin")?"":
          <Navbar />}
          
         
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sighnin" element={<Sighnin />} />


            
          </Routes>
          </div>
          
        </div>
    </Router>
    </>
  )
}
