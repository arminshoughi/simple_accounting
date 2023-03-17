import axios from "axios";
import React, { useEffect, useState } from "react";

export function useMaster() {
  const [collages, setData] = useState([]);
  console.log("npm i axios")

  const getData = () => {
    axios
      .get('http://127.0.0.1:8000/api/dashboard/account/' , {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc5MDg5ODkyLCJqdGkiOiJjOTJhYzgxYjgwNTI0MTExYjNkZmY3NDdlMDNiMDhmNSIsInVzZXJfaWQiOjd9._8GBpkSm2qWhSi6mZ-rP2pC40YAgts6f1GWx48KxP2o' \
          ",
          "X-CSRFToken":
            "gnu99yM7oNaRBL4Pjcs88CeWmxOWW55xf2lf1E7Hyzm4UlIZKCkYRI3RL9nTjwm5",
        },
      })
      .then(function (res) {  
        setData(res.data);
      })
      .catch(function (err) {
        if (err.response) {
          console.error("Res Error: ", err.response.status);
        } else if (err.request) {
          console.error("Req Error");
        } else {
          console.error("Error: ", err.message);
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const data = React.useMemo(() => collages, [collages]);
console.log(data , "Asdasdasdxx")
  return {
    data,
  };
}