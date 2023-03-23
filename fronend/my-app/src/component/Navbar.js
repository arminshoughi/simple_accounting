import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { HiBell } from "react-icons/hi";
import { useNotification } from "../hook/notification";
import { useCurrent } from "../hook/current";




const Navbar = () => {
  const location = useLocation();
  const [filter, setFilter] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { data: current } = useCurrent();
  const renderNotification = (notification) => {
    const isInput = notification.account_type === 'input';
    const amount = isInput ? `receive ${notification.amount}` : `pay ${notification.amount}`;
    const message = `${current.username} You must ${amount} under a ${notification.title} title on ${notification.reminding_time}`;
    const colorClass = isInput ? 'bg-green-500' : 'bg-gray-400';

    return (
      <li key={notification.id} className="list-group-item flex justify-between items-start">
        <div className="flex items-center">
          <span className={`inline-block h-4 w-4 rounded-full ${colorClass}`}></span>
          <div className="ml-2">
            <div className="text-gray-900">{message}</div>
          </div>
        </div>
      </li>
    );
  };

  useEffect(() => {
    fetch("/api/notifications/get_notifications")
      .then((res) => res.json())
      .then((res) => {
        setNotifications(res);
      });
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      setFilter(true);
    } else {
      setFilter(false);
    }
  }, [location.pathname]);

  const { data } = useNotification();
  console.log(data , "adsdsad")
  return (
    <nav className="navbar navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
      <div className="container-fluid px-md-5">
        <button
          className="btn  position-relative"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          <div className="flex">
            <HiBell className="text-yellow-400 first-letter:h-7 w-8 h-8 z-10" />
            {data.length !== 0 ? (
              <div class="rounded-full text-white  bg-red-400 w-5 h-5 text-sm mt-2 -ml-4 z-50">
                {data.length}
              </div>
            ) : (
              ""
            )}
          </div>
        </button>

        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasExampleLabel">
              Notifications
            </h5>
          </div>
          <ul className="list-group">
      {data.map(renderNotification)}
</ul>





        </div>
       
      </div>
    </nav>
  );
};

export default Navbar;
