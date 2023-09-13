import React from 'react'
import RUTAS from '../helpers/RutasHelpers'
import { Outlet, NavLink } from 'react-router-dom'
// import '../css/linksNavegacion.css'


const LayoutAdministracion = () => {

    return (
        <>
            {/* <div className="help-layout"> */}
            <nav className="layout">
                <NavLink to={RUTAS.listaMP}>Lista Materia Prima</NavLink>
                <NavLink to={RUTAS.listaProductos}>Lista Productos</NavLink>
                <NavLink to={RUTAS.listaUsuarios}>Lista Usuarios</NavLink>
                <NavLink to={RUTAS.listaCompras}>Lista De Compras</NavLink>
            </nav>
            <Outlet />
            {/* </div> */}
        </>
    )
}

export default LayoutAdministracion