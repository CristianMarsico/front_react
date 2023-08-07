import RUTAS from '../../helpers/RutasHelpers';
import { NavLink, Navigate, Link } from 'react-router-dom';
import { LogoutServices } from '../../services/LogoutServices';
import useAuth from '../../helpers/auth/useAuth';
import ImagesComponents from '../ImagesComponents';
import Logo from "../../images/logo.svg"
import { Container, Navbar, Card, NavDropdown, Nav } from 'react-bootstrap';
import NavegacionNav from './componentes_internos/NavegacionNav';


const General_Navbar_Component = () => {
    let { tieneRol, deleteUserLocal } = useAuth();

    const cerrarSesion = async () => {
        await LogoutServices();
        deleteUserLocal();
        return <Navigate to={RUTAS.login} />
    }

    const customStyle = { marginRight: '1.5rem' };

    return (
        <>
            < Navbar expand="sm" className="bg-body-tertiary bg_fondo" style={{ backgroundColor: 'red' }}>
                <Container>
                    <Navbar.Brand href="home">
                        <Card.Img variant="top" src={Logo} style={{ width: '7rem' }} />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <NavegacionNav

                                style={customStyle}
                                nombreClase="links"
                                redirec="home"
                                sitio="Home"
                            />

                            <NavegacionNav
                                style={customStyle}
                                nombreClase="links"
                                redirec="help"
                                sitio="Help"
                            />
                            <>
                                {
                                    tieneRol("super_admin") && (
                                        <NavegacionNav
                                            style={customStyle}
                                            nombreClase="links"
                                            redirec="superAdmin"
                                            sitio="Fomularios"
                                        />

                                    )
                                }
                            </>
                            <NavegacionNav
                                style={customStyle}
                                nombreClase="links"
                                redirec="administracion"
                                sitio="Administración"
                            />

                            <NavegacionNav
                                style={customStyle}
                                nombreClase="links"
                                redirec="galeria"
                                sitio="Galeria"
                            />
                            <NavDropdown title="Menu" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.2">
                                    <Navbar.Text>
                                        <NavegacionNav
                                            style={customStyle}
                                            nombreClase="links"
                                            redirec="perfil"
                                            sitio="Mi Perfil"
                                        />
                                    </Navbar.Text>
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    <Navbar.Text>
                                        <NavLink className="links" to="" onClick={cerrarSesion}>Cerrar Sesion</NavLink>
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
