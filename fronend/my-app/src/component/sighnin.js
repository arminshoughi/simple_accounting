import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';


const Sighnin = () => {
  

    const [status, setStatus] = useState();
    const [a, setA] = useState();
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [first_name, setFirst_name] = useState();

    const [last_name, setLast_name] = useState();
    const [birthday, setBirthday] = useState();
    const [national_code, setNational_code] = useState();
    const [sex, setSex] = useState();
localStorage.setItem('access', a)
    const handleSubmit = (e) => {
      e.preventDefault();
      axios
        .post(
           "http://127.0.0.1:8000/api/share/auth/register/",
          {
            password: password,
            username: userName,
            first_name: first_name,
            last_name:last_name,
            national_code: national_code,
            birthday: birthday,
            sex: sex
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
    useEffect   (() => {
      
    
    
    }, [status]);
    useEffect(() => {
      if (location.pathname === "/login") {
        localStorage.setItem("flag", "false");
      }
    }, [location.pathname]);


  return (
    <div className='row  '>
        <div className='col-6 !mt-20 !ml-24'>
            <div className='card'>
                <div className='card-body bg-light '>
                <h1>Sign in</h1>
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
                        type='text' name="password" className='form-control' id='password' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>firstname</label>
                        <input 
                        onChange={(e) => setFirst_name(e.target.value)}
                        type='text' name="firstname" className='form-control' id='password' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>lastname</label>
                        <input
                        onChange={(e) => setLast_name(e.target.value)}
                        type='text' name="lastname" className='form-control' id='password' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>national_code</label>
                        <input
                        onChange={(e) => setNational_code(e.target.value)}
                        type='text' name="national_code" className='form-control' id='password' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>birthday</label>
                        <input 
                        onChange={(e) => setBirthday(e.target.value)}
                        type='text' name="birthday" className='form-control' id='password' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>sex</label>
                        <input
                        onChange={(e) => setSex(e.target.value)}
                        type='text' name="sex" className='form-control' id='password' />
                    </div>  
                    <button type="submit" className='btn mt-2 btn-primary'>Sign in</button>
                </form>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Sighnin