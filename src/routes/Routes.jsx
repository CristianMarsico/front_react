import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

//imports pages
import Home, { LoaderHome } from '../pages/Home'
import About from '../pages/About'
import Faq from '../pages/Faq'
import Contact from '../pages/Contact'
import Carrera, { LoaderCarrera } from '../pages/Carrera'
import CarreraDetalle, { LoaderCarreraDetale } from '../pages/CarreraDetalle'
import CarreraError from '../pages/CarreraError'
import NotFound from '../pages/NotFound'
import Login from '../pages/Login'
import Registro from '../pages/Registro'
import Admin from '../pages/Admin'
import Galeria_Imagenes, { LoaderGaleriaImagen } from '../pages/Galeria_Imagenes'
import ComprarMP from '../pages/ComprarMP'
import Venta_Hilado from '../pages/Venta_Hilado'



//imports rutas publicas y privadas
import PrivateRoutes from '../routes/PrivateRoutes'
import PublicRoutes from '../routes/PublicRoutes'


//imports layouts
import LayoutRaiz from '../layouts/LayoutRaiz'
import LayoutLoginAndRegister from '../layouts/LayoutLoginAndRegister'
import LayoutCarreras from '../layouts/LayoutCarreras'
import LayoutsAyuda from '../layouts/LayoutsAyuda'
import SuperAdmin_Layout from '../layouts/SuperAdmin_Layout'

import ROLES from '../helpers/RolesHelpers'
import RUTAS from '../helpers/RutasHelpers'

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
                    path: RUTAS.carrers,
                    element: < LayoutCarreras />,
                    errorElement: < CarreraError />,
                    children: [
                        {
                            index: true,
                            element: < Carrera />,
                            loader: LoaderCarrera
                        },
                        {
                            path: RUTAS.carrersId,
                            element: < CarreraDetalle />,
                            loader: LoaderCarreraDetale
                        },
                    ]
                },

                {
                    path: RUTAS.galeria,
                    element: <Galeria_Imagenes />,
                    loader: LoaderGaleriaImagen
                },

                {
                    path: RUTAS.help,
                    element: < LayoutsAyuda />,
                    children: [
                        {
                            path: RUTAS.faq,
                            element:
                                < Faq />
                        },
                        {
                            path: RUTAS.contact,
                            element:
                                < Contact />
                        },
                    ]
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
                    element: < Home />,
                    loader: LoaderHome
                },
                {
                    path: RUTAS.about,
                    element:
                        < About />
                },


                {
                    path: RUTAS.admin,
                    element:
                        < PrivateRoutes props={{ super: ROLES.super, admin: ROLES.admin }}  >
                            <Admin />
                        </PrivateRoutes>
                },
            ]
        }
    ]
)