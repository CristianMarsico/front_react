import React from 'react'
import { Outlet, useNavigation, Navigate, useNavigate } from 'react-router-dom'
import useAuth from "../helpers/auth/useAuth";
import General_Navbar_Component from '../components/Navbar/General_Navbar_Component';
import RUTAS from '../helpers/RutasHelpers';
import Breadcrumbs_Component from '../components/Breadcrumbs/Breadcrumbs_Component';
import '../css/general.css'
import '../css/navbarStyles.css'
import '../css/posicionURL.css';
import '../css/navsInternos.css';
import '../css/tabla.css'
import { sesionExpirada } from '../helpers/sweetAlerts/Alerts';
import { LogoutServices } from '../services/LogoutServices';

/**
 * Componente que proporciona un diseño general para las páginas de la aplicación.
 * Incluye una barra de navegación, una sección de carga y un área principal para mostrar contenido.
 * Si el usuario no tiene un token válido, se redirige a la página de inicio de sesión.
 */
const LayoutRaiz = () => {

    let load = useNavigation()
    let navigate = useNavigate();

    let { tieneToken, deleteUserLocal } = useAuth()

    const verificarToken = async () => {
        if (!tieneToken()) {
            const isConfirmed = await sesionExpirada()

            // Maneja el resultado del clic en "Aceptar"
            if (isConfirmed) {
                await LogoutServices();
                deleteUserLocal();
                navigate(RUTAS.login)
            }
        }
    };

    verificarToken();

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
