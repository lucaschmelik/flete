import React, { useState, useEffect } from 'react'
import { Table, Button, Accordion } from 'react-bootstrap'
import { ArrowDown, ArrowReturnLeft, ArrowUp, Check } from "react-bootstrap-icons";
import moment from 'moment'
import Global from '../utils/global';
import Axios from 'axios';

export default function Hoy() {
    
    useEffect (() => {
        Axios.get(Global.urlViajes)
        .then(res => {
            listarOrden(res.data)
            setViajes({
                datos: res.data,
                status: true
            })
        })         
    }, [])

    const [viajes, setViajes] = useState({
        datos: [],
        orden: '',
        horario: '',
        barrio: '',
        dirección: '',
        recibe: '',
        envia: '',
        telefono: 0,
        completado: '',
        status: false
    })

    const [viajesCompletados, setViajesCompletados] = useState({
        datos: [],
        orden: '',
        horario: '',
        barrio: '',
        dirección: '',
        recibe: '',
        envia: '',
        telefono: 0,
        completado: ''
    })

    const bajarViaje = (ordenViaje) => {
        const orden = ordenViaje
        var listaViajes = viajes.datos
        listaViajes.forEach((viaje, index) => {
            if (viaje.orden === orden + 1) {
                listaViajes[index].orden = orden
                listaViajes[index - 1].orden = viaje.orden + 1
            }
        }
        )

        listaViajes.sort((x, y) => x.orden - y.orden)

        setViajes({
            ...viajes,
            datos: listaViajes
        })
    }

    const subirViaje = (ordenViaje) => {
        debugger
        if(ordenViaje === 1) return
        const orden = ordenViaje
        var listaViajes = viajes.datos
        listaViajes.forEach((viaje, index) => {
            if (viaje.orden === orden) {
                listaViajes[index].orden = viaje.orden - 1
                listaViajes[index - 1].orden = orden
            }
        }
        )

        listaViajes.sort((x, y) => x.orden - y.orden)

        setViajes({
            ...viajes,
            datos: listaViajes
        })
    }

    const completarViaje = (index) => {
        var listaViajes = viajes.datos
        var viaje = listaViajes[index]
        viaje.completado = new Date()
        viajesCompletados.datos.push(viaje)
        listaViajes.splice(index, 1)

        listarOrden(viajes.datos)

        setViajes({
            ...viajes,
            datos: listaViajes
        })

        setViajesCompletados({
            ...viajesCompletados,
        })
    }

    const deshacerViaje = (index) => {
        var listaViajesCompletados = viajesCompletados.datos
        var viaje = listaViajesCompletados[index]
        viajes.datos.push(viaje)
        listaViajesCompletados.splice(index, 1)

        listarOrden(viajes.datos)

        setViajesCompletados({
            ...viajesCompletados,
            datos: listaViajesCompletados
        })

        setViajes({
            ...viajes,
        })
    }

    const listarOrden = (lista) => {
        var contador = 1
        lista.forEach((viaje) => {
            viaje.orden = contador++
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
                                { viajes.status &&
                                    viajes.datos.map((viaje, index) => (
                                        <tr >
                                            <td>{viaje.orden}</td>
                                            <td>{viaje.horario}</td>
                                            <td>{viaje.barrio}</td>
                                            <td>{viaje.dirección}</td>
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
                                {
                                    viajesCompletados.datos.map((viaje, index) => (
                                        <tr >
                                            <td>{moment(viaje.completado).format('DD/MM HH:mm') }</td>
                                            <td>{viaje.horario}</td>
                                            <td>{viaje.barrio}</td>
                                            <td>{viaje.dirección}</td>
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