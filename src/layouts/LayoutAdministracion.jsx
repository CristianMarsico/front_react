import React from 'react'
import RUTAS from '../helpers/RutasHelpers'
import { Outlet, NavLink } from 'react-router-dom'

const LayoutAdministracion = () => {

    return (
        <>
            {/* <div className="help-layout"> */}
            <nav className="layout">
                <NavLink to={RUTAS.listaMP}>Materia Prima</NavLink>
                <NavLink to={RUTAS.listaCompras}>Mis Compras</NavLink>
                <NavLink to={RUTAS.listaProductos}>Producto Terminado</NavLink>
                <NavLink to={RUTAS.listaVentas}>Mis Ventas</NavLink>
                <NavLink to={RUTAS.clientes}>Clientes de Ventas</NavLink>
                {/* <NavLink to={RUTAS.listaUsuarios}>Usuarios</NavLink> */}
            </nav>
            <Outlet />
            {/* </div> */}
        </>
    )
}

export default LayoutAdministracion