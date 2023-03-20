import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { useCurrent } from '../hook/current';
import { useMaster } from '../hook/incomes';

 


const Save = () => {
  const [ordering, setOrdering] = useState('-date');
  const access = localStorage.getItem('access')
  const [year, setTYear] = useState();
  const [mounth, setMounth] = useState();
  const [save, setSave] = useState();

  const [tag, setTag] = useState();

  const {data}= useMaster()
  const {data:current}= useCurrent()

    


    const handleSubmit = (e) => {
      e.preventDefault();
      axios 
        .get(
           `http://127.0.0.1:8000/api/dashboard/account/saving_amount/${year}/${mounth}/`,
         
          {

            headers: {
              "Content-Type": "application/json",
              "accept": "application/json",
              Authorization: `Bearer ${access}`,
          "X-CSRFToken":
            "gnu99yM7oNaRBL4Pjcs88CeWmxOWW55xf2lf1E7Hyzm4UlIZKCkYRI3RL9nTjwm5",
            },
          }
        )
        .then((result) => {
         setSave(result.data)
        })
        .catch((error) => {
          alert("نام کاربری و یا رمز عبور اشتباه است لطفا مجدد تلاش کنید.");
        });
      localStorage.setItem("flag", "true");
    };




  
  return (
    <div className='p-4'>
      <h1>saving</h1>
      <div className='row'>
          <div className='col-12 my-4'>
            <div className="card">
               
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                    <label htmlFor="amount">year</label>
                        <select value={tag} onChange={(e) => setTYear(e.target.value)} className="form-select form-select-lg" aria-label=".form-select-lg example">
                            <option value="2010">2010</option>
                            <option value="2011">2011</option>
                            <option value="2012">2012</option>
                            <option value="2013">2013</option>
                            <option value="2014">2014</option>
                            <option value="2015">2015</option>
                            <option value="2016">2016</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>



                        </select>
                        <label htmlFor="amount">mounth</label>
                        <select value={tag} onChange={(e) => setMounth(e.target.value)} className="form-select form-select-lg" aria-label=".form-select-lg example">
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>


                        </select>
                        <button type="submit" className='m-2 btn btn-outline-primary'>submit</button>
                    </form>
                </div>
            </div>
          </div>
          <div className='col-12'>
              <div className='card'>
                    <div className='card-header d-flex'>
                        saving
                        
                        <div className="input-group mb-3 w-25 ms-auto">
        <span className="input-group-text" id="basic-addon1"><i className="bi bi-sort-up"></i></span>
                      
                        
                        </div>
                    </div>
                    <div className='card-body'>
                  <ul className="list-group">
                    the amount of your saving in the {year} and {mounth} is {save?.saving_amount}$
                     
                        
                    </ul>
                    </div>
              </div>
            
          </div>

      </div>
    </div>
  )
}

export default Save