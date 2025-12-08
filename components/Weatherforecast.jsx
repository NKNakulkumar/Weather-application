export default function WeatherForecast({ weatherData }) {
  // Handle empty or invalid data
  
  if (!weatherData || weatherData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-white text-center">
          <p className="text-xl">No weather data available</p>
          <p className="text-slate-400 mt-2">Please search for a city</p>
        </div>
      </div>
    );
  }

  return (
   <div className="  bg-[#0b0f2f] flex items-center justify-center p-4">
  <div className="w-full max-w-sm relative">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
    <div className="relative bg-[#1b1e3c] backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-white/10">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white mb-1 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text ">
          Weather Forecast
        </h2>
        <p className="text-slate-400 text-xs">Next {weatherData.length} days outlook</p>
      </div>

      {/* Weather cards */}
      <div className="space-y-2">
        {weatherData.map((item, index) => (
          <div
            key={index}
            className="group relative bg-gradient-to-r from-slate-700/40 to-slate-800/40 hover:from-slate-700/60 hover:to-slate-800/60 rounded-xl p-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-white/5 hover:border-white/10"
          >
            
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-xl transition-all duration-300"></div>
            
            <div className="relative flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-white text-sm font-semibold tracking-wide">{item.day || 'N/A'}</span>
                <span className="text-slate-400 text-xs font-medium">{item.date || 'N/A'}</span>
                <span className="text-blue-300 text-xs capitalize">{item.condition || 'N/A'}</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-white text-2xl font-bold bg-gradient-to-br from-white to-slate-300 bg-clip-text ">
                    {item.temp ?? 'N/A'}°
                  </span>
                  <span className="text-slate-400 text-sm ml-1">C</span>
                </div>
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon ? (
                    <img src={item.icon} alt={item.condition} className="w-12 h-12" />
                  ) : (
                    <span className="text-4xl">⛅</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

     
      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
        <span>Updated just now</span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Live
        </span>
      </div>
    </div>
  </div>
</div>
  );
}