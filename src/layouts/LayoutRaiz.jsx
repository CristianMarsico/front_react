import React from 'react'
import { Outlet, useNavigation, Navigate } from 'react-router-dom'
import useAuth from "../helpers/auth/useAuth";
import General_Navbar_Component from '../components/Navbar/General_Navbar_Component';
import RUTAS from '../helpers/RutasHelpers';
import Breadcrumbs_Component from '../components/Breadcrumbs/Breadcrumbs_Component';
import '../css/general.css'
import '../css/navbarStyles.css'
import '../css/posicionURL.css';
import '../css/navsInternos.css';
import '../css/tabla.css'


const LayoutRaiz = () => {

    let load = useNavigation()

    let { tieneToken } = useAuth()


    if (!tieneToken()) {
        return <Navigate to={RUTAS.login} />
    }

    return (
        <div className="root-layout">
            <header>
                <General_Navbar_Component />

                {
                    load.state === 'loading' && (
                        <div className="alert alert-info">
                            Cargando...
                        </div>
                    )
                }
                <Breadcrumbs_Component />
            </header>

            <main>
                <Outlet />
            </main>

        </div>
    )
}

export default LayoutRaiz
