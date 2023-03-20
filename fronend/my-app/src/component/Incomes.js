import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { useCurrent } from '../hook/current';
import { useMaster } from '../hook/incomes';

 


const Incomes = () => {
  const [incomes, setIncomes] = useState([]);
  const [ordering, setOrdering] = useState('-date');
  const access = localStorage.getItem('access')
  const [title, setTitle] = useState();
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();

  const [tag, setTag] = useState();

  const {data}= useMaster()
  const {data:current}= useCurrent()

  console.log(data, "sssasdasdsssas");
    useEffect(() => {
        fetch(`/api/incomes/?ordering=${ordering}`).then(res => res.json()).then(res => { setIncomes(res)});
    }, [ordering]);


    const handleSubmit = (e) => {
      e.preventDefault();
      axios 
        .post(
           "http://127.0.0.1:8000/api/dashboard/account/",
          {
            user_id: current.id,
  title: title,
  description: description,
  amount: amount,
  typ: "input",
  is_checked:"false",
  tag:tag,
          },
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
         console.log("asdasdd")
        })
        .catch((error) => {
          alert("نام کاربری و یا رمز عبور اشتباه است لطفا مجدد تلاش کنید.");
        });
      localStorage.setItem("flag", "true");
    };

    const handleDelete = (e) => {
      axios 
        .delete(
           `http://127.0.0.1:8000/api/dashboard/account/${e}/`,
         
          {

            headers: {
              "Content-Type": "application/json",
              "accept": "application/json",
              Authorization: `Bearer ${access}`,
       
            },
          }
        )
        .then((result) => {
        
        })
        .catch((error) => {
          alert("نام کاربری و یا رمز عبور اشتباه است لطفا مجدد تلاش کنید.");
        });
      localStorage.setItem("flag", "true");
    };


  return (
    <div className='p-4'>
      <h1>Incomes</h1>
      <div className='row'>
          <div className='col-12 my-4'>
            <div className="card">
                <div className="card-header">
                    New Income
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="amount">title</label>
                            <input
                             onChange={(e) => setTitle(e.target.value)}
                        
                        
                            name="amount" className="form-control" id="amount" placeholder="Enter amount" />
                            <label htmlFor="amount">Amount</label>
                            <input 
                             onChange={(e) => setAmount(e.target.value)} type="number" name="amount" className="form-control" id="amount" placeholder="Enter amount" />
                        <label htmlFor="amount">description</label>
                            <input 
                             onChange={(e) => setDescription(e.target.value)}  name="amount" className="form-control" id="amount" placeholder="Enter amount" />
                       
                        </div>
                        <label htmlFor="amount">tag</label>
                        <select value={tag} onChange={(e) => setTag(e.target.value)} className="form-select form-select-lg" aria-label=".form-select-lg example">
                            <option value="food">food</option>
                            <option value="dress">dress</option>
                            <option value="bill">bill</option>
                            <option value="rent">rent</option>
                            <option value="leon">leon</option>
                            <option value="salary">salary</option>
                            <option value="cars and accessories">cars and accessories</option>
                            <option value="payment to other"> payment to other</option>
                            <option value="service">service</option>
                            <option value="health">health</option>
                            <option value="other">other</option>

                        </select>
                        <button type="submit" className='m-2 btn btn-outline-primary'>submit</button>
                    </form>
                </div>
            </div>
          </div>
          <div className='col-12'>
              <div className='card'>
                    <div className='card-header d-flex'>
                        Incomes
                        
                        <div className="input-group mb-3 w-25 ms-auto">
        <span className="input-group-text" id="basic-addon1"><i className="bi bi-sort-up"></i></span>
                        <select value={ordering} onChange={(e) => setOrdering(e.target.value)} className="form-select form-select-lg" aria-label=".form-select-lg example">
                            <option value="-date">Date Ascending</option>
                            <option value="date">Date Descending</option>
                            <option value="-amount">Amount Ascending</option>
                            <option value="amount">Amount Descending</option>
                        </select>
                        
                        </div>
                    </div>
                    <div className='card-body'>
                  <ul className="list-group">
                        {data.filter(i =>i.typ === "input").filter(i => i.is_checked !== true).map(income => 
                            <li key={income.id} className="list-group-item">
                                <div className=" d-flex">
                                <button onClick={()=> handleDelete(income.id)} className=' me-4 btn btn-danger btn-sm'>Delete<i className="bi bi-trash"></i></button>
                                <span className="fw-bold me-auto text-success">{ income.amount.toLocaleString() }$</span>
                                <span className="fw-bold me-auto text-success">{ income.description } </span>
                                <span className="fw-bold me-auto text-success">{ income.title } </span>
                                <span className="fw-bold me-auto text-success">{ income.tag} </span>

                                

                                <span >{new Date(income.date).toLocaleDateString("en-US")}</span>
                                </div>
                            </li>
                )}
                        
                    </ul>
                    </div>
              </div>
            
          </div>

      </div>
    </div>
  )
}

export default Incomes