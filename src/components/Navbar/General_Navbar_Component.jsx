import RUTAS from '../../helpers/RutasHelpers';
import { NavLink, Navigate } from 'react-router-dom';
import { LogoutServices } from '../../services/LogoutServices';
import useAuth from '../../helpers/auth/useAuth';
import ImagesComponents from '../ImagesComponents';
import Logo from "../../images/male_avatar.svg"
import { Container, Navbar, Card } from 'react-bootstrap';
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
            < Navbar className="bg-body-tertiary bg_fondo" >
                <Container>
                    <Navbar.Brand href="home">
                        <Card.Img variant="top" src={Logo} style={{ width: '3rem' }} />
                        {/* <ImagesComponents src={Logo} style={{ width: '3rem' }} className="logoNav" href={RUTAS.login} /> */}
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        {/* style, nombreClase, redirec, sitio */}
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
                        {
                            (tieneRol("admin") || tieneRol("super_admin")) && (
                                <>
                                    <NavegacionNav
                                        style={customStyle}
                                        nombreClase="links"
                                        redirec="admin"
                                        sitio="Adminstración"
                                    />

                                    {
                                        tieneRol("super_admin") && (
                                            <NavegacionNav
                                                style={customStyle}
                                                nombreClase="links"
                                                redirec="superAdmin"
                                                sitio="Super Administrador"
                                            />
                                        )
                                    }
                                </>
                            )
                        }
                        <NavegacionNav
                            style={customStyle}
                            nombreClase="links"
                            redirec="galeria"
                            sitio="Galeria"
                        />
                        <Navbar.Text style={{ marginRight: '1.5rem' }}>
                            <NavLink className="links" exact to="" onClick={cerrarSesion}>Cerra Sesion</NavLink>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </>
    )
}

export default General_Navbar_Component
