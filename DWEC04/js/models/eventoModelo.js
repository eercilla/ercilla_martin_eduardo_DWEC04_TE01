class Evento {
    constructor(id, nombre, imagenUrl, imagenAlt, fecha, hora, precio, descripcion, tipo, lugar, direccion, sourceUrl) {
        this.id = id;
        this.nombre = nombre;
        this.imagenUrl = imagenUrl;
        this.imagenAlt = imagenAlt;
        this.fecha = fecha;
        this.hora = hora;
        this.precio = precio;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.lugar = lugar;
        this.direccion = direccion;
        this.sourceUrl = sourceUrl;
    }

    // Recoge la respuesta de la api y crea una instancia de Evento.
    static fromApiResponse(apiResponse) {
        return new Evento(
            apiResponse.id,
            apiResponse.nameEs,
            // Si data.item.images existe y tiene al menos una imagen data.item.images[0] muestra imageUrl. De lo contrario, una imagen genérica.
            apiResponse.images && apiResponse.images[0] ? apiResponse.images[0].imageUrl : '../img/evento.jpg',
            apiResponse.images && apiResponse.images[0] ? apiResponse.images[0].imageFileName : 'evento-genérico',
            new Date(apiResponse.startDate),
            apiResponse.openingHoursEs || 'Consultar',
            apiResponse.priceEs || 'Gratis',
            apiResponse.descriptionEs || '',
            apiResponse.typeEs || '',
            apiResponse.establishmentEs || 'Consultar',
            apiResponse.municipalityEs || '',
            apiResponse.sourceUrlEs || ''
        );
    }
}