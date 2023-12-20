const url = 'https://apis.datos.gob.ar/georef/api/provincias'
fetch(url)
  .then(response => response.json())
  .then(data => {
    window.localStorage.setItem('provincias', JSON.stringify(data.provincias))
    // Traemos los datos desde el local storage parseandolos para convertir JSON --> JS
    const datosProvincias = JSON.parse(window.localStorage.getItem('provincias'))

    if (datosProvincias.length > 0) {
      const gridProvincias = document.querySelector('#grid-provincias')
      datosProvincias.forEach((provincia) => {
        // 1- creamos un elemento <div> para cada provincia
        const gridItem = document.createElement('article')
        // 2- agregar la clase grid-item para darle estilo
        gridItem.classList.add('grid-item')
        // 3- agregamos un h4 con el texto de la provincia
        gridItem.innerHTML = `<h4>${provincia.nombre}</h4>`
        // 4- funcionalidad para cuando le hagamos click al elemento
        gridItem.addEventListener('click', () =>
          mostrarDetallesProvincia(provincia.id)
        )
        // 5- agregamos el elemento creado al nodo ya existente
        gridProvincias.appendChild(gridItem)
      })
    }
  })

function mostrarDetallesProvincia (id) {
  // Redireccionar a otra pagina para mostrar los detalles
  window.location.href = `provincia.html?id=${id}`
}
