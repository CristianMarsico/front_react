import RUTAS from '../../helpers/RutasHelpers';
import { Link, useNavigate } from 'react-router-dom';
import { LogoutServices } from '../../services/LogoutServices';
import useAuth from '../../helpers/auth/useAuth';
import Logo from "../../images/logo.svg"
import { Container, Navbar, Card, NavDropdown, Nav } from 'react-bootstrap';
import NavegacionNav from './componentes_internos/NavegacionNav';


const General_Navbar_Component = () => {
    let { tieneRol, deleteUserLocal } = useAuth();
    let navigate = useNavigate();

    const cerrarSesion = async () => {
        await LogoutServices();
        deleteUserLocal();
        navigate(RUTAS.login)
    }

    const customStyle = { marginRight: '1.5rem' };

    return (
        <>
            < Navbar expand="sm" className="bg-body-tertiary bg_fondo" style={{ backgroundColor: 'red' }}>
                <Container>
                    <Navbar.Brand href={RUTAS.administracion}>
                        <Card.Img variant="top" src={Logo} style={{ width: '7rem' }} />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>

                            <>
                                {
                                    (tieneRol("super_admin") || tieneRol("admin")) && (

                                        <NavegacionNav
                                            style={customStyle}
                                            nombreClase="links"
                                            redirec={RUTAS.administracion}
                                            sitio="Administración"
                                        />

                                    )
                                }
                            </>

                            <NavDropdown title="Menu" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to={RUTAS.perfil}>
                                    <Navbar.Text>
                                        <span className="links">Mi Perfil</span>
                                    </Navbar.Text>
                                </NavDropdown.Item>

                                <NavDropdown.Item href="#action/3.2">
                                    <Navbar.Text onClick={cerrarSesion}>
                                        <span className="links">Cerrar Sesion</span>
                                    </Navbar.Text>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </>
    )
}

export default General_Navbar_Component
