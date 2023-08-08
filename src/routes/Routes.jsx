import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

//imports pages
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import Login from '../pages/Login'
import Registro from '../pages/Registro'
import Perfil from '../pages/Perfil'
import Galeria_Imagenes, { LoaderGaleriaImagen } from '../pages/Galeria_Imagenes'
import ComprarMP from '../pages/ComprarMP'
import Venta_Hilado from '../pages/Venta_Hilado'

//imports rutas publicas y privadas
import PrivateRoutes from '../routes/PrivateRoutes'
import PublicRoutes from '../routes/PublicRoutes'

//imports layouts
import LayoutRaiz from '../layouts/LayoutRaiz'
import LayoutLoginAndRegister from '../layouts/LayoutLoginAndRegister'
import SuperAdmin_Layout from '../layouts/SuperAdmin_Layout'
import LayoutAdministracion from '../layouts/LayoutAdministracion'

import ROLES from '../helpers/RolesHelpers'
import RUTAS from '../helpers/RutasHelpers'
import ListaMP from '../pages/ListaMP'
import ListaProductos from '../pages/ListaProductos'
import ListaUsuarios from '../pages/ListaUsuarios'

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
                    path: RUTAS.galeria,
                    element: <Galeria_Imagenes />,
                    loader: LoaderGaleriaImagen
                },

                {
                    path: RUTAS.superAdmin,
                    element: < SuperAdmin_Layout />,
                    children: [
                        {
                            path: RUTAS.compra,
                            element:
                                < ComprarMP />
                        },
                        {
                            path: RUTAS.venta,
                            element:
                                < Venta_Hilado />
                        },
                    ]
                },


                {
                    path: RUTAS.home,
                    element: < Home />

                },
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
                    ]
                },
            ]
        }
    ]
)