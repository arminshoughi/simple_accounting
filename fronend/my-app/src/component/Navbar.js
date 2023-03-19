import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { HiBell } from "react-icons/hi";

const Navbar = () => {
  const location = useLocation();
  const [filter, setFilter] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch('/api/notifications/get_notifications').then(res => res.json()).then(res => {
      setNotifications(res);
    }
    );
  }, []);


  useEffect(() => {
    if (location.pathname === '/') {
      setFilter(true);
    }
    else{
      setFilter(false);
    }
  }, [location.pathname]);

  return (
    <nav className="navbar navbar-light" style={{backgroundColor: "#e3f2fd"}}>
        <div className="container-fluid px-md-5">
        <button onClick={(e) => {fetch('/api/notifications/read_notifications')}} className="btn  position-relative" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
<HiBell className='text-yellow-400 w-7 first-letter:h-7'/>
        {notifications.filter(item => item.read === false).length !== 0 && 
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {notifications.filter(item => item.read === false).length}
    
  </span>}
</button>

<div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Notifications</h5>
     
  </div>
  <ul className="list-group">
    {notifications.map(item => <li key={item.id} className="list-group-item d-flex justify-content-between align-items-start">
    <div className="ms-2 me-auto">
      <div className={!item.read && "fw-bold" || "text-muted"}>{item.message}</div>
    </div>
    
  </li>)}
  
  
  </ul>
</div>
          {filter &&
        <div className="input-group mb-3 w-25 ms-auto">
        <span className="input-group-text" id="basic-addon1"><i className="bi bi-filter-square"></i></span>
        
        <select  className="form-select form-select-lg" aria-label=".form-select-lg example">
          <option value="month">Last Month</option>
          <option value="week">Last Week</option>
          <option value="year">Last Year</option>
        </select>
        </div>}
        </div>
    </nav>
  )
}

export default Navbar