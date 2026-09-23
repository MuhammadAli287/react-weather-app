// import { useState, useEffect } from "react";


// // 1 he line ma export b karwa saktay hain func ky sath
// export default function Weather(){

// const [weather,setweather]=useState("");
// const [error,seterror]=useState(null);
// const [loading,setloading]=useState(true);
// const [selectedCity,setselectedcity]=useState("Lahore");
// const [searchInput,setsearchinput]=useState("");
 
// const cities= {
//   "Lahore": {"lat": 31.5497, "lon": 74.3436},
//   "Karachi": {"lat": 24.8607, "lon": 67.0011},
//   "Islamabad": {"lat": 33.6844, "lon": 73.0479},
//   "Peshawar": {"lat": 34.0151, "lon": 71.5249},
//   "Quetta": {"lat": 30.1798, "lon": 66.9750},
//   "Sargodha": {"lat": 32.0836, "lon": 72.6711},
//   "Multan": {"lat": 30.1694, "lon": 71.4832},
//   "Faisalabad": {"lat": 31.4156, "lon": 73.0812},
//   "faisalabad": {"lat": 31.4504, "lon": 73.1350},

// }

// const getWeatherIconCode = (code) => {
//   if (code === 0) return "☀️";
//   if (code >= 1 && code <= 3) return "⛅";
//   if (code >= 45 && code <= 48) return "🌫️";
//   if (code >= 51 && code <= 57) return "🌧️";
//   if (code >= 61 && code <= 67) return "🌧️";
//   if (code >= 71 && code <= 77) return "❄️";
//   if (code >= 80 && code <= 82) return "🌦️";
//   if (code >= 85 && code <= 86) return "🌨️";
//   if (code >= 95 && code <= 99) return "⛈️";

//   return "❓";
// };

// const fetchweather = async (cityname)=>{
//      try{
//         setloading(true)
//         seterror(false)

//         let city = cities["Lahore"]
//         if(!city){
//             seterror("city not found");
//             setloading(false);
//             return;
//         }
       
//         const apiurl=`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,precipitation,is_day`
    
//         //  for debugging
//         console.log(`Loading data from: ${apiurl}`);

//         const response = await fetch(apiurl);

//         if(!response.ok){
//             // agar apni marzi ka error msg print karna ho 
//             throw new Error(`API Error request rejected: ${response.status}`)
//         };
    
//         // convertind data into js object (json format)
//         let data = await response.json()

//      console.log(data);
//         // passing values to states
//         setweather(data)
//         setselectedcity(city)
//     }
//     catch(error){
//         seterror(error.message);
//     }
//     finally{
//         setloading(false);
//     }

// };



// // use of use effect useeffect ky andar
// // arrow func banaien gy, or yeah bar bar chalta hai
// //  is lya empty array use karien gy usay bound karnay ky liya

// useEffect (()=>{
//     fetchweather("Lahore")
// },[])

// //  work for dropdown 
// const handlecitychange=(e)=>{
//  const city = e.target.value
//  fetchweather(city)
// }

// // work for input field
// const handleSearch=(e)=>{
//    e.preventDefault()

//    if(searchinput.trim()===''){
//     seterror("city cannot be empty");
//     return;
//    }

// }

// if(cities[searchinput]){
//     fetchweather(searchinput)
//     setsearchinput("")
// }else{
//     seterror("Error: City not found");
// }

// // return part here below
    

// };


// now code copy from github 



// File: src/pages/WeatherApp.jsx
// Weather Application - Simple API Integration for Beginners
// Uses Open-Meteo Weather API (Free, no key needed)

import { useState, useEffect } from 'react';

export default function WeatherApp() {
  
  // ========================================
  // ✅ STEP 1: State Management
  // ========================================
  
  // Store weather data from API
  const [weather, setWeather] = useState(null);
  
  // Store loading state (while fetching)
  const [loading, setLoading] = useState(true);
  
  // Store error state (if something goes wrong)
  const [error, setError] = useState(null);
  
  // Store selected city
  const [selectedCity, setSelectedCity] = useState('Lahore');
  
  // Store search input
  const [searchInput, setSearchInput] = useState('');

  // ========================================
  // ✅ STEP 2: City Coordinates (Latitude & Longitude)
  // ========================================
  
  const cities = {
    "Lahore": { lat: 31.5204, lon: 74.3587 },
    "Karachi": { lat: 24.8607, lon: 67.0011 },
    "Islamabad": { lat: 33.6844, lon: 73.0479 },
    "Rawalpindi": { lat: 33.5651, lon: 73.1896 },
    "Multan": { lat: 30.1575, lon: 71.4454 },
    "Faisalabad": { lat: 31.4180, lon: 72.3457 },
    "Peshawar": { lat: 34.0151, lon: 71.5249 },
    "Quetta": { lat: 30.1798, lon: 66.9750 },
    "Hyderabad": { lat: 25.3960, lon: 68.4626 },
    "Gujranwala": { lat: 32.1814, lon: 74.1856 }
  };

  // ========================================
  // ✅ STEP 3: Weather Code to Emoji & Description
  // ========================================
  
  const getWeatherIcon = (code) => {
    if (code === 0) return { emoji: '☀️', text: 'Clear Sky' };
    if (code === 1 || code === 2) return { emoji: '🌤️', text: 'Mostly Clear' };
    if (code === 3) return { emoji: '☁️', text: 'Overcast' };
    if (code === 45 || code === 48) return { emoji: '🌫️', text: 'Foggy' };
    if (code === 51 || code === 53 || code === 55) return { emoji: '🌧️', text: 'Drizzle' };
    if (code === 61 || code === 63 || code === 65) return { emoji: '🌧️', text: 'Rain' };
    if (code === 71 || code === 73 || code === 75) return { emoji: '❄️', text: 'Snow' };
    if (code === 80 || code === 81 || code === 82) return { emoji: '⛈️', text: 'Rain Showers' };
    if (code === 85 || code === 86) return { emoji: '❄️', text: 'Snow Showers' };
    if (code === 95 || code === 96 || code === 99) return { emoji: '⚡', text: 'Thunderstorm' };
    return { emoji: '❓', text: 'Unknown' };
  };

  // ========================================
  // ✅ STEP 4: Fetch Weather Data from API
  // ========================================
  
  const fetchWeather = async (cityName) => {
    try {
      // Set loading to true (show loading message)
      setLoading(true);
      setError(null);
      
      // Get coordinates for selected city
      const city = cities[cityName];
      
      if (!city) {
        setError('City not found!!');
        setLoading(false);
        return;
      }
      
      // Construct the API URL
      // This URL asks the Open-Meteo API for:
      // - temperature_2m: Temperature at 2 meters height
      // - weather_code: Weather condition code
      // - wind_speed_10m: Wind speed at 10 meters height
      // - relative_humidity_2m: Humidity percentage
      // - precipitation: Rain amount
      const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,precipitation,is_day`;
      
      // MAKE THE API REQUEST
      // fetch() sends a request to the API and waits for response
      console.log('Fetching from::', apiUrl); // For debugging
      const response = await fetch(apiUrl);
      
      // Check if response is OK (status 200)
      if (!response.ok) {
        throw new Error(`API Error::: ${response.status}`);
      }
      
      // Convert response to JSON (JavaScript object)
      const data = await response.json();
      
      // Store the data in state
      setWeather(data);
      setSelectedCity(cityName);
      
      console.log('Weather data received::', data); // For debugging
      
    } catch (error) {
      // If any error occurs, store it in error state
      console.error('Error fetching weather::', error);
      setError(error.message);
    } finally {
      // Always set loading to false when done
      setLoading(false);
    }
  };

  // ========================================
  // ✅ STEP 5: Fetch data when component loads
  // ========================================
  
  useEffect(() => {
    // This runs ONCE when component mounts
    fetchWeather('Lahore');
  }, []); // Empty dependency array = run once

  // ========================================
  // ✅ STEP 6: Handle city change
  // ========================================
  
  const handleCityChange = (e) => {
    const city = e.target.value;
    fetchWeather(city);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (searchInput.trim() === '') {
      setError('Please enter a city name');
      return;
    }
    
    // Check if city exists in our database
    if (cities[searchInput]) {
      fetchWeather(searchInput);
      setSearchInput('');
    } else {
      setError(`City "${searchInput}" not found. Try: Lahore, Karachi, Islamabad, etc.`);
    }
  };

  // ========================================
  // ✅ STEP 7: Render UI
  // ========================================
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600">
      
      {/* ===== CONTAINER ===== */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* ===== HEADER ===== */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">🌤️ Weather Forecast</h1>
          <p className="text-blue-100 text-lg">Check weather in Pakistani cities</p>
        </div>

        {/* ===== SEARCH & CITY SELECTOR ===== */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-3 mb-6">
            <input 
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search city... (e.g., Karachi)"
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
            />
            <button 
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              🔍 Search
            </button>
          </form>

          {/* City Dropdown */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Select City:: 
            </label>
            <select 
              value={selectedCity}
              onChange={handleCityChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none bg-white"
            >
              {Object.keys(cities).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ===== LOADING STATE ===== */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
            <div className="text-6xl mb-4 animate-bounce">⏳</div>
            <p className="text-2xl font-bold text-gray-800">Loading weather data....</p>
            <p className="text-gray-600 mt-2">Fetching from Open-Meteo API</p>
          </div>
        )}

        {/* ===== ERROR STATE ===== */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-600 rounded-lg p-6 mb-8">
            <p className="text-red-800 font-bold text-lg">❌ Error: {error}</p>
            <p className="text-red-700 text-sm mt-2">
              Please try again or select a different city.
            </p>
          </div>
        )}

        {/* ===== WEATHER DISPLAY ===== */}
        {weather && !loading && (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Weather Main Info */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8">
              
              <h2 className="text-4xl font-bold mb-2">📍 {selectedCity}</h2>
              <p className="text-blue-100 text-sm mb-6">
                Lat: {weather.latitude.toFixed(2)}, Lon: {weather.longitude.toFixed(2)}
              </p>

              {/* Current Weather Icon & Temp */}
              <div className="flex items-start gap-6 mb-8">
                <div className="text-9xl">
                  {getWeatherIcon(weather.current.weather_code).emoji}
                </div>
                <div>
                  <div className="text-7xl font-bold">
                    {weather.current.temperature_2m}°C
                  </div>
                  <p className="text-2xl text-blue-100 mt-2">
                    {getWeatherIcon(weather.current.weather_code).text}
                  </p>
                </div>
              </div>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-gray-50">
              
              {/* Wind Speed */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-3xl mb-2">💨</div>
                <p className="text-gray-600 text-sm font-semibold">Wind Speed</p>
                <p className="text-3xl font-bold text-blue-600">
                  {weather.current.wind_speed_10m}
                </p>
                <p className="text-gray-500 text-xs">km/h</p>
              </div>

              {/* Humidity */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-3xl mb-2">💧</div>
                <p className="text-gray-600 text-sm font-semibold">Humidity</p>
                <p className="text-3xl font-bold text-blue-600">
                  {weather.current.relative_humidity_2m}%
                </p>
                <p className="text-gray-500 text-xs">relative</p>
              </div>

              {/* Precipitation */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-3xl mb-2">🌧️</div>
                <p className="text-gray-600 text-sm font-semibold">Precipitation</p>
                <p className="text-3xl font-bold text-blue-600">
                  {weather.current.precipitation}
                </p>
                <p className="text-gray-500 text-xs">mm</p>
              </div>

              {/* Day/Night */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-3xl mb-2">
                  {weather.current.is_day ? '☀️' : '🌙'}
                </div>
                <p className="text-gray-600 text-sm font-semibold">Day/Night</p>
                <p className="text-3xl font-bold text-blue-600">
                  {weather.current.is_day ? 'Day' : 'Night'}
                </p>
                <p className="text-gray-500 text-xs">current</p>
              </div>
            </div>

            {/* Footer Info */}
            <div className="bg-gray-100 px-8 py-4 text-center text-sm text-gray-600">
              <p>🔄 Data provided by Open-Meteo (Free Weather API)</p>
            </div>
          </div>
        )}

        {/* ===== HELPFUL INFO ===== */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">ℹ️ How This App Works</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-2xl">1️⃣</span>
              <span>
                <strong>Search or Select:</strong> Choose a city from the dropdown or search for it
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-2xl">2️⃣</span>
              <span>
                <strong>Fetch Data:</strong> App sends request to Open-Meteo API
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-2xl">3️⃣</span>
              <span>
                <strong>Receive Response:</strong> API returns weather data in JSON format
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-2xl">4️⃣</span>
              <span>
                <strong>Display Data:</strong> App shows the weather on screen
              </span>
            </li>
          </ul>
        </div>

        {/* ===== API DOCUMENTATION ===== */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">🔗 API Used</h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="font-mono text-sm text-gray-700 break-all">
              https://api.open-meteo.com/v1/forecast?latitude=LAT&longitude=LON&current=temperature_2m,weather_code...
            </p>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li><strong>✅ No API Key Required</strong> - Free to use!</li>
            <li><strong>✅ CORS Enabled</strong> - Works directly from browser</li>
            <li><strong>✅ Real-time Data</strong> - Updated regularly</li>
            <li><strong>✅ Global Coverage</strong> - Weather for any location</li>
          </ul>
        </div>
      </div>
    </main>
  );
};




