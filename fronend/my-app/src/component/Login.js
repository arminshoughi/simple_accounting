import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';


const Login = () => {
    const [status, setStatus] = useState();
    const [a, setA] = useState();
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
console.log(a , "asdasdasd")
localStorage.setItem('access', a)
    const handleSubmit = (e) => {
      e.preventDefault();
      axios
        .post(
           "http://127.0.0.1:8000/api/share/auth/token/",
          {
            password: password,
            username: userName,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "accept": "application/json",
            },
          }
        )
        .then((result) => {
          setStatus(result.status.toString());
          setA(result.data.access.toString());
          window.location.href = "/"
        })
        .catch((error) => {
          alert("نام کاربری و یا رمز عبور اشتباه است لطفا مجدد تلاش کنید.");
        });
      localStorage.setItem("flag", "true");
    };
    const location = useLocation();
    useEffect(() => {
      
    
    
    }, [status]);
    useEffect(() => {
      if (location.pathname === "/login") {
        localStorage.setItem("flag", "false");
      }
    }, [location.pathname]);
  return (
    <div className='row  !mt-20 !ml-28'>
        <div className='col-6'>
            <div className='card'>
                <div className='card-body  bg-light'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='username'>Username</label>
                        <input 
                         onChange={(e) => setUserName(e.target.value)}
                        type='text' name="username" className='form-control' id='username' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                         onChange={(e) => setPassword(e.target.value)}
                        type='password' name="password" className='form-control' id='password' />
                    </div>
                    <button type="submit" className='btn mt-2 btn-primary'>Login</button>
                </form>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Login