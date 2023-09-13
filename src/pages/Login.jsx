import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from '../helpers/auth/useAuth';
import { mostrarAlertSuccess, mostrarAlertError } from '../helpers/sweetAlerts/Alerts';
import { LoginServices } from '../services/LoginServices';
import RUTAS from '../helpers/RutasHelpers';
import GeneralLogin_Components from '../components/Formularios/Login/GeneralLogin_Components';
import Banner_Lateral from '../components/Banner/Banner_Lateral';

const Login = () => {

    const { tieneToken, saveUsuerLocal, deleteUserLocal, saveToken } = useAuth();
    let navigate = useNavigate();

    const [datos, setDatos] = useState({
        usuario: "",
        password: ""
    });

    let getDatos = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    }

    if (!tieneToken()) deleteUserLocal();

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