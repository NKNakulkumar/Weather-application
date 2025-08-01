import React, { useEffect, useState } from 'react';

const AnimatedRadialProgress = ({ value, duration = 1000 }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = () => {
      start += 1;
      if (start <= value) {
        setAnimatedValue(start);
        setTimeout(step, duration / value);
      }
    };
    step();
  }, [value, duration]);

  return (
    <div
      className="radial-progress bg-primary text-primary-content border-primary border-4 transition-all duration-300"
      style={
        {
          '--value': animatedValue,
          '--size': '5rem',
          '--thickness': '8px',
        } 
      }
      role="progressbar"
      aria-valuenow={animatedValue}
    >
      {animatedValue}%
    </div>
  );
};

export default AnimatedRadialProgress;
