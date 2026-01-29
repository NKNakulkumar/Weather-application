import React, { useEffect, useState } from 'react';

const AnimatedRadialProgress = ({ value = 0, label = "Progress", level = "Low", duration = 1000   }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setAnimatedValue(value);
        clearInterval(timer);
      } else {
        setAnimatedValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, duration]);

 
  const getMetricInfo = (label) => {
    switch (label.toLowerCase()) {
      case 'rain chance':
        return {
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />,
          unit: '%',
          color: 'from-blue-400 via-blue-300 to-white'
        };
      case 'humidity':
        return {
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />,
          unit: '%',
          color: 'from-teal-400 via-teal-300 to-white'
        };
      case 'pressure':
        return {
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />,
          unit: 'hPa',
          color: 'from-purple-400 via-purple-300 to-white'
        };
      default:
        return {
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />,
          unit: '%',
          color: 'from-purple-400 via-purple-300 to-white'
        };
    }
  };

  const circumference = 2 * Math.PI * 45;
  const progress = (animatedValue / 100) * circumference;
  const metricInfo = getMetricInfo(label);

  return (
  <div className="w-full max-w-md mx-auto transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
  <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-2xl p-5 sm:p-8 shadow-2xl border border-slate-700/50">
    {/* Header */}
    <div className="flex items-center justify-between mb-4 sm:mb-8">
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4 sm:w-7 sm:h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {metricInfo.icon}
        </svg>
        <span className="text-white font-medium text-base sm:text-lg">{label}</span>
      </div>
      <span className="text-slate-400 text-base sm:text-lg font-medium">{level}</span>
    </div>

        {/* Radial Progress */}
        <div className="flex justify-center mt-10 ">
          <div className="relative w-26 h-24 sm:w-36 sm:h-33">
        
            <div className="absolute inset-0  bg-purple-600/10 rounded-full blur-xl"></div>
            
        
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <defs>
             
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6b21a8" />
                  <stop offset="50%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
                
            
                <filter id="sharpGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feComposite in="coloredBlur" in2="SourceAlpha" operator="in" result="clipped"/>
                  <feMerge>
                    <feMergeNode in="clipped"/>
                    <feMergeNode in="clipped"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#1e293b"
                strokeWidth="6"
              />
              
              
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="10"
                strokeLinecap="butt"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                filter="url(#sharpGlow)"
                className="transition-all duration-1000 ease-out"
              />
              
              
              <circle
                cx="50"
                cy="50"
                r="39"
                fill="none"
                stroke="#000"
                strokeWidth="1"
                opacity="0.3"
              />
            </svg>
            {/* Percentage text */}
             <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-2xl font-bold bg-gradient-to-br ${metricInfo.color} bg-clip-text text-transparent drop-shadow-lg`}>
                {animatedValue}{metricInfo.unit}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedRadialProgress;