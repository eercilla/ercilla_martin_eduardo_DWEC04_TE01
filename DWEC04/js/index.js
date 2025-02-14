document.addEventListener('DOMContentLoaded', function() {

    // Contenedor donde se van a ir añadiendo los eventos
    const eventosContainer = document.getElementById('eventos');

    let eventosArray = [];


    const siguienteButton = document.getElementById('siguiente');
    const anteriorButton = document.getElementById('anterior');


    // Obtenemos la URL para conseguir el número de páginas y el número de elementos pasados
    const urlParams = new URLSearchParams(window.location.search);

    let currentPage=1;
    var cantidad=20;


    // Si se han introducido en la url el número de elementos y la página
    if(urlParams.get('_page') && urlParams.get('_elements')){
        currentPage = urlParams.get('_page');

        cantidad = urlParams.get('_elements');
    } else{ //Sino. Por defecto (index.html)
        currentPage = 1;
        cantidad = 20;
    }
  
    // Carga la lista de eventos en función de la cantidad elegida en la consulta (por defecto 20) y la página (por defecto 1)
    function obtenerEventos(pagina) {

     var url = `https://api.euskadi.eus/culture/events/v1.0/events?_elements=${cantidad}&_page=${pagina}`;

      return new Promise(function(resolve, reject) {
        $.ajax({
          url: url
        })
        .done(function(data) {
          console.log("Done");
          resolve(data);
        })
        .fail(function(xhr, status, error) {
          console.log(`Error: ${error}, Status: ${status}, readyState: ${xhr.readyState}`);
          reject(xhr);
        })
        .always(function() {
          console.log("Petición completada");
        });
      });
    }
  

    function mostrarEventos(eventos) {
   
        // Desaparece el gif de 'Cargando' cuando se muestran los eventos
        document.querySelector(".cargando").style.display="none";
      
        // Para cada evento
        eventos.forEach(eventoData => {

            // Creamos el evento y le añadimos una class
            const eventoDiv = document.createElement('div');
            eventoDiv.classList.add('evento');

            // Rellemanos el elemento (nombre, imagen, fecha, hora). Fecha con la forma: día/mes/año
            eventoDiv.innerHTML = `
                <h2>${eventoData.nombre}</h2>
                <a href="./views/evento.html?id=${eventoData.id}"><img class="evento-imagen" src="${eventoData.imagenUrl}" alt="${eventoData.imagenAlt}"></a>
                <div class="bloque-fecha">
                    <p><strong>Fecha:</strong> ${eventoData.fecha.toLocaleDateString()}</p>
                    <p><strong>Hora:</strong> ${eventoData.hora}</p>
                </div>`;

            // Añadimos el evento al bloque de elementos
            eventosContainer.appendChild(eventoDiv);
      });
    }
    

    // Llamamos a la función que obtiene los eventos en función del número de página
    obtenerEventos(currentPage)
    .then(function(data){

        // Obtenemos el array de evento de data.items obteniendo por cada elemento un objeto Evento
        const eventos = data.items.map(item => Evento.fromApiResponse(item)); 
        eventosArray = eventos; // Lo guardamos en una variable de clase para que esté accesible después
        mostrarEventos(eventos);
    })
    .catch(function(err){ // Si sucede algún error en la carga
        console.log(err);
    });

      // Forma y características del gráfico
      function createChart(dataPoints) {
        const chart = new CanvasJS.Chart("chartContainer", {
          // No se genera de forma brusca
          animationEnabled: true,
          theme: "light2",
          title: {
            text: "Precios de Eventos por Fecha"
          },
          axisX: {
            title: "Fecha",
            valueFormatString: "DD MMM YYYY"
          },
          axisY: {
            title: "Precio (€)",
            includeZero: false
          },
          data: [{ 
            type: "scatter", // Gráfica con puntos 
            xValueFormatString: "DD MMM YYYY",
            yValueFormatString: "€#,##0.00",
            markerSize: 20, // Tamaño del punto


            dataPoints: dataPoints, // Array de elementos
            toolTipContent: "{name}: {x} ({y}€)"
          }]
        });
        // Genera el gráfico
        chart.render();
      }

    // Actualiza los datos del gráfico (o lo genera en caso de ser la primera llamada)
    function actualizarChart() {

      // Obtenemos los años que queremos que muestre
      const startYear = parseInt(document.getElementById('startYear').value);
      const endYear = parseInt(document.getElementById('endYear').value);

      // console.log(eventos);
  
      // Devuelve un array de eventos filtrado por los años que estén entre los dos introducidos
      const filteredEvents = eventosArray.filter(evento => {
        const year = new Date(evento.fecha).getFullYear();
        console.log(evento.fecha);
        console.log(new Date(evento.fecha).getFullYear());
        return year >= startYear && year <= endYear;
      });

  
      // Mapeamos el array filtrado por años
      const dataPoints = filteredEvents.map(evento => {

        // Si el evento contiene un precio en la BD (existe) y no es "Gratis"
        if(evento.precio!="Gratis"){

          // Quitamos el símbolo € y la , y convertimos a float
          precio = parseFloat(evento.precio.replace(' €', '').replace(',', '.'));
          
          // Forma que va a tener cada elemento del datapoints
          return {
            x: new Date(evento.fecha),
            y: precio,
            name: evento.nombre,
            click: function() { // Función para cada evento mostrado. Nos redirige a la página del evento.
              window.location.href = `./views/evento.html?id=${evento.id}`;
              
            }
          };
        }else{ // No contiene precio o es "Gratis"
          return {
            x: new Date(evento.fecha),
            y: 0, // 0€
            name: evento.nombre,
            click: function() {
              window.location.href = `./views/evento.html?id=${evento.id}`;
            
            }
          }
        }
      });

      // Creamos el gráfico con los datapoints enviados.
      createChart(dataPoints);
    
  };

  // Botón siguiente 
  siguienteButton.addEventListener('click', function() {
    currentPage++;

    const newUrl = `index.html?_elements=${cantidad}&_page=${currentPage}`;
    window.location.href = newUrl; 
  });

  if(currentPage==1){
    $('#anterior').hide();
  }else{
    $('#anterior').show();
  }

  // Botón anterior 
  anteriorButton.addEventListener('click', function() {
    currentPage--;

    const newUrl = `index.html?_elements=${cantidad}&_page=${currentPage}`;
    window.location.href = newUrl; 
  });

  // Botón para mostrar la gráfica
  document.getElementById('actualizarChart').addEventListener('click', actualizarChart);

  // Botones para cambiar la cantidad de eventos por página
  const pocos = document.getElementById('pocos');
  const medio = document.getElementById('medio');
  const muchos = document.getElementById('muchos');

  // Botón "Pocos" eventos
  pocos.addEventListener('click', function() {
    cantidad=20;
    const newUrl = `index.html?_elements=${cantidad}&_page=${currentPage}`;
    window.location.href = newUrl; 
  });

    // Botón para una cantidad media de eventos
  medio.addEventListener('click', function() {
    cantidad=40;
    const newUrl = `index.html?_elements=${cantidad}&_page=${currentPage}`;
    window.location.href = newUrl; 
  });

  // Botón "Muchos" eventos
  muchos.addEventListener('click', function() {
    cantidad=60;
    const newUrl = `index.html?_elements=${cantidad}&_page=${currentPage}`;
    window.location.href = newUrl; 
  });
});

