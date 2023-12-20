// obtenemos el ID de la provincia desde la url
const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.has('id') ? urlParams.get('id') : 0

// Obtenemos los datos de las provincias desde el localStorage
const provincias = JSON.parse(window.localStorage.getItem('provincias'))

// Buscamos la provincia por ID
const provincia = provincias.find((p) => p.id === id)

if (provincia) {
  // seleccionamos el contenedor de donde agregamos el hijo
  const container = document.querySelector('.detalle-provincia')
  // Mostramos los detalles de la provincia
  const detallesProvincia = document.createElement('div')
  detallesProvincia.innerHTML = `
    <h2>${provincia.nombre}</h2>
    <p>ID: ${provincia.id}</p>
    <p>Latitud: ${provincia.centroide.lat}</p>
    <p>Longitud: ${provincia.centroide.lon}</p>
    <div id="map" style="width: 100%; height: 300px;"></div>
    `
  container.appendChild(detallesProvincia)

  // Crea un mapa de Leaflet
  const map = L.map('map').setView(
    [provincia.centroide.lat, provincia.centroide.lon],
    10 // Ajusta el nivel de zoom según tus preferencias
  )

  // Agrega un mapa base (puedes usar diferentes proveedores de mapas base)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

  // Agrega un marcador en la ubicación de la provincia
  L.marker([
    provincia.centroide.lat,
    provincia.centroide.lon
  ])
    .addTo(map)
    .bindPopup(provincia.nombre)
} else {
  document.write('<p> Provincia no encontrada </p>')
}
