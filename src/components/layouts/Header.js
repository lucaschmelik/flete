import { Container, Navbar, Nav } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Hoy from '../views/Hoy';
import Calendario from '../views/Calendario';
import Agendar from '../views/Agendar';
import Footer from './Footer';

export default function Header() {
    return (
        <Router>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src="/logoNuevo.png"
                            width="80"
                            height="100"
                            className="d-inline-block align-top"
                        />{' '}
                    </Navbar.Brand>
                    <Nav className="me-auto" >
                        <Nav.Link href="/">Hoy</Nav.Link>
                        <Nav.Link href="/calendario">Calendario</Nav.Link >
                        <Nav.Link href="/agendar">Agendar</Nav.Link >
                    </Nav>
                </Container>
            </Navbar>
            <br></br>
            <Switch>
                <Route path="/calendario">
                    <Calendario />
                </Route>
                <Route path="/agendar">
                    <Agendar />
                </Route>
                <Route path="/">
                    <Hoy />
                </Route>
            </Switch>
        </Router>
    )
}