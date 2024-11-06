import React, { useState, useEffect, useRef } from 'react';
import './AlarmClock.css';

const AlarmClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarms, setAlarms] = useState([]);
  const [isRinging, setIsRinging] = useState(false);
  const [activeAlarm, setActiveAlarm] = useState(null);
  const [weather, setWeather] = useState(null); // To store weather data
  const [joke, setJoke] = useState(''); // To store dad joke
  const audioRef = useRef(new Audio('/alarm.mp3'));

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // time formatting that includes hours, minutes, and seconds
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // Fetch weather data from OpenWeather API
  const fetchWeather = async () => {
    try {
      const apiKey = '63373578b926758245248a49cc47d7ba'; // API KEY IN LYTSPACE SUBMISSION <----------------
      const city = 'New York'; // CITY NAME SET HERE <----------------
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      setWeather({
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Fetch dad joke from icanhazdadjoke API
  const fetchDadJoke = async () => {
    try {
      const response = await fetch('https://icanhazdadjoke.com/', {
        headers: { 'Accept': 'application/json' }
      });
      const data = await response.json();
      setJoke(data.joke);
    } catch (error) {
      setJoke("Couldn't fetch a joke, but you can still smile!");
      console.error("Error fetching joke:", error);
    }
  };

  // Fetch weather data on component mount
  useEffect(() => {
    fetchWeather();
  }, []);

  // Check if any alarm should ring
  useEffect(() => {
    alarms.forEach((alarm) => {
      if (!isRinging && formatTime(currentTime).slice(0, 5) === alarm) { // Compare time without seconds
        setIsRinging(true);
        setActiveAlarm(alarm);
        audioRef.current.loop = true; // Keep looping until stopped or snoozed
        audioRef.current.play().catch((error) => {
          console.error('Error playing sound:', error);
        });
        fetchDadJoke(); // Fetch a joke when the alarm rings
        // Remove the alarm from the list of alarms as soon as it starts ringing
        setAlarms(alarms.filter(a => a !== alarm));
      }
    });
  }, [currentTime, alarms, isRinging]);

  // Add an alarm to the list
  const addAlarm = (e) => {
    e.preventDefault();
    const newAlarm = e.target.elements.alarmTime.value;
    if (newAlarm && !alarms.includes(newAlarm)) {
      setAlarms([...alarms, newAlarm]);
    }
    e.target.reset();
  };

  const snoozeAlarm = () => {
    setIsRinging(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    // Snooze for 5 minutes (300,000 ms)
    const snoozeTime = new Date(currentTime.getTime() + 300000);
    const snoozeFormatted = formatTime(snoozeTime).slice(0, 5);
    setAlarms([...alarms, snoozeFormatted]);
  };

  // Stop the alarm
  const stopAlarm = () => {
    setIsRinging(false);
    setActiveAlarm(null);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.loop = false; // Stop looping the sound
    setJoke(''); // Clear joke after stopping the alarm
  };

  return (
    <div className="alarm-container">
      <h1>Current Time: {formatTime(currentTime)}</h1>
      
      {/* Weather Display */}
      {weather && (
        <div className="weather-info">
          <h2>Weather in New York:</h2>
          <p>{weather.temperature}°C, {weather.description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
            alt={weather.description}
          />
        </div>
      )}
  
      {/* Add New Alarm */}
      <form onSubmit={addAlarm}>
        <input type="time" name="alarmTime" required />
        <button type="submit">Add Alarm</button>
      </form>
      
      {/* List of Alarms */}
      <h2>Alarms:</h2>
      <ul>
        {alarms.map((alarm, index) => (
          <li key={index}>
            {alarm} 
            <button onClick={() => setAlarms(alarms.filter(a => a !== alarm))}>Delete</button>
          </li>
        ))}
      </ul>
  
      {/* Alarm Active (Ringing) */}
      {isRinging && (
        <div className="alarm-active">
          <h2>⏰ Alarm for {activeAlarm} is Ringing! ⏰</h2>
          <p>{joke}</p> {/* Display the dad joke */}
          <button onClick={stopAlarm} className="stop-button">Stop Alarm</button>
          <button onClick={snoozeAlarm} className="snooze-button">Snooze 5 mins</button>
          
          {/* Bomb explosion effect */}
          <div className="explosion"></div>
        </div>
      )}
    </div>
  );  
};

export default AlarmClock;
