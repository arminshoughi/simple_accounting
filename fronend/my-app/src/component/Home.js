import React from "react";
import { Line } from "react-chartjs-2";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useCurrent } from "../hook/current";
import { useDiagram } from "../hook/diagram";

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
  const [diagramStateM, setDiagramStateM] = useState({});

  const [qs, setQs] = useSearchParams();
  const { data: current } = useCurrent();
  const { data: diagram } = useDiagram();
  const [year, setTYear] = useState();
  const [a, setA] = useState();
  const [aa, setAa] = useState();
  const [b, setB] = useState();
  const [bb, setBb] = useState();
  const [mounth, setMounth] = useState();
  console.log(diagram.expenses_data, "sssssss");

  console.log(
    diagram?.expenses_data,

    "Adsdasdassddd"
  );

  const setDiagramData = (dataPram) => {
    const diagramData = {
      labels: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
      datasets: [
        {
          label: "Expenses",
          data: aa,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Incomes",
          data: a,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
    setDiagramState(diagramData);
  };

  const setDiagramDataM = (dataPram) => {
    const diagramDataM = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Expenses",
          data: bb,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Incomes",
          data: b,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
    setDiagramStateM(diagramDataM);
  };

  useEffect(() => {
    setDiagramData();
  }, [a, aa]);

  useEffect(() => {
    setDiagramDataM();
  }, [b, bb]);

  useEffect(() => {
    let outputArray = new Array(31).fill(0); // initialize an array with 31 zeros
    diagram?.income_data
      ?.filter((i) => i?.year === Number(year))
      .filter((i) => i?.month === Number(mounth))
      ?.forEach((entry) => {
        const index = entry.day - 1; // days are 1-indexed, so subtract 1 to get the 0-indexed position
        outputArray[index] = entry.amount;
      });

    setA(outputArray);
    let expenses = new Array(31).fill(0); // initialize an array with 31 zeros
    diagram?.expenses_data
      ?.filter((i) => i?.year === Number(year))
      .filter((i) => i?.month === Number(mounth))
      ?.forEach((entry) => {
        const index = entry.day - 1; // days are 1-indexed, so subtract 1 to get the 0-indexed position
        expenses[index] = entry.amount;
      });
    setAa(expenses);
  }, [year, mounth]);

  useEffect(() => {
    let outputArray = new Array(12).fill(0); // initialize an array with 31 zeros
    diagram?.income_data
      ?.filter((i) => i?.year === Number(year))
      ?.forEach((entry) => {
        const index = entry.day - 1; // days are 1-indexed, so subtract 1 to get the 0-indexed position
        outputArray[index] = entry.amount;
      });

    setB(outputArray);
    let expenses = new Array(12).fill(0); // initialize an array with 31 zeros
    diagram?.expenses_data
      ?.filter((i) => i?.year === Number(year))
      ?.forEach((entry) => {
        const index = entry.day - 1; // days are 1-indexed, so subtract 1 to get the 0-indexed position
        expenses[index] = entry.amount;
      });
    setBb(expenses);
  }, [year]);

  return (
    <div className="p-4">
      <h1>Dashboard</h1>

      <div className="row p-4">
        <div className="col-6 col-md-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">this mounth Income</div>
            <div className="card-body">
              <h2 className="card-title">{current.input_amount} $</h2>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">this mounth Savings</div>
            <div className="card-body">
              <h2 className="card-title">{current.inventory || 0} $</h2>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card text-white bg-danger mb-3">
            <div className="card-header">this mounth Expenses</div>
            <div className="card-body">
              <h2>{current.expenses_amount} $</h2>
            </div>
          </div>
        </div>
        <label htmlFor="amount">year</label>
        <select
          value={year}
          onChange={(e) => setTYear(e.target.value)}
          className="form-select form-select-lg"
          aria-label=".form-select-lg example"
        >
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
        <select
          value={mounth}
          onChange={(e) => setMounth(e.target.value)}
          className="form-select form-select-lg"
          aria-label=".form-select-lg example"
        >
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
        <div className="col-12 mt-4">
          <div className="card">
            <div className="card-header">Diagram</div>
            <div className="card-header">Daily</div>
            
            <div className="card-body h-[37rem] ">
              {diagramState.labels && <Line data={diagramState} />}
              
            </div>
            <div className="card-header">Monthly</div>

            <div className="card-body h-[37rem] ">
              {diagramStateM.labels && <Line data={diagramStateM} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
