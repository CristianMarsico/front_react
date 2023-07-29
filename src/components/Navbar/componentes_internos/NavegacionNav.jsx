import React from 'react'
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavegacionNav = ({ style, nombreClase, redirec, sitio }) => {
    const isExactMatch = true;
    return (
        <Navbar.Text style={style}>
            <NavLink className={nombreClase} exact={isExactMatch} to={redirec}>{sitio}</NavLink>
        </Navbar.Text>
    )
}

export default NavegacionNav