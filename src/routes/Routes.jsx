/**
 * Este módulo define las rutas y las páginas correspondientes para la aplicación.
 *
 * @module routes/Routes
 */
import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

// Importación de páginas
import NotFound from '../pages/NotFound'
import Login from '../pages/Login'
import Registro from '../pages/Registro'
// import Perfil from '../pages/Perfil'


//imports rutas publicas y privadas
import PrivateRoutes from '../routes/PrivateRoutes'
import PublicRoutes from '../routes/PublicRoutes'

//imports layouts
import LayoutRaiz from '../layouts/LayoutRaiz'
import LayoutLoginAndRegister from '../layouts/LayoutLoginAndRegister'
import LayoutAdministracion from '../layouts/LayoutAdministracion'

import ROLES from '../helpers/RolesHelpers'
import RUTAS from '../helpers/RutasHelpers'
import ListaMP from '../pages/ListaMP'
import ListaProductos from '../pages/ListaProductos'
// import ListaUsuarios from '../pages/ListaUsuarios'
import ListaCompra from '../pages/ListaCompra'
import ListaVentas from '../pages/ListaVentas'
import ListaClientes from '../pages/ListaClientes'
import ListaEnProduccion from '../pages/ListaEnProduccion'


// Crear el enrutador de la aplicación
export const router = createBrowserRouter(
    [
        {
            element: <LayoutLoginAndRegister />,
            errorElement: < NotFound />,
            children: [
                {
                    path: RUTAS.login,
                    element:
                        <PublicRoutes>
                            < Login />
                        </PublicRoutes>
                },

                {
                    path: RUTAS.register,
                    element:
                        <PublicRoutes>
                            < Registro />
                        </PublicRoutes>
                },
            ]
        },

        {
            element: <LayoutRaiz />,
            children: [
                // {
                //     path: RUTAS.perfil,
                //     element:
                //         <Perfil />
                // },

                {
                    path: RUTAS.administracion,
                    element:
                        < PrivateRoutes props={{ super: ROLES.super, admin: ROLES.admin }}  >
                            <LayoutAdministracion />
                        </PrivateRoutes>,
                    children: [
                        {
                            path: RUTAS.listaMP,
                            element:
                                < ListaMP />
                        },
                        {
                            path: RUTAS.listaProductos,
                            element:
                                < ListaProductos />
                        },
                        // {
                        //     path: RUTAS.listaUsuarios,
                        //     element:
                        //         < ListaUsuarios />
                        // },
                        {
                            path: RUTAS.listaCompras,
                            element:
                                < ListaCompra />
                        },
                        {
                            path: RUTAS.listaVentas,
                            element:
                                < ListaVentas />
                        },
                        {
                            path: RUTAS.clientes,
                            element:
                                < ListaClientes />
                        },
                        {
                            path: RUTAS.enProduc,
                            element:
                                < ListaEnProduccion />
                        },
                    ]
                },
            ]
        }
    ]
)