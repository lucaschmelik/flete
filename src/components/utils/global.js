const HOST = `https://localhost:7036/api`;

export const ApiViajes = {
    urlViajes: `${HOST}/viajes`,
    urlViajesPorFecha: `${HOST}/viajes/fecha`,
    urlViajesPendientesPorFecha: `${HOST}/viajes/pendientes`,
    urlViajesCompletadosPorFecha: `${HOST}/viajes/completados`,
    urlViajeCompletado: `${HOST}/viajes/entregado`,
    urlViajeDeshacer: `${HOST}/viajes/deshacer`,
    urlViajeOrden: `${HOST}/viajes/orden`,
    urlViajeCalendario: `${HOST}/viajes/Calendario`
}

export const ApiLocalidades = {
    urlLocalidadesGBA: `${HOST}/localidades`
}