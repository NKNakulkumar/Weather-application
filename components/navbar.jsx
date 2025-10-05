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
  <div className="modes">
  <label className="toggle text-base-content">
  <input type="checkbox" value="synthwave" className="theme-controller" />

  <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>

  <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>

</label>
  </div>
</div>

  )
}

export default Navbar

// 
