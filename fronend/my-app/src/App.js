import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Draft from "./component/draft";
import Expenses from "./component/Expenses";
import Home from "./component/Home";
import Incomes from "./component/Incomes";
import Login from "./component/Login";
import Navbar from "./component/Navbar";
import Receivablechecks from "./component/receivableCheck";
import Reminder from "./component/reminder";
import Returnablechecks from "./component/returnablechecks";
import Save from "./component/save";

import SideBar from "./component/sidebar";
import Sighnin from "./component/sighnin";

export const App = () => {
  const access = localStorage.getItem("access");
  return (
    <>
      {!!access ? (
        <Router>
          <div className="d-flex flex-row flex-nowrap h-100">
            {window.location.pathname.includes("login") ||
            window.location.pathname.includes("sighnin") ? (
              ""
            ) : (
              <SideBar />
            )}
            <div className="w-75 ms-auto">
              {window.location.pathname.includes("login") ||
              window.location.pathname.includes("sighnin") ? (
                ""
              ) : (
                <Navbar />
              )}

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sighnin" element={<Sighnin />} />
                <Route path="/incomes" element={<Incomes />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route
                  path="/returnablechecks"
                  element={<Returnablechecks />}
                />
                <Route
                  path="/receivablechecks"
                  element={<Receivablechecks />}
                />
                <Route path="/savings" element={<Save />} />
                <Route path="/reminder" element={<Reminder />} />
                <Route path="/draft" element={<Draft />} />
              </Routes>
            </div>
          </div>
        </Router>
      ) : (
        <Router>
          <div className="d-flex flex-row flex-nowrap h-100">
            {window.location.pathname.includes("login") ||
            window.location.pathname.includes("sighnin") ? (
              ""
            ) : (
              <SideBar />
            )}
            <div className="w-75 ms-auto">
              {window.location.pathname.includes("login") ||
              window.location.pathname.includes("sighnin") ? (
                ""
              ) : (
                <Navbar />
              )}

              <Routes>
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          </div>
        </Router>
      )}
    </>
  );

};