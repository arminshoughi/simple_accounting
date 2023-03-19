import React from 'react'
import { useState, useEffect } from 'react';
import { useMaster } from '../hook/incomes';


const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [ordering, setOrdering] = useState('-date');
  
    const {data}= useMaster()
      useEffect(() => {
          fetch(`/api/expenses/?ordering=${ordering}`).then(res => res.json()).then(res => { setExpenses(res)});
      }, [ordering]);
  
    const submitForm = (e) => {
      e.preventDefault();
      const form = e.target;
      const data = new FormData(form);
      data.get('max_amount') || data.delete('max_amount');
      const jsonData = JSON.stringify(Object.fromEntries(data))
      fetch('/api/expenses/', {
        headers: {
          "content-type": "application/json",
       
        },
        method: 'post',
        body: JSON.stringify(Object.fromEntries(data)),
      }).then(res => res.json()).then(res => {
        setExpenses([res,...expenses]);
        e.target.reset();
      });
    }
  
    const deleteItem = (id) => {
      fetch(`/api/expenses/${id}/`, {
          method: 'delete',
          headers: {
              "content-type": "application/json",
             
          }
      }).then(res => {
          setExpenses(expenses.filter(item => item.id !== id));
      }
      );
      }

  return (
    <div className='p-4'>
      <h1>Expenses</h1>
      <div className='row'>
          <div className='col-12 my-4'>
            <div className="card">
                <div className="card-header">
                    New Expense
                </div>
                <div className="card-body">
                    <form onSubmit={submitForm}>
                        <div className="form-group">
                            <label htmlFor="amount">Amount</label>
                            <input type="number" name="amount" className="form-control" id="amount" placeholder="Enter amount" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="max-amount">Max Amount</label>
                            <input type="number" name="max_amount" className="form-control" id="max-amount" placeholder="Enter max amount" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" className="form-control" id="name" placeholder="Enter name" />
                        </div>
                        <button type="submit" className='m-2 btn btn-outline-primary'>submit</button>
                    </form>
                </div>
            </div>
          </div>
          <div className='col-12'>
              <div className='card'>
                    <div className='card-header d-flex'>
                        Expenses
                        
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
                        {data.filter(i=>i.typ === "output").map(expense => 
                            <li key={expense.id} className="list-group-item">
                                <div className=" d-flex">
                                <button onClick={()=> deleteItem(expense.id)} className=' me-4 btn btn-danger btn-sm'><i className="bi bi-trash"></i></button>
                                <span className='text-muted me-4'>name: {expense.name}</span>
                                <span className="fw-bold me-auto text-success">{ expense.amount.toLocaleString() } $</span>
                                <span >{new Date(expense.date).toLocaleDateString("en-US")}</span>
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

export default Expenses