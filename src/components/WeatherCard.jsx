// WeatherCard will display weather data from the weather API
// Props will be passed in once the API is integrated
function WeatherCard({ data }) {
  if (!data) return null

  return (
    <div>
      <p>{data.condition}</p>
      <p>{data.time}</p>
      <p>{data.temperature}</p>
    </div>
  )
}

export default WeatherCard
