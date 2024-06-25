import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Styles.css";

const Weather = () => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [data, setData] = useState('');

  useEffect(() => {
    const apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=lagos&units=metric&appid=39a2922173caff994c7cf874897b3417";
    axios
      .get(apiUrl)
      .then((res) => {
        setLoading(false);
        setData({
          ...data,
          celcius: res.data.main.temp,
          name: res.data.name,
          humidity: res.data.main.humidity,
          speed: res.data.wind.speed,
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  }, []);

  function handleClick() {
      if (name !== "") {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=39a2922173caff994c7cf874897b3417`;
        axios
          .get(apiUrl)
          .then((res) => {
            setLoading(false);
            setData({
              ...data,
              celcius: res.data.main.temp,
              name: res.data.name,
              humidity: res.data.main.humidity,
              speed: res.data.wind.speed,
            });
          })
          .catch((err) => {
            console.log(err);
            setLoading(true)
          });
      }
    setName('')
  }

  if (loading) {
    return <div className="loading">Loading... Please wait!</div>;
  }

  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="search-btn" onClick={handleClick}>
          <FaSearch />
        </button>
      </div>
      <div className="weather loading">
        <h2>Weather in {data.name}</h2>
        <h1>{data.celcius}°c</h1>
        <div className="flex">
          <img
            src="https://openweathermap.org/img/wn/10d.png"
            alt=""
            className="icon"
          />
          <div className="description">Cloudy</div>
        </div>
        <div className="humidity">Humidity: {data.humidity}%</div>
        <div className="wind">Wind speed: {data.speed}km/h</div>
      </div>
    </div>
  );
};

export default Weather;
