import React, { useState } from 'react';
import './WeatherWidget.css';

const API_KEY = 'd08d5e5f4ad3f7da934a02812ef613e2';
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const WeatherWidget = () => {
  const [city, setCity] = useState('');
  const [time, setTime] = useState('18:00');
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError(null);
    setForecast([]);

    try {
      const res = await fetch(
        `${API_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setForecast(data.list);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const dailyForecast = forecast.filter(
    item => item.dt_txt && item.dt_txt.endsWith(`${time}:00`)
  );

  return (
    <div className="weather-widget">
      <h1 className="title">Weather at {time}</h1>

      <div className="controls">
        <input
          className="input-city"
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Enter city"
          disabled={loading}
        />
        <input
          className="input-time"
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          disabled={loading}
        />
        <button
          className="btn"
          onClick={fetchWeather}
          disabled={loading || !city.trim()}
        >
          {loading ? 'Loading...' : 'Get Forecast'}
        </button>
      </div>

      {error && <p className="message error">Error: {error}</p>}
      {!loading && forecast.length === 0 && (
        <p className="message">Enter a city and click Get Forecast.</p>
      )}
      {!loading && forecast.length > 0 && dailyForecast.length === 0 && (
        <p className="message">No data available for {time} forecast.</p>
      )}

      <div className="forecast-grid">
        {dailyForecast.map(item => {
          const [datePart, timePart] = item.dt_txt.split(' ');
          return (
            <div key={item.dt} className="card">
              <p className="date">
                {datePart} <strong>{timePart.slice(0,5)}</strong>
              </p>
              <img
                className="icon"
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
              />
              <p className="temp">{Math.round(item.main.temp)}°C</p>
              <p className="desc">{item.weather[0].description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherWidget;