import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: 'Morning', temp: 20 },
  { time: 'Afternoon', temp: 32 },
  { time: 'Evening', temp: 25 },
  { time: 'Night', temp: 28 },
];

export default function TempChart() {
  return (
    <div className="w-full h-64 bg-[#1A1A40] p-4 rounded-xl text-white">
      <h2 className="text-lg mb-2">Temperature</h2>
      <ResponsiveContainer width="90%" height="90%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="time" stroke="#ccc" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorTemp)"
            dot={{ stroke: '#fff', strokeWidth: 2, r: 4 }}
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
