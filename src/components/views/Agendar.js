import React, { useState } from 'react'
import { Row, Button, Form, Container, Col } from 'react-bootstrap'
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import 'moment/locale/es-mx';
import locale from 'antd/es/date-picker/locale/es_ES';
import { useForm, Controller } from "react-hook-form";
import Axios from 'axios';
import Global from '../utils/global';

export default function Agendar() {

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const [date, setDate] = useState({
        dia: null,
        status: false
    });

    const [rangoHorario, setRangoHorario] = useState("7 a 10hs");

    function onChangeDate(date, dateString) {
        setDate({
            dia: date,
            status: true
        });
    }

    function onChangeRangoHorario(value) {
        setRangoHorario(value.target.value)
    }

    const [isVisibleControlHorario, setIsVisibleControlHorario] = useState(true)

    const [isVisiblecontrolHorarioEspecial, setIsVisibleControlHorarioEspecial] = useState(false)

    const MostrarOcultarRangoEspecial = () => {
        setIsVisibleControlHorario(!isVisibleControlHorario)
        setIsVisibleControlHorarioEspecial(!isVisiblecontrolHorarioEspecial)
    }

    function validarDatePicker(){
        if (!date.status) {
            setDate({
                dia: null,
                status: true
            })
            return true
        }
    }

    function validarRangoHorario(datos){

        if(isVisibleControlHorario) return rangoHorario

        return datos.RangoHorarioEspecial
    }

    const GuardarViaje = (datos) => {

        var horario = validarRangoHorario(datos).split(" ")

        if(validarDatePicker()) return

        Axios.post(Global.urlViajes, {
            horarioDesde: parseInt(horario[0]),
            horarioHasta: parseInt(horario[horario.length - 1].replace("hs", "")),
            barrio: datos.Barrio,
            direccion: datos.Direccion,
            recibe: datos.NombreRecibe,
            envia: datos.NombreEnvia,
            telefono: datos.Telefono,
            fechaEntrega: date.dia,
            observaciones: datos.Observaciones
        }).then(response => { alert(`Se guardo el viaje número ${response.data.id}`) })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit(data => {
                GuardarViaje(data)
            })}>
                <Row className="mb-3">
                    <Col>
                        <Form.Group >
                            <Form.Label>Nombre recibe(*)</Form.Label>
                            <Form.Control {...register("NombreRecibe", { required: "El nombre de la persona que recibe es obligatorio." })} placeholder="Ingrese el nombre de la persona que recibe" />
                        </Form.Group>
                        <Form.Label style={{ color: "red" }}>{errors.NombreRecibe?.message}</Form.Label>
                    </Col>
                    <Col>
                        <Form.Group >
                            <Form.Label>Nombre envía(*)</Form.Label>
                            <Form.Control {...register("NombreEnvia", { required: "El nombre de la persona que envía es obligatorio." })} placeholder="Ingrese el nombre de la persona que envía" />
                        </Form.Group>
                        <Form.Label style={{ color: "red" }}>{errors.NombreEnvia?.message}</Form.Label>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group >
                            <Form.Label>Barrio(*)</Form.Label>
                            <Controller
                                name="Barrio"
                                control={control}
                                rules={{ required: "El nombre del barrio es obligatorio." }}
                                render={({ field }) => <Form.Select
                                    {...field}>
                                    <option>Elegir barrio...</option>
                                    <option>Devoto</option>
                                    <option>Santos Lugares</option>
                                    <option>Barracas</option>
                                    <option>Chacarita</option>
                                </Form.Select>
                                }
                            />
                        </Form.Group>
                        <Form.Label style={{ color: "red" }}>{errors.Barrio?.message}</Form.Label>
                    </Col>
                    <Col>
                        <Form.Group >
                            <Form.Label >Dirección(*)</Form.Label>
                            <Form.Control {...register("Direccion", { required: "La dirección es obligatoria." })} placeholder="Ingrese la dirección con altura y departamento" />
                        </Form.Group>
                        <Form.Label style={{ color: "red" }}>{errors.Direccion?.message}</Form.Label>
                    </Col>
                    <Col>
                        <Form.Group >
                            <Form.Label >Fecha(*)</Form.Label><br></br>
                            <DatePicker name="dtFecha" locale={locale} format="DD-MM-YYYY" size="large" style={{ width: 200 }} onChange={onChangeDate} />
                        </Form.Group>
                        {
                            date.status && date.dia == null && <Form.Label style={{ color: "red" }}>La fecha es obligatoria.</Form.Label>
                        }
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group >
                            <Form.Label>Teléfono(*)</Form.Label>
                            <Form.Control {...register("Telefono", { required: "El teléfono es obligatorio." })} type='number' placeholder="Ingrese el teléfono de quien recibe" />
                        </Form.Group>
                        <Form.Label style={{ color: "red" }}>{errors.Telefono?.message}</Form.Label>
                    </Col>
                    <Col>
                        <Form.Group >
                            <Form.Label>Rango horario(*)</Form.Label>
                            {isVisibleControlHorario &&
                                <Form.Select onChange={onChangeRangoHorario}>
                                    <option>7 a 10hs</option>
                                    <option>8 a 11hs</option>
                                    <option>11 a 14hs</option>
                                    <option>14 a 17hs</option>
                                </Form.Select>}
                            {isVisiblecontrolHorarioEspecial &&
                                <Form.Control {...register("RangoHorarioEspecial", { required: false })} placeholder="Ingrese el rango horario especial. Formato: 10 a 14hs" />}
                            <Form.Check type="checkbox" label="Rango especial" onClick={() => MostrarOcultarRangoEspecial()} />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label>Observaciones</Form.Label>
                    <Form.Control {...register("Observaciones", { required: false })} as="textarea" rows={3} />
                </Form.Group>
                <Row>
                </Row>
                <br></br>
                <Button variant="primary" type="submit">Guardar</Button>
            </Form>
        </Container>
    )
}

