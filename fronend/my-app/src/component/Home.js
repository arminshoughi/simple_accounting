import React from 'react'
import { Line } from 'react-chartjs-2';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

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
import { useCurrent } from '../hook/current';

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
  const [data, setData] = useState({});
  const [diagramState, setDiagramState] = useState({});
  const [qs, setQs] = useSearchParams();
  const {data:current}= useCurrent()

  const setDiagramData = (dataPram) => {
    const diagramData = {
      labels: dataPram.map(item => item),
      datasets: [
        {
          label: 'Expenses',
          data: dataPram.map(item => (item)),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
    
        },
        {
          label: 'Incomes',
          data: [7,8].map(item => item),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
      ]
    }
    setDiagramState(diagramData);

  }
  


  useEffect(() => {
    const date = qs.get('date') || "month";
    console.log(date);
    setDiagramData([1, 3 , 4]);
    fetch(`/api/dashboard/data/?date_range=${date}`).then(res => res.json()).then(res => { setData(res) });
    
  }, [qs]);


  return (
    <div className='p-4'>
      <h1>Dashboard</h1>
      <div className='row p-4'>
        <div className='col-6 col-md-3'>
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">this mounth Income</div>
            <div className="card-body">
              <h2 className="card-title">{data.total_income && data.total_income.toLocaleString() || 0} $</h2>
              
            </div>
          </div>
        </div>
        <div className='col-6 col-md-3'>
          <div className="card text-white bg-success mb-3">
            <div className="card-header">this mounth Savings</div>
            <div className="card-body">
              <h2 className="card-title">{current.inventory || 0 } $</h2>
            </div>
          </div>
        </div>
       
        
        <div className='col-6 col-md-3'>
          <div className="card text-white bg-danger mb-3">
            <div className="card-header">this mounth Expenses</div>
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