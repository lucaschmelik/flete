import { Container, Navbar, Nav } from 'react-bootstrap'

export default function Header(){
    return(
        <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src="/logoNuevo.png"
                            width="60"
                            height="60"
                            className="d-inline-block align-top"
                        />{' '}
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Inicio</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
    )
}