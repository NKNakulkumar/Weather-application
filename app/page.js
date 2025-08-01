"use client";

import Carousel from "@/components/carousel";
import { format, formatDate, parseISO } from 'date-fns';
import Navbar from "@/components/navbar";
import AnimatedRadialProgress from "@/components/radialprogress";
import TempChart from "@/components/recharts";
import axios from "axios";
// import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [data , setdata]=useState([])
  const [search , setsearch]=useState("London")

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
// const searchparam = useSearchParams();
// const username = searchparam.get();

//
const getData = async () => {
  if (!search.trim()) {
    console.warn("Search query is empty. Not making API call.");
    return;
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(search)}&appid=${apiKey}&units=metric`
    );
    console.log(response.data);
    setdata(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error?.response?.data || error.message);
  }
};

useEffect(() => {
  if (search.trim()) {
    getData();
  }
}, [search]);


const dt = 1753358400; // example Unix timestamp in seconds
const date = new Date(dt * 1000); // convert to milliseconds
const formatted = format(date, 'EEEE/dd/yyyy');
// 
const todayForecast = data.list && data.list[0];
const todayDate = todayForecast ? new Date(todayForecast.dt * 1000) : null;
const formattedDate = todayDate ? format(todayDate, 'EEEE/dd/yyyy') : 'Loading date...';
const formattedTime = todayDate ? format(todayDate, 'h:mm a') : 'Loading time...';

  return (
    
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen w-full p-3 gap-8 justify-items-center">
        <Navbar setsearch={setsearch} citydata={data.city && data.city.name} temp={data.list && Math.round(data.list[0].temp.day - 273.15)} />
      {/* Navbar */}
      <div className="main w-full flex flex-col sm:flex-row justify- gap-6 ">
        {/* Left Section */}
        <div className="left w-full sm:w-[60%] flex flex-col gap-6">
       
          {/* Weather Info */}
          <div className="box1 min-w-[40vw] min-h-[40vh]  p-6 bg-[#1A1A40] rounded-xl shadow-lg text-white">
            <div className="weather-info mt-6 ">
            
              <div className="flex gap-4 items-center">
                <span className="text-4xl">⛅</span>
                <h1 className="text-5xl font-semibold"> {data.list && Math.round(data.list[0].temp.day - 273.15)}°C</h1>
              </div>
              <h2 className="mt-2 text-xl font-medium">{data.city && data.city.name}</h2>
              <div className="box2 float-right top-0 -mt-[12vh] text-white  p-4 w-full max-w-sm ">

  {/* Temperature Chart */}
  <div className="w-full h-40">
    <TempChart />
  </div>

  {/* Time & Temperature Row */}
  {/* <div className="grid mt-14 grid-cols-4 text-center text-sm">
    <div>
      <div>Morning</div>
      <div className="font-semibold">1°C</div>
    </div>
    <div>
      <div>Afternoon</div>
      <div className="font-semibold">2°C</div>
    </div>
    <div>
      <div>Evening</div>
      <div className="font-semibold">0°C</div>
    </div>
    <div>
      <div>Night</div>
      <div className="font-semibold">-1°C</div>
    </div>
  </div> */}

  <hr className="border-gray-700" />

  {/* Footer: Pressure, Humidity, Wind */}
  <div className="grid grid-cols-3 text-center text-xs gap-4 pt-2">
    <div className="flex flex-col items-center">
      <span className="text-lg">🌡️</span>
      720 hpa
    </div>
    <div className="flex flex-col items-center">
      <span className="text-lg">💧</span>
      54%
    </div>
    <div className="flex flex-col items-center">
      <span className="text-lg">��️</span>
      60/h
    </div>
  </div>
</div>
              <hr className="my-4" />
              <div>
              <p>{formattedDate}</p>
              <p>{formattedTime}</p>

              </div>
            </div>
            <div className="box2 mt-6">
              <h2 className="font-semibold text-xl">Temperature</h2>
              <div className="graph mb-4">
          
              </div>
              {/* <div className="flex gap-4 text-sm">
                <p>Morning</p>
                <p>Afternoon</p>
                <p>Evening</p>
                <p>Night</p>
              </div> */}
              <hr className="my-4" />
            </div>
          </div>

          {/* UV Index Cards 1 */}
          <div className="flex justify-evenly mt-4 mb-0 gap-6">
            <div className="w-[20vw] h-[25vh] p-6 bg-[#1A1A40] rounded-xl shadow-lg">
              <h3 className="text-xl text-white">UV Index</h3>
              {/* <AnimatedRadialProgress value={70} duration={1000} /> */}
              <p className="text-white mt-2">Your UV index info</p>
            </div>
            <div className="w-[18vw] h-[25vh] p-6 bg-[#1A1A40] rounded-xl shadow-lg">
              <h3 className="text-xl text-white">UV Index</h3>
              <AnimatedRadialProgress value={70} duration={1000} />
              <p className="text-white mt-2">Your UV index Info</p>
            </div>
          </div>
          <div className="flex justify-evenly mt-4 mb-0 gap-6">
            <div className="w-[20vw] h-[25vh] p-6 bg-[#1A1A40] rounded-xl shadow-lg">
              <h3 className="text-xl text-white">UV Index</h3>
              <AnimatedRadialProgress value={70} duration={1000} />
              <p className="text-white mt-2">Your UV index Info</p>
            </div>
            <div className="w-[18vw] h-[25vh] p-6 bg-[#1A1A40] rounded-xl shadow-lg">
              <h3 className="text-xl text-white">UV Index</h3>
              <AnimatedRadialProgress value={70} duration={1000} />
              <p className="text-white mt-2">Your UV index Info</p>
            </div>
          </div>
          </div>
        {/* Right Section: Carousel */}
        {/* <div className="right sm:w-[40%] w-full mt-6 sm:mt-0 ">
        
        </div> */}
        <div className=' rounded-md right1 w-[40vw] bg-[#0b0f2f] h-full'>
          <h1 className="text-center text-lg font-semibold"> This week</h1>
          <Carousel/>
      </div>
      </div>
    </div>
    
  );
}
