import React, { useState, useEffect } from 'react'
import { Table, Button, Accordion } from 'react-bootstrap'
import { ArrowDown, ArrowReturnLeft, ArrowUp, Check } from "react-bootstrap-icons";
import moment from 'moment'
import Global from '../utils/global';
import Axios from 'axios';

export default function Hoy() {

    useEffect(() => {
        actualizarViajesPendientes()
        actualizarViajesCompletados()
    }, [])

    const [viajes, setViajes] = useState({
        datos: [],
        id: 0,
        orden: '',
        horarioDesde: '',
        horarioHasta: '',
        barrio: '',
        direccion: '',
        recibe: '',
        envia: '',
        telefono: 0,
        completado: '',
    })

    const [viajesCompletados, setViajesCompletados] = useState({
        datos: [],
        id: 0,
        orden: '',
        horarioDesde: '',
        horarioHasta: '',
        barrio: '',
        direccion: '',
        recibe: '',
        envia: '',
        telefono: 0,
        completado: ''
    })

    const bajarViaje = async (ordenViaje) => {
        var listaViajes = viajes.datos
        var contador = 0
        for (const viaje of listaViajes) {
            if (viaje.orden === ordenViaje + 1) {
                await Axios.put(Global.urlViajeOrden, `id=${listaViajes[contador].id}&ordenNuevo=${ordenViaje}`)
                    .catch(error => {
                        alert(error.response.data);
                    });

                await Axios.put(Global.urlViajeOrden, `id=${listaViajes[contador - 1].id}&ordenNuevo=${ordenViaje + 1}`)
                    .catch(error => {
                        alert(error.response.data);
                    })
            }
            contador = contador + 1
        }
        actualizarViajesPendientes()
    }

    const subirViaje = async (ordenViaje) => {
        if (ordenViaje === 1) return
        var listaViajes = viajes.datos
        var contador = 0
        for (const viaje of listaViajes) {
            if (viaje.orden === ordenViaje) {
                await Axios.put(Global.urlViajeOrden, `id=${listaViajes[contador].id}&ordenNuevo=${ordenViaje - 1}`)
                    .catch(error => {
                        alert(error.response.data);
                    });

                await Axios.put(Global.urlViajeOrden, `id=${listaViajes[contador - 1].id}&ordenNuevo=${ordenViaje}`)
                    .catch(error => {
                        alert(error.response.data);
                    })
            }
            contador = contador + 1
        }
        actualizarViajesPendientes()
    }

    const completarViaje = async (index) => {
        var viaje = viajes.datos[index]
        viaje.completado = new Date()

        await Axios.put(Global.urlViajeCompletado, `id=${viaje.id}&completado=${viaje.completado.toJSON()}`)
            .catch(error => {
                alert(error.response.data)
            })

        actualizarViajesPendientes()
        actualizarViajesCompletados()
    }

    const deshacerViaje = async (index) => {
        var viaje = viajesCompletados.datos[index]

        await Axios.put(Global.urlViajeDeshacer, `id=${viaje.id}`)
            .catch(error => {
                alert(error.response.data)
            })

        actualizarViajesPendientes()
        actualizarViajesCompletados()
    }

    const listarOrden = (lista) => {
        var contador = 1
        lista.forEach(viaje => {
            viaje.orden = contador++
        })
    }

    const actualizarViajesPendientes = () => {
        Axios.get(Global.urlViajesPendientesPorFecha, { params: { fecha: new Date() } })
            .then(res => {
                listarOrden(res.data)
                setViajes({
                    datos: res.data
                })
            })
    }

    const actualizarViajesCompletados = () => {
        Axios.get(Global.urlViajesCompletadosPorFecha, { params: { fecha: new Date() } })
            .then(res => {
                setViajesCompletados({
                    datos: res.data
                })
            })
    }

    return (
        <>
            <br></br>
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>VIAJES PENDIENTES</Accordion.Header>
                    <Accordion.Body>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Orden</th>
                                    <th>Horario</th>
                                    <th>Barrio</th>
                                    <th>Dirección</th>
                                    <th>Recibe</th>
                                    <th>Envía</th>
                                    <th>Teléfono</th>
                                    <th>Entregado</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viajes.datos.map((viaje, index) => (
                                    <tr >
                                        <td>{viaje.orden}</td>
                                        <td>{`${viaje.horarioDesde} a ${viaje.horarioHasta}hs`}</td>
                                        <td>{viaje.barrio}</td>
                                        <td>{viaje.direccion}</td>
                                        <td>{viaje.recibe}</td>
                                        <td>{viaje.envia}</td>
                                        <td>{viaje.telefono}</td>
                                        <td><Button>
                                            <Check variant="flat" onClick={() => completarViaje(index)} />
                                        </Button></td>
                                        <td>
                                            <Button size="lg" variant="flat" onClick={() => bajarViaje(viaje.orden)}>
                                                <ArrowDown />
                                            </Button>
                                            <Button size="lg" variant="flat" onClick={() => subirViaje(viaje.orden)}>
                                                <ArrowUp />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </Table>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>VIAJES COMPLETADOS</Accordion.Header>
                    <Accordion.Body>
                        <Table >
                            <thead>
                                <tr>
                                    <th>Completado</th>
                                    <th>Horario</th>
                                    <th>Barrio</th>
                                    <th>Dirección</th>
                                    <th>Recibe</th>
                                    <th>Envía</th>
                                    <th>Teléfono</th>
                                    <th>Rehacer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viajesCompletados.datos.map((viaje, index) => (
                                    <tr >
                                        <td>{moment(viaje.completado).format('DD/MM HH:mm')}</td>
                                        <td>{`${viaje.horarioDesde} a ${viaje.horarioHasta}hs`}</td>
                                        <td>{viaje.barrio}</td>
                                        <td>{viaje.direccion}</td>
                                        <td>{viaje.recibe}</td>
                                        <td>{viaje.envia}</td>
                                        <td>{viaje.telefono}</td>
                                        <td><Button>
                                            <ArrowReturnLeft variant="flat" onClick={() => deshacerViaje(index)} />
                                        </Button></td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </Table>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}