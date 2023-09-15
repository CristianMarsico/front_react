import React from 'react'
import RUTAS from '../helpers/RutasHelpers'
import { Outlet, NavLink } from 'react-router-dom'
// import '../css/linksNavegacion.css'


const LayoutAdministracion = () => {

    return (
        <>
            {/* <div className="help-layout"> */}
            <nav className="layout">
                <NavLink to={RUTAS.listaMP}>Materia Prima</NavLink>
                <NavLink to={RUTAS.listaProductos}>Producto Terminado</NavLink>
                <NavLink to={RUTAS.listaUsuarios}>Usuarios</NavLink>
                <NavLink to={RUTAS.listaCompras}>Compras</NavLink>
            </nav>
            <Outlet />
            {/* </div> */}
        </>
    )
}

export default LayoutAdministracion