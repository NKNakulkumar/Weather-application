import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';



export default function TempChart({data}) {
  return (
    <div className="w-[28vw] -ml-[6vw] h-74 sm:h-64 p-4 sm:p-6 lg:p-8 rounded-xltext-white">
      <h2 className="text-xl font-bold text-white tracking-wide">Temperature</h2>
      <ResponsiveContainer  width="100%" height="100%" className="pl-6">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 30, bottom: 10}}
        >
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            stroke="#ccc"
            tickMargin={10}
            interval={0} // Ensure all labels show
          />
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
