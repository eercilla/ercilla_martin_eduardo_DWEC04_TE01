document.addEventListener('DOMContentLoaded', function() {

  // Obtenemos el section y el contenedor donde vamos a colocar las dos zonas del evento
  var mainContainer = $(".container-evento");
  const eventoContainer = document.getElementById('detalle-evento');

    // Obtenemos el id pasado en la URL después del ?
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    // Accedemos al elemento del id pasado en la URL
    const url = `https://api.euskadi.eus/culture/events/v1.0/events/${eventId}`;
  
    function obtenerUnEvento() {
      fetch(url)
        .then(response => response.json())
        .then(data => {

            // Creamos el evento con la info recibida desde data
            const evento = Evento.fromApiResponse(data);
            mostrarDetalleEvento(evento);
        })
        .catch(error => {
          console.error('Error al obtener el evento:', error);
        });
    }
  
    function mostrarDetalleEvento(evento) {

      // Se añade el nombre del evento al inicio del section
      $(mainContainer).prepend("<h1 class='text-titulo'>"+evento.nombre+"</h2>");

      // Creamos el contenedor para el lado izquierdo de la web
      let htmlContent = `
      <div class="izq">
          <img class="evento-imagen" src="${evento.imagenUrl}" alt="${evento.imagenAlt}">`;

      if (evento.descripcion) { // Si tiene descripción en la bd
        htmlContent += `
        <h2 class="descripción">Descripción</h2>
        <p>${evento.descripcion}</p></div>`;
      } else{ // Si no tiene descripción ponemos el tipo de evento
        htmlContent += `
        <p>${evento.tipo}</p></div>`;

      }

      // Añadimos el contenido de la zona izquierda a la web
      eventoContainer.innerHTML = htmlContent;

      
      // Creamos el contenedor y el contenido para el lado derecho de la web y lo añadimos en una sola asignación
      eventoContainer.innerHTML += `<div class="der">

        <h1 class="titulo-evento">${evento.nombre}</h2>
        
        <p><strong>Fecha:</strong> ${new Date(evento.fecha).toLocaleDateString()}</p>
        <p><strong>Hora:</strong> ${evento.hora}</p>
        <p><strong>Precio:</strong> ${evento.precio}</p>
        <p><strong>Lugar:</strong> ${evento.lugar}</p>
        <p><strong>Dirección:</strong> ${evento.direccion}</p>
        <a href="${evento.sourceUrl}" target="_blank">Más información</a></div>`;
    }

    // Botón para regresar a la página desde la que se llamó
    document.getElementById("volver").addEventListener("click", function() {
      window.history.back();
    });
  
    obtenerUnEvento();
    
  });