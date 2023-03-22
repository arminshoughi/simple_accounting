import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { HiBell } from "react-icons/hi";
import { useNotification } from '../hook/notification'
import { useCurrent } from '../hook/current'

const Navbar = () => {
  const location = useLocation();
  const [filter, setFilter] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const {data:current}= useCurrent()

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

const{data} = useNotification()
  return (
    <nav className="navbar navbar-light" style={{backgroundColor: "#e3f2fd"}}>
        <div className="container-fluid px-md-5">
        <button  className="btn  position-relative" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
          <div className='flex'>

<HiBell className='text-yellow-400 first-letter:h-7 w-8 h-8 z-10'/>
{data.length !== 0?<div class="rounded-full text-white  bg-red-400 w-5 h-5 text-sm mt-2 -ml-4 z-50">{data.length}</div>:""}

          </div>
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
    {data.map(item => <li key={item.id} className="list-group-item d-flex justify-content-between align-items-start">
    <div className="ms-2 me-auto">
      <div className={!item.read && "fw-bold" || "text-muted"}>{item.account_type === "input" ?current.username +`You must receive  ${item.amount} amount under a ${item.title} title on a ${item.reminding_time} date`:current.username +`You must pay  ${item.amount} amount under a ${item.title} title on a ${item.reminding_time} date` }</div>
    </div>
  
  </li>)}
  
  
  </ul>
</div>
          {filter &&
        <div className="input-group mb-3 w-25 ms-auto">
        
        
        </div>}
        </div>
    </nav>
  )
}

export default Navbar