import { Table, Button, Container, Navbar, Nav, Form } from 'react-bootstrap'
import { ArrowDown, ArrowUp } from "react-bootstrap-icons";

export default function Main() {
    return (
        <>
            <Container>
                <br />
                <Table >
                    <thead>
                        <tr>
                            <th>Orden</th>
                            <th>Barrio</th>
                            <th>Dirección</th>
                            <th>Recibe</th>
                            <th>Entregado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Santos Lugares</td>
                            <td>Av La Plata 190</td>
                            <td>Juana</td>
                            <td><Form>
                                <Form.Check aria-label="option 1" />
                            </Form></td>
                            <td>
                                <Button size="lg" variant="flat">
                                    <ArrowDown />
                                </Button>
                                <Button size="lg" variant="flat">
                                    <ArrowUp />
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Devoto</td>
                            <td>Carbone 1676</td>
                            <td>Pedro</td>
                            <td><Form>
                                <Form.Check aria-label="option 1" />
                            </Form></td>
                            <td>
                                <Button size="lg" variant="flat">
                                    <ArrowDown />
                                </Button>
                                <Button size="lg" variant="flat">
                                    <ArrowUp />
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>La Plata</td>
                            <td>Siempre Vida 1112</td>
                            <td>Felipe</td>
                            <td><Form>
                                <Form.Check aria-label="option 1" />
                            </Form></td>
                            <td>
                                <Button size="lg" variant="flat">
                                    <ArrowDown />
                                </Button>
                                <Button size="lg" variant="flat">
                                    <ArrowUp />
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Button variant="secondary" style={{ float: 'right' }} >Nuevo viaje</Button>
                <br /><br />
            </Container>

        </>
    );
}