































// UrbanDataLayers will display urban layer toggles (Roads, Parks, Education, Food)
// Data will come from the urbanData API
function UrbanDataLayers({ layers }) {
  if (!layers) return null

  return (
    <div>
      {layers.map((layer) => (
        <label key={layer}>
          <input type="checkbox" /> {layer}
        </label>
      ))}
    </div>
  )
}

export default UrbanDataLayers
