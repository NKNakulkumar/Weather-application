import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';



export default function TempChart({data}) {
  return (
    <div className="w-full max-w-md mx-auto h-64 sm:h-72 lg:h-80 p-4 sm:p-6 rounded-xl text-white">
  <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide mb-2">
    Temperature
  </h2>
  <ResponsiveContainer width="100%" height="90%">
    <AreaChart
      data={data}
      margin={{ top: 10, right: 15, left: 25, bottom: 10 }}
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
        interval={0}
        tick={{ fontSize: 12 }}
        fontWeight={600}
      />
      <Tooltip 
        contentStyle={{
          backgroundColor: '#1a1a40',
          border: 'none',
          borderRadius: '8px',
          color: '#fff'
        }}
      />
      <Area
        type="monotone"
        dataKey="temp"
        stroke="#8884d8"
        strokeWidth={2}
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
