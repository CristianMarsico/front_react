import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from '../helpers/auth/useAuth';
import { mostrarAlertSuccess, mostrarAlertError } from '../helpers/sweetAlerts/Alerts';
import { LoginServices } from '../services/LoginServices';
import RUTAS from '../helpers/RutasHelpers';
import GeneralLogin_Components from '../components/Formularios/Login/GeneralLogin_Components';
import Banner_Lateral from '../components/Banner/Banner_Lateral';

/**
 * Página de inicio de sesión que permite a los usuarios autenticarse.
 * @returns {JSX.Element} Elemento JSX que representa la página de inicio de sesión.
 */
const Login = () => {

    const { tieneToken, saveUsuerLocal, deleteUserLocal, saveToken } = useAuth();
    let navigate = useNavigate();

    const [datos, setDatos] = useState({
        usuario: "",
        password: ""
    });

    /**
     * Maneja el cambio de datos en los campos del formulario.
     * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio.
     */
    let getDatos = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    }

    if (!tieneToken()) deleteUserLocal();

    /**
     * Envia los datos de inicio de sesión al servidor para autenticación.
     * @param {Object} datosEnviados - Datos de inicio de sesión enviados desde el formulario.
     * @param {React.SyntheticEvent} e - Evento de formulario.
     */
    let enviarDatos = async (datosEnviados, e) => {
        try {
            let response = await LoginServices(datosEnviados, e);
            let { token } = response.data;
            saveToken(token);
            saveUsuerLocal(response.data);
            mostrarAlertSuccess(response.data.usuario);
            navigate(RUTAS.administracion);
            return;
        } catch (err) {
            if (err.response)
                return mostrarAlertError(err.response.data.error);
            else
                mostrarAlertError("Error de red. Inténtalo más tarde.");
        }
    }

    return (
        <div className='contenedor-login'>
            <Banner_Lateral />

            <GeneralLogin_Components
                enviarDatos={enviarDatos}
                getDatos={getDatos}
            />
        </div>
    )
}

export default Login