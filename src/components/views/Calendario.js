import React, { useState } from 'react'
import 'antd/dist/antd.css';
import '../css/index.css';
import { Calendar, Badge } from 'antd';
import locale from 'antd/es/date-picker/locale/es_ES';
import { Container, Button, Table } from 'react-bootstrap'
import { Trash } from "react-bootstrap-icons";

export default function Calendario() {

    const datosTruchos = [
        {
            horario: "9 a 12hs", barrio: "Santos Lugares", dirección: "Av La Plata 190", recibe: "Juana", envia: "Luis", telefono: 1130647755, estado: "Entregado"
        },
        {
            horario: "12 a 15hs", barrio: "Devoto", dirección: "Carbone 1676", recibe: "Pedro", envia: "Marta", telefono: 1130647755, estado: "Entregado"
        }
    ];

    const [isVisibleCalendario, setIsVisibleCalendario] = useState(true)

    const [isVisibleBotonSiguiente, setIsVisibleBotonSiguiente] = useState(true)

    const [isVisibleBotonAtras, setIsVisibleBotonAtras] = useState(false)

    const [viajes, setViajes] = useState({
        datos: [],
        horario: '',
        barrio: '',
        dirección: '',
        recibe: '',
        envia: '',
        telefono: 0,
        estado: '',
        visible: false
    })

    function ocultarControlCalendario() {
        setIsVisibleCalendario(false)
        setIsVisibleBotonSiguiente(false)
        setIsVisibleBotonAtras(true)
        setViajes({
            ...viajes,
            visible: true,
            datos: datosTruchos
        }
        )
    }

    function mostrarControlCalendario() {
        setIsVisibleCalendario(true)
        setIsVisibleBotonSiguiente(true)
        setIsVisibleBotonAtras(false)
        setViajes({
            ...viajes,
            visible: false
        }
        )
    }

    function getListData(value) {
        let listData;
        switch (value.date()) {
            case 7:
                listData = [
                    { type: 'success', content: '4 viajes completados' }
                ];
                break;
            case 8:
                listData = [
                    { type: 'success', content: '2 viajes completados' },
                ];
                break;
            case 10:
                listData = [
                    { type: 'success', content: '8 viajes completados' }
                ];
                break;
            case 15:
                listData = [
                    { type: 'warning', content: '4 viajes pendientes' }
                ];
                break;

            default:
        }
        return listData || [];
    }

    function onPanelChange(value, mode) {
        console.log(value.format('YYYY-MM-DD'), mode);
    }

    function dateCellRender(value) {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    }

    function onSelect(date) {
        console.log(date.format('YYYY-MM-DD'));
    }

    function EliminarViaje(index) {
        var listaViajes = viajes.datos
        listaViajes.splice(index, 1)

        setViajes({
            ...viajes,
            datos: listaViajes
        })
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
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            viajes.datos.map((viaje, index) => (
                                <tr >
                                    <td>{viaje.horario}</td>
                                    <td>{viaje.barrio}</td>
                                    <td>{viaje.dirección}</td>
                                    <td>{viaje.recibe}</td>
                                    <td>{viaje.envia}</td>
                                    <td>{viaje.telefono}</td>
                                    <td>{viaje.estado}</td>
                                    <td>
                                        <Button size="md" onClick={ () => EliminarViaje(index)} >
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
