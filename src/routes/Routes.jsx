import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

//imports pages
import NotFound from '../pages/NotFound'
import Login from '../pages/Login'
import Registro from '../pages/Registro'
import Perfil from '../pages/Perfil'


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
import ListaUsuarios from '../pages/ListaUsuarios'
import ListaCompra from '../pages/ListaCompra'

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
                {
                    path: RUTAS.perfil,
                    element:
                        <Perfil />
                },

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
                        {
                            path: RUTAS.listaUsuarios,
                            element:
                                < ListaUsuarios />
                        },
                        {
                            path: RUTAS.listaCompras,
                            element:
                                < ListaCompra />
                        },
                    ]
                },
            ]
        }
    ]
)