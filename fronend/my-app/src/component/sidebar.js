import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'




const SideBar = () => { 

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch('/api/users/login/').then(res => res.json()).then(res => {
      setCurrentUser(res)
    });
  }, []);


  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark w-25 position-fixed bottom-0 top-0">
    <div className="pb-3">
        <div className="navbar-brand text-light">Finance</div>
        <hr />
    </div>
    
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
        <NavLink to="/" className={({isActive}) => (isActive ? "active nav-link text-light" : 'nav-link text-light')}>Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/incomes" className={({isActive}) => (isActive ? "active nav-link text-light" : 'nav-link text-light')}>Incomes</NavLink>
      </li>
      <li>
        <NavLink to="/expenses" className={({isActive}) => (isActive ? "active nav-link text-light" : 'nav-link text-light')}>Expenses</NavLink>
      </li>
      <li>
        <NavLink to="/checks" className={({isActive}) => (isActive ? "active nav-link text-light" : 'nav-link text-light')}>Checks</NavLink>
      </li>
      <li>
        <NavLink to="/savings" className={({isActive}) => (isActive ? "active nav-link text-light" : 'nav-link text-light')}>Savings</NavLink>
      </li>
    </ul>
    <hr />
    <div className="text-light">
    <i className="bi bi-person-fill me-2"></i>
        
        Logged in as: 
        <div className='text-center'>

        <div className="btn-group btn-group-sm" role="group">
            <button type="button" className="btn btn-secondary" disabled>{currentUser && currentUser.username || 'not logged in'}</button>
            <button onClick={() => {fetch('/api/users/logout/').then(() => setCurrentUser(null))}} type="button" className="btn btn-outline-secondary">log out</button>
        </div>
        </div>
    </div>
  </div>
  )
}

export default SideBar