import React, { useRef } from 'react';

const weatherData = [
  { time: "Now", temp: "4° C", icon: "☀️" },
  { time: "12pm", temp: "3° C", icon: "🌤️" },
  { time: "12pm", temp: "3° C", icon: "☁️" },
  { time: "12pm", temp: "3° C", icon: "🌧️" },
  { time: "3pm", temp: "2° C", icon: "🌦️" },
  { time: "6pm", temp: "1° C", icon: "🌙" },
];

const Carousel = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -150 : 150,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="bg-[#0b0f2f] text-white p-4 rounded-md w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          <button onClick={() => scroll('left')} className="btn btn-sm btn-circle bg-[#1a1d3a] text-white border-none hover:bg-[#2a2d4a]">❮</button>
           <button
    onClick={() => scroll('right')}
    className="btn btn-sm btn-circle absolute mr-8 right-0 bg-[#1a1d3a] text-white border-none hover:bg-[#2a2d4a]"
  >
    ❯
  </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
      >
        {weatherData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-24 h-32 bg-[#1a1d3a] rounded-lg shadow-md p-2 shrink-0"
          >
            <span className="text-sm mb-2">{item.time}</span>
            <span className="text-3xl mb-2">{item.icon}</span>
            <span className="text-sm">{item.temp}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
