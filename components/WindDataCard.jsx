import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import { useEffect, useState } from "react";

export default function WindChart({ windSpeed }) {
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
  
    if (typeof windSpeed === "number" || typeof windSpeed === "string") {
      const speed = parseFloat(windSpeed) || 0;
      setCurrentSpeed(speed);

      // Generate dynamic curve based on wind speed
      const baseValues = [8, 12, 15, 11, 14, 18, 16, 12, 14, 10];
      const scaledData = baseValues.map((val) => ({
        value: Math.round(val * (speed / 12)), // Scale based on current speed
      }));
      setDisplayData(scaledData);
    } else if (windSpeed?.list) {
      const speeds = windSpeed.list.slice(0, 10).map((item) => ({
        value: item.wind?.speed
          ? parseFloat((item.wind.speed * 3.6).toFixed(1))
          : 0,
        time: new Date(item.dt * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

      if (speeds.length > 0) {
        setDisplayData(speeds);
        setCurrentSpeed(speeds[0]?.value || 0);
      }
    }
  }, [windSpeed]);

  // Fallback data if nothing provided
  const chartData =
    displayData.length > 0
      ? displayData
      : [
          { value: 8 },
          { value: 12 },
          { value: 15 },
          { value: 11 },
          { value: 14 },
          { value: 18 },
          { value: 16 },
          { value: 12 },
        ];

  // Dynamic animation speed based on wind speed
  const animationSpeed =
    currentSpeed > 0 ? Math.max(1, 4 - currentSpeed / 10) : 3;

  const CustomTooltip = ({ active, payload }) => {
   if (active && payload?.[0]) {
      return (
        <div className="bg-slate-900/95 backdrop-blur-md px-3 py-2 rounded-lg border border-purple-500/50 shadow-2xl">
          <p className="text-purple-200 font-bold text-xs sm:text-sm">
            {payload[0].value} km/h
          </p>
          {payload[0].payload.time && (
            <p className="text-slate-400 text-xs mt-1">
              {payload[0].payload.time}
            </p>
          )}
        </div>
      );
    }
    return null;
  };
  return (
    <div className="w-full max-w-md mx-auto transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-4  shadow-2xl border border-slate-700/50 overflow-hidden">
        <div className="absolute inset-0 opacity-33">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/25 to-transparent"
            style={{
              animation: `flowBg 3.5s ${animationSpeed}s ease-in-out infinite`,
            }}
          ></div>
        </div>

        <style jsx>{`
          @keyframes flowBg {
            0%,
            100% {
              transform: translateX(-100%) skewX(-12deg);
            }
            50% {
              transform: translateX(100%) skewX(-12deg);
            }
          }
        `}</style>

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white tracking-wide">Wind</h2>
          </div>

          <div className="h-35 -mx-2 relative overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 15, right: 15, left: 15, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9333ea" stopOpacity={0.6} />
                    <stop offset="50%" stopColor="#7c3aed" stopOpacity={1} />
                    <stop offset="100%" stopColor="#6b21a8" stopOpacity={0} />
                  </linearGradient>

                  <linearGradient
                    id="strokeFlow"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#4c1d95">
                      <animate
                        attributeName="stop-color"
                        values="#4c1d95;#7c3aed;#c084fc;#7c3aed;#4c1d95"
                        dur={`${animationSpeed}s`}
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="50%" stopColor="#c084fc">
                      <animate
                        attributeName="offset"
                        values="0.5;0.75;1;0.25;0.5"
                        dur={`${animationSpeed}s`}
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="100%" stopColor="#4c1d95">
                      <animate
                        attributeName="stop-color"
                        values="#4c1d95;#7c3aed;#c084fc;#7c3aed;#4c1d95"
                        dur={`${animationSpeed}s`}
                        repeatCount="indefinite"
                      />
                    </stop>
                  </linearGradient>

                  <filter id="strongGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <Tooltip content={<CustomTooltip />} cursor={false} />

                <Area
                  type="natural"
                  dataKey="value"
                  stroke="url(#strokeFlow)"
                  strokeWidth={4}
                  fill="url(#windGradient)"
                  filter="url(#strongGlow)"
                  isAnimationActive={true}
                  animationDuration={2000}
                  animationEasing="ease-in-out"
                  dot={false}
                  activeDot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold bg-gradient-to-br from-purple-300 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
              {currentSpeed}
            </span>
            <span className="text-purple-300 text-md font-semibold">km/h</span>
          </div>

          <p className="text-slate-400 text-sm mt-2 font-medium">
            Current wind speed
          </p>
        </div>
      </div>
    </div>
  );
}
