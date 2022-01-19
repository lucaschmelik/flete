import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import '../css/index.css';
import { Calendar, Badge } from 'antd';
import locale from 'antd/es/date-picker/locale/es_ES';
import { Container, Button, Table } from 'react-bootstrap';
import { Trash } from "react-bootstrap-icons";
import Global from '../utils/global';
import Axios from 'axios';

export default function Calendario() {

    const [isVisibleCalendario, setIsVisibleCalendario] = useState(true)

    const [isVisibleBotonSiguiente, setIsVisibleBotonSiguiente] = useState(true)

    const [isVisibleBotonAtras, setIsVisibleBotonAtras] = useState(false)

    const [diaCalendario, setDiaCalendario] = useState({
        datos: []
    })

    useEffect(async () => {
        await actualizarViajesCalendario()
    }, [])

    const [viajes, setViajes] = useState({
        datos: [],
        horario: '',
        barrio: '',
        direccion: '',
        recibe: '',
        envia: '',
        telefono: 0,
        visible: false,
        completado: '',
        fechaSeleccionada: new Date(),
        observaciones: ''
    })

    function ocultarControlCalendario() {
        setIsVisibleCalendario(false)
        setIsVisibleBotonSiguiente(false)
        setIsVisibleBotonAtras(true)
        traerViajesPorFecha()
    }

    const traerViajesPorFecha = () => {
        Axios.get(Global.urlViajesPorFecha, { params: { fecha: viajes.fechaSeleccionada } })
            .then(res => {
                setViajes({
                    ...viajes,
                    datos: res.data,
                    visible: true
                })
            })
    }

    async function mostrarControlCalendario() {
        setIsVisibleCalendario(true)
        setIsVisibleBotonSiguiente(true)
        setIsVisibleBotonAtras(false)
        setViajes({
            ...viajes,
            visible: false,
            fechaSeleccionada: new Date()
        }
        )
        await actualizarViajesCalendario()
    }

    function onPanelChange(value, mode) {
        console.log(value.format('YYYY-MM-DD'), mode);
    }

    function onSelect(date) {
        setViajes({
            ...viajes,
            fechaSeleccionada: date.format('YYYY-MM-DD')
        })
    }

    async function EliminarViaje(index) {
        await Axios.delete(`${Global.urlViajes}/${viajes.datos[index].id}`)
        traerViajesPorFecha()
    }

    async function actualizarViajesCalendario() {
        await Axios.get(Global.urlViajeCalendario, { params: { fecha: new Date() } })
            .then(res => {
                setDiaCalendario({
                    ...diaCalendario,
                    datos: res.data
                })
            });
    }

    function obtenerDiaCalendario(dia, mes){
        var diaCalendarioEncontrado = []
        diaCalendario.datos.forEach(element => {
            if(element.NumeroDia === dia && element.NumeroMes === mes + 1){
                diaCalendarioEncontrado = element
            }
        }); 

        return diaCalendarioEncontrado
    }

    function dateCellRender(value) {

        var diaCalendarioEncontrado = obtenerDiaCalendario(value.date(), value.month())

        return (
          <ul className="events">
            { diaCalendarioEncontrado.Status 
            && diaCalendarioEncontrado.Items.map(item => (
              <li key={item.content}>
                <Badge status={item.type} text={item.content} />
              </li>
            ))}
          </ul>
        );
      }

    return (
        <Container>
            {isVisibleCalendario && <Calendar onPanelChange={onPanelChange} dateCellRender={dateCellRender} locale={locale} onSelect={onSelect} />}
            {viajes.visible &&
                <Table >
                    <thead>
                        <tr>
                            <th>Horario</th>
                            <th>Barrio</th>
                            <th>Dirección</th>
                            <th>Recibe</th>
                            <th>Envía</th>
                            <th>Teléfono</th>
                            <th>Estado</th>
                            <th>Observaciones</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            viajes.datos.map((viaje, index) => (
                                <tr >
                                    <td>{`${viaje.horarioDesde} a ${viaje.horarioHasta}hs`}</td>
                                    <td>{viaje.barrio}</td>
                                    <td>{viaje.direccion}</td>
                                    <td>{viaje.recibe}</td>
                                    <td>{viaje.envia}</td>
                                    <td>{viaje.telefono}</td>
                                    <td>{viaje.observaciones}</td>
                                    <td>{viaje.completado === null ? "Pendiente" : "Entregado"}</td>
                                    <td>
                                        <Button size="md" onClick={() => EliminarViaje(index)} >
                                            <Trash />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>}
            {isVisibleBotonSiguiente &&
                <Button variant="primary" type="submit" style={{ float: 'right' }} onClick={() => ocultarControlCalendario()}>Siguiente</Button>
            }
            {isVisibleBotonAtras &&
                <Button variant="primary" type="submit" style={{ float: 'right' }} onClick={() => mostrarControlCalendario()}>Atrás</Button>
            }
        </Container>
    );
}
