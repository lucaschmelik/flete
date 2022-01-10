import { Container, Navbar, Nav } from 'react-bootstrap'

export default function Header() {
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src="/logoNuevo.png"
                        width="65"
                        height="70"
                        className="d-inline-block align-top"
                    />{' '}
                </Navbar.Brand>
                <Nav className="me-auto" >
                    
                    <Nav.Link href="/">Hoy</Nav.Link>
                    <Nav.Link href="/calendario">Calendario</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}