import React from 'react'
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

/**
 * Componente que representa un elemento de navegación en una barra de navegación.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.style - Estilos personalizados para el elemento de navegación.
 * @param {string} props.nombreClase - Nombre de la clase CSS para el elemento de navegación.
 * @param {string} props.redirec - Ruta de redirección cuando se hace clic en el elemento de navegación.
 * @param {string} props.sitio - Texto que se muestra en el elemento de navegación.
 * @returns {JSX.Element} Elemento de navegación en la barra de navegación.
 */
const NavegacionNav = ({ style, nombreClase, redirec, sitio }) => {
    return (
        <Navbar.Text style={style}>
            <NavLink className={nombreClase} to={redirec}>{sitio}</NavLink>
        </Navbar.Text>
    )
}

export default NavegacionNav