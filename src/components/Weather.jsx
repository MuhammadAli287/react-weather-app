import { useState, useEffect } from "react";


// 1 he line ma export b karwa saktay hain func ky sath
export default function Weather(){

const [weather,setweather]=useState("");
const [error,seterror]=useState(null);
const [loading,setloading]=useState(true);
const [selectedcity,setselectedcity]=useState("Lahore");
const [searchinput,setsearchinput]=useState("");
 
const cities= {
  "Lahore": {"lat": 31.5497, "lon": 74.3436},
  "Karachi": {"lat": 24.8607, "lon": 67.0011},
  "Islamabad": {"lat": 33.6844, "lon": 73.0479},
  "Peshawar": {"lat": 34.0151, "lon": 71.5249},
  "Quetta": {"lat": 30.1798, "lon": 66.9750},
  "Sargodha": {"lat": 32.0836, "lon": 72.6711},
  "Multan": {"lat": 30.1694, "lon": 71.4832},
  "Faisalabad": {"lat": 31.4156, "lon": 73.0812},
  "faisalabad": {"lat": 31.4504, "lon": 73.1350},

}

const getWeatherIconCode = (code) => {
  if (code === 0) return "☀️";
  if (code >= 1 && code <= 3) return "⛅";
  if (code >= 45 && code <= 48) return "🌫️";
  if (code >= 51 && code <= 57) return "🌧️";
  if (code >= 61 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 80 && code <= 82) return "🌦️";
  if (code >= 85 && code <= 86) return "🌨️";
  if (code >= 95 && code <= 99) return "⛈️";

  return "❓";
};

const fetchweather = async (cityname)=>{
     try{
        setloading(true)
        seterror(false)

        let city = cities["Lahore"]
        if(!city){
            seterror("city not found");
            setloading(false);
            return;
        }
       
        const apiurl=`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,precipitation,is_day`
    
        //  for debugging
        console.log(`Loading data from: ${apiurl}`);

        const response = await fetch(apiurl);

        if(!response.ok){
            // agar apni marzi ka error msg print karna ho 
            throw new Error(`API Error request rejected: ${response.status}`)
        };
    
        // convertind data into js object (json format)
        let data = await response.json()

     console.log(data);
        // passing values to states
        setweather(data)
        setselectedcity(city)
    }
    catch(error){
        seterror(error.message);
    }
    finally{
        setloading(false);
    }

};



// use of use effect useeffect ky andar
// arrow func banaien gy, or yeah bar bar chalta hai
//  is lya empty array use karien gy usay bound karnay ky liya

useEffect (()=>{
    fetchweather("Lahore")
},[])

//  work for dropdown 
const handlecitychange=(e)=>{
 const city = e.target.value
 fetchweather(city)
}

// work for input field
const handlesearch=(e)=>{
   e.preventDefault()

   if(searchinput.trim()===''){
    seterror("city cannot be empty");
    return;
   }

}

if(cities[searchinput]){
    fetchweather(searchinput)
    setsearchinput("")
}else{
    seterror("Error: City not found");
}




};


