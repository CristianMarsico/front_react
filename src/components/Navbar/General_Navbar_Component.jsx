import RUTAS from '../../helpers/RutasHelpers';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { LogoutServices } from '../../services/LogoutServices';
import useAuth from '../../helpers/auth/useAuth';
import Logo from "../../images/logo.svg"
import { Container, Navbar, Card, Nav } from 'react-bootstrap';
import NavegacionNav from './componentes_internos/NavegacionNav';

/**
 * Componente que representa la barra de navegación general.
 *
 * @returns {JSX.Element} Barra de navegación general.
 */
const General_Navbar_Component = () => {
    let { tieneRol, deleteUserLocal } = useAuth();
    let navigate = useNavigate();

    /**
     * Cierra la sesión del usuario.
     */
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

                                <Navbar.Text style={customStyle}>
                                    <NavLink className="links" to="" onClick={cerrarSesion}>Cerrar Sesión</NavLink>
                                </Navbar.Text>
                            </>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </>
    )
}

export default General_Navbar_Component
