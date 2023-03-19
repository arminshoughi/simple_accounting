import React from 'react'
import { Line } from 'react-chartjs-2';
import { useEffect, useState, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSearchParams } from 'react-router-dom';
import { useMaster } from '../hook/incomes';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const Home = () => {
  const a= useMaster()
  console.log(a , "ssssssas");
  const [data, setData] = useState({});
  const [diagramState, setDiagramState] = useState({});
console.log(data ,"data")
  const setDiagramData = (dataPram) => {
    const diagramData = {
      labels: dataPram.expenses.map(item => Object.keys(item)[0]),
      datasets: [
        {
          label: 'Expenses',
          data: dataPram.expenses.map(item => (Object.values(item)[0] || 0)),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
    
        },
        {
          label: 'Incomes',
          data: dataPram.incomes.map(item => (Object.values(item)[0] || 0)),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
      ]
    }
    setDiagramState(diagramData);

  }
  


  useEffect(() => {
  
    fetch(`/api/dashboard/account/`).then(res => res.json()).then(res => { setData(res) });
    
  }, []);


  return (
    <div className='p-4'>
      <h1>Dashboard</h1>
      <div className='row p-4'>
        <div className='col-6 col-md-3'>
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">Total Income</div>
            <div className="card-body">
              <h2 className="card-title">{data.total_income && data.total_income.toLocaleString() || 0} $</h2>
              
            </div>
          </div>
        </div>
        <div className='col-6 col-md-3'>
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Total Savings</div>
            <div className="card-body">
              <h2 className="card-title">{data.total_saving && data.total_saving.toLocaleString() || 0 } $</h2>
            </div>
          </div>
        </div>
        <div className='col-6 col-md-3'>
          <div className="card text-white bg-warning mb-3">
            <div className="card-header">Total Checks</div>
            <div className="card-body">
              <h2>{data.total_check && data.total_check.toLocaleString() || 0 } $</h2>
            </div>
          </div>
        </div>
        
        <div className='col-6 col-md-3'>
          <div className="card text-white bg-danger mb-3">
            <div className="card-header">Total Expenses</div>
            <div className="card-body">
              <h2>{data.total_expense && data.total_expense.toLocaleString() || 0} $</h2>
            </div>
          </div>
        </div>

        <div className='col-12'>
          <div className="card">
            <div className="card-header">
              Diagram
            </div>
            <div className="card-body">
              { diagramState.labels && <Line data={diagramState} /> }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home