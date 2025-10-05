"use client";
import Carousel from "@/components/carousel";
import { format } from "date-fns";
import Navbar from "@/components/navbar";
import AnimatedRadialProgress from "@/components/radialprogress";
import TempChart from "@/components/recharts";
import axios from "axios";
// import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import WindChart from "@/components/WindDataCard";
import WeatherForecast from "@/components/Weatherforecast";


export default function Home() {
  const [data, setdata] = useState([]);
  const [search, setsearch] = useState("London");
  const [chartData, setChartData] = useState([]);
  const[forecast,setforcast]=useState([])
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  // const searchparam = useSearchParams();
  // const username = searchparam.get();

  //
const weather = data?.list?.[0]?.weather?.[0];
  const iconUrl = weather?.icon
    ? `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
    : null;
  

  const getData = async () => {
    if (!search || search.trim() === "") {
      console.warn("City name is empty.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast`,
        {
          params: {
            q: search,
            appid: apiKey,
            units: "metric",
          },
        }
      );
      if (response.status === 200 && response.data) {
        setdata(response.data);
        console.log(response.data);
        console.log(getCityLocalTime(data));
        
      }
       setsearch("");
  const radial = response.data.list.map((item) => ({
  time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  rain: Math.round((item.pop || 0) * 100), // Probability of precipitation as percentage
  humidity: item.main.humidity,
  pressure: Math.round(item.main.pressure / 10), // Normalize to 0-100 scale (1000-1100 hPa → 0-100)
}));
setWeatherData(radial);
     const dailyForecasts = response.data.list.reduce((acc, item) => {
  const date = new Date(item.dt * 1000).toLocaleDateString();
  if (!acc[date]) acc[date] = item;
  return acc;
}, {});

const allDays = Object.values(dailyForecasts).slice(0, 8).map((item, index) => ({
  day: index === 0 
    ? 'Today' 
    : new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
  date: new Date(item.dt * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
  temp: Math.round(item.main.temp),
  icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
  condition: item.weather[0].description
}));

setforcast(allDays);
console.log('Today + 7 Days Data:', allDays);

      const list = response.data.list;
      const grouped = {
        Morning: [],
        Afternoon: [],
        Evening: [],
        Night: [],
      };

      list.forEach((item) => {
        const hour = new Date(item.dt_txt).getHours();
        const temp = item.main.temp;

        if (hour >= 6 && hour < 12) grouped.Morning.push(temp);
        else if (hour >= 12 && hour < 17) grouped.Afternoon.push(temp);
        else if (hour >= 17 && hour < 21) grouped.Evening.push(temp);
        else grouped.Night.push(temp);
      });

      const avg = (arr) =>
        arr.length
          ? Number((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1))
          : null;

      const formatted = [
        { time: "Morning", temp: avg(grouped.Morning) },
        { time: "Afternoon", temp: avg(grouped.Afternoon) },
        { time: "Evening", temp: avg(grouped.Evening) },
        { time: "Night", temp: avg(grouped.Night) },
      ].filter((d) => d.temp !== null);

      setChartData(formatted);
     
    } catch (error) {
      console.log(
        "Error fetching weather data:",
        error?.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };
 

  useEffect(() => {
    if (search.trim()) {
      getData();
    }
  }, [search]);

  // time
   const getCityLocalTime = (data) =>
    data?.city?.timezone
      ? format(
          new Date(
            Date.now() +
              data.city.timezone * 1000 -
              new Date().getTimezoneOffset() * 60000
          ),
          "hh:mm a"
        )
      : "Time not available";

//rain

//
  const city = data?.city?.name;
  const country = data?.city?.country;
  const temp =
    data?.list?.[0]?.main?.temp != null
      ? Math.round(data.list[0].main.temp)
      : null;
// wind speed -
const windSpeedMs = data?.list?.[0]?.wind?.speed;
const windSpeedKmh = data?.list?.[0]?.wind?.speed 
  ? (data.list[0].wind.speed * 3.6).toFixed(1) 
  : null;
  const dt = 1753358400; // example Unix timestamp in seconds
  const date = new Date(dt * 1000); // convert to milliseconds
  // const formatted = format(date, "EEEE/dd/yyyy");
  
  //
  const todayForecast = data?.list?.[0];
  const todayDate = todayForecast?.dt
    ? new Date(todayForecast.dt * 1000)
    : null;

  const formattedDate =
    todayDate instanceof Date && !isNaN(todayDate)
      ? format(todayDate, "dd MMM yyyy")
      : "Loading date...";

  // const formattedTime = todayDate
  //   ? format(todayDate, "h:mm a")
  //   : "Loading time...";

  // radal
  const latest = weatherData[0] || { rain: 0, humidity: 0, pressure: 0 };


  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen w-full p-3 gap-8 justify-items-center">
      <Navbar
        setsearch={setsearch}
        citydata={city}
        temp={temp}
        country={country}
      />
      {/* Navbar */}
      <div className="main w-full flex flex-col sm:flex-row justify- gap-6 ">
        {/* Left Section */}
        <div className="left w-full sm:w-[60%] flex flex-col gap-6">
          {/* Weather Info */}
          <div className="box1 min-w-[40vw] min-h-[40vh]  p-6 bg-[#1A1A40] rounded-xl shadow-lg text-white">
            <div className="weather-info mt-6 ">
              <div className="flex gap-4 items-center">
                <span className="text-4xl">
                  {" "}
                  {iconUrl ? (
                    <img src={iconUrl} className="w-16 h-16" />
                  ) : (
                    <span className="text-4xl">⛅</span>
                  )}
                </span>
                <h1 className="text-5xl font-semibold">
                  {" "}
                  {temp}
                  °C
                </h1>
              </div>
              <h2 className="mt-2 text-xl font-bold text-white tracking-wide">
                {data.city && data.city.name},{country}
              </h2>
              <span className="text-white text-sm font-bold tracking-wide text-left block">
                Feels like:{" "}
                {data?.list?.[0]?.main?.feels_like != null
                  ? Math.round(data.list[0].main.feels_like)
                  : "NA"}
                °C
              </span>

              <div className="box2 float-right top-0 -mt-[15vh]  text-white  p-4 w-full max-w-sm ">
                {/* Temperature Chart */}
                <div className="w-full h-40">
                  <TempChart data={chartData} />
                </div>

                
 {/* Horizontal rule */}
<hr className="border-gray-600 mt-10 w-full" />

{/* Container for the 3 items */}
<div className="flex justify-around text-center text-md pt-15">
  {/* Item 1 */}
  <div className="flex flex-col items-center">
    <span className="text-lg">🌧️</span>
    <p >{Math.round(data?.list?.[0]?.main?.pressure)} hPa</p>
  </div>

  {/* Item 2 */}
  <div className="flex flex-col items-center">
    <span className="text-lg">🌊</span>
    <p>{data?.list?.[0]?.main?.humidity}%</p>
  </div>

  {/* Item 3 */}
  <div className="flex flex-col items-center">
    <span className="text-lg">💨</span>
    <p>{windSpeedKmh} km/h</p>
  </div>
</div>

                {/* Footer: Pressure, Humidity, Wind */} 
              </div>

              <hr className="my-4 w-[40%]" />
              <div>
                <p>{formattedDate}</p>
                <p>{data ? getCityLocalTime(data) : "Loading..."}</p>
              </div>
            </div>

            <div className="box2 mt-6">
              <div className="text-white text-sm flex justify-between w-[250px] max-w-sm">
                <div className="inline-flex items-center space-x-1 text-md font-bold text-white tracking-normal">
                  <span>min temp:</span>
                  <span className="text-lg">↓</span>
                  <span>
                    {Math.round(data?.list?.[0]?.main?.temp_min ?? 0)}°C
                  </span>
                </div>

                <div className="inline-flex items-center space-x-1 text-md font-bold text-white">
                  <span>max temp:</span>
                  <span className="text-lg">↑</span>
                  <span>
                    {Math.round(data?.list?.[0]?.main?.temp_max ?? 0)}°C
                  </span>
                </div>
              </div>

              <hr className="my-4 w-[40%] " />
            </div>
          </div>

          {/* UV Index Cards 1 */}
         <div className="flex flex-wrap items-center justify-between gap-4 w-full max-w-7xl mx-auto p-4">
  <WindChart windSpeed={windSpeedKmh} />
  <AnimatedRadialProgress 
    value={latest.rain} 
    label="Rain chance" 
    level={latest.rain > 50 ? "High" : "Low"}
    duration={1000} 
  />

  <AnimatedRadialProgress 
    value={latest.humidity} 
    label="Humidity" 
    level={latest.humidity > 70 ? "High" : "Normal"}
    duration={1000} 
  />

  <AnimatedRadialProgress 
    value={latest.pressure} 
    label="Pressure" 
    level={latest.pressure > 1013 ? "High" : "Low"}
    duration={1000} 
  />
</div>
        </div>
        {/* Right Section: Carousel */}
        {/* <div className="right sm:w-[40%] w-full mt-6 sm:mt-0 ">
        
        </div> */}
        <div className=" rounded-md right1 w-[40vw] bg-[#0b0f2f] h-full">
          <h1 className="text-center text-lg font-semibold"> This week</h1>
          <Carousel data={data} temp={temp}  />
           <WeatherForecast weatherData={forecast}/>
        </div>
       
      </div>
    </div>
  );
}
