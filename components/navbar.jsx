"use client"
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
const Navbar = ({setsearch, citydata,country, temp}) => {
 const [input, setInput] = useState("");

  const handleSearch = () => {
    if (input.trim()) {
      setsearch(input.trim());
      setInput("");
    }
  };
  return (

    <div className="sticky top-0 w-full flex justify-center items-center p-1 gap-8 z-50 shadow-sm">
  <h1 className="text-md font-bold text-white gap-2 flex items-center"><IoLocationSharp /> {citydata},{country} {temp} °C</h1>
  <div className="relative">
  <input
  type="text"
          placeholder="Enter City"
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
    className="p-2 pr-10 rounded-lg border-2 text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-transparent"
  />
  <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" />
</div>
  
</div>

  )
}

export default Navbar

// 
