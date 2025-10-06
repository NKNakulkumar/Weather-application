import React, { useRef } from 'react';

const Carousel = ({data }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -150 : 150,
        behavior: 'smooth',
      });
    }
  };

const formatTime = (unixTimestamp) => {
  if (!unixTimestamp) return "";
  return new Date(unixTimestamp * 1000)
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase(); // Capitalize AM/PM
};


  return (
    <div className="bg-[#0b0f2f] text-white p-4 rounded-md w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          <button onClick={() => scroll('left')} className="btn btn-sm btn-circle bg-[#1a1d3a] text-white border-none hover:bg-[#2a2d4a]">❮</button>
           <button
    onClick={() => scroll('right')}
   className="btn btn-sm btn-circle absolute mr-10fggfvvfgededfvrfgbbnerfghgerfgerfg sm:mr-14 right-0 bg-[#1a1d3a] text-white border-none hover:bg-[#2a2d4a]"

  >
    ❯
  </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
      >
        
        {data?.list?.length > 0 && data.list.map((item, index) => {
  const iconUrl = item.weather?.[0]?.icon 
    ? `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` 
    : null;

  return (
    <div
      key={index}
      className="flex flex-col items-center justify-center w-24 h-32 bg-[#1a1d3a] rounded-lg shadow-md p-2 shrink-0"
    >
      <span className="text-sm mb-2">{formatTime(item.dt)}</span>
      <span className="text-3xl mb-2">
        {iconUrl ? <img src={iconUrl} alt="icon" className="w-16 h-16" /> : <span className="text-4xl">⛅</span>}
      </span>
      <span className="text-sm">{Math.round(item.main?.temp ?? 0)}°C</span>
    </div>
  );
})}

      </div>
    </div>
  );
};

export default Carousel;
