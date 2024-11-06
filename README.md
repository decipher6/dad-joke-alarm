# Alarm Clock Web App

## Description
The **Alarm Clock Web App** is a simple, yet powerful, web application that allows users to set multiple alarms and receive a weather update and a fun dad joke when an alarm rings. Additionally, it features a "bomb effect" animation to make the alarm experience more exciting. It integrates real-time weather data using the OpenWeather API and a dad joke from the icanhazdadjoke API.

This app solves the problem of creating a dynamic and interactive alarm system with a unique and fun user experience. Instead of just a basic alarm, users are greeted with entertaining elements like jokes and an explosion animation to make waking up or reminders more enjoyable.

## Features:
- Set multiple alarms with easy removal.
- Receive current weather data for New York (or any city you choose to configure).
- Get a random dad joke when the alarm goes off.
- Fun "bomb effect" animation when the alarm rings.
- Ability to snooze alarms for 5 minutes.
- Integration with APIs for dynamic weather and joke generation.

## Setup and Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-repository/alarm-clock-app.git
cd alarm-clock-app
```

### 2. Install Dependencies
Make sure you have Node.js installed. Then, install the dependencies:

```bash
npm install
```

### 3. Obtain API Keys
To fetch live weather data, you'll need an API key from OpenWeather.

Sign up and generate your API key.
Replace the placeholder "YOUR_API_KEY" in the AlarmClock.js file with your OpenWeather API key.

### 4. Run the Project
To start the development server, run:

```bash
npm start
```
Your app should now be running on localhost:3000.

### 5. Using the App
Add an alarm by selecting a time and clicking Add Alarm.
When an alarm rings, a dad joke and bomb explosion animation will be displayed.
You can stop the alarm or snooze it for 5 minutes.

## API Integration

### OpenWeather API
API Used: OpenWeather API
How It's Integrated: The fetchWeather function in AlarmClock.js makes an API call to OpenWeather to fetch the current weather data for New York. This data is then displayed to the user, including the temperature and a weather icon.
### icanhazdadjoke API
API Used: icanhazdadjoke API
How It's Integrated: The fetchDadJoke function in AlarmClock.js fetches a random dad joke when the alarm goes off, adding humor to the user's experience.

## Credits for AI-generated Code
This project was partially built using AI-generated code from ChatGPT. Specifically, the following parts of the code were enhanced or generated with AI assistance:

- The "bomb effect" and shake animation, along with the keyframe CSS code for these effects, were designed with the help of ChatGPT.
- Assistance was provided in structuring the useEffect hooks.
- While the core structure and functionality of the app were implemented by the developer, AI assistance was valuable in providing coding solutions for certain interactive elements.