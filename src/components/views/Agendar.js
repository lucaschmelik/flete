import React, { useState } from 'react'
import { Row, Button, Form, Container, Col } from 'react-bootstrap'
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import 'moment/locale/es-mx';
import locale from 'antd/es/date-picker/locale/es_ES';

export default function Agendar() {

    const [date, setDate] = useState(new Date());

    function onChange(date, dateString) {
        setDate(date);
    }

    const [isVisibleControlHorario, setIsVisibleControlHorario] = useState(true)

    const [isVisiblecontrolHorarioEspecial, setIsVisibleControlHorarioEspecial] = useState(false)

    const MostrarOcultarRangoEspecial = () => {
        setIsVisibleControlHorario(!isVisibleControlHorario)
        setIsVisibleControlHorarioEspecial(!isVisiblecontrolHorarioEspecial)
    }

    return (
        <Container>
            <Form>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formGridNombreRecibe">
                            <Form.Label>Nombre recibe</Form.Label>
                            <Form.Control placeholder="Ingrese el nombre de la persona que recibe" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formGridNombreEnvia">
                            <Form.Label>Nombre envía</Form.Label>
                            <Form.Control placeholder="Ingrese el nombre de la persona que envía" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formGridBarrio">
                            <Form.Label>Barrio</Form.Label>
                            <Form.Select defaultValue="Elegir barrio...">
                                <option>Elegir barrio...</option>
                                <option>Devoto</option>
                                <option>Santos Lugares</option>
                                <option>Barracas</option>
                                <option>Chacarita</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formGridDireccion">
                            <Form.Label >Dirección</Form.Label>
                            <Form.Control placeholder="Ingrese la dirección con altura y departamento" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formGridFecha">
                            <Form.Label >Fecha</Form.Label><br></br>
                                <DatePicker locale={locale} format="DD-MM-YYYY" size="large" style={ {width:200}} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formGridtelefono">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control type='number' placeholder="Ingrese el teléfono de quien recibe" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formGridHorario">
                            <Form.Label>Rango horario</Form.Label>
                            {isVisibleControlHorario && 
                            <Form.Select  controlId="formGridHorario">
                                <option>7 a 10hs</option>
                                <option>8 a 11hs</option>
                                <option>11 a 14hs</option>
                                <option>14 a 17hs</option>
                            </Form.Select>}
                            {isVisiblecontrolHorarioEspecial && 
                            <Form.Control placeholder="Ingrese el rango horario especial" />}                            
                            <Form.Check type="checkbox" label="Rango especial" onClick={ () => MostrarOcultarRangoEspecial()} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                </Row>
                <br></br>
                <Button variant="primary" type="submit">Guardar</Button>
            </Form>
        </Container>
    )
}

