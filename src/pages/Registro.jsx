import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from '../helpers/auth/useAuth';
import { mostrarAlertSuccess, mostrarAlertError } from '../helpers/sweetAlerts/Alerts';
import { RegistroService } from '../services/RegistroService';
import IMG from '../components/../images/logo.svg';
import GeneralRegistro_Components from '../components/Formularios/Registro/GeneralRegistro_Components';


const Registro = () => {
    const { tieneToken, deleteUserLocal } = useAuth();
    let navigate = useNavigate();

    const [datos, setDatos] = useState({
        nombre: "",
        password: "",
        confirm_password: "",
        usuario: "",
        email: ""
    });

    let getDatos = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    }

    if (!tieneToken()) deleteUserLocal();

    let enviarDatos = async (datosEnviados) => {
        try {
            let response = await RegistroService(datosEnviados);
            mostrarAlertSuccess(response.data);
            setTimeout(() => {
                navigate("/")
            }, 1500)
            return

        } catch (err) {
            if (err.response)
                return mostrarAlertError(err.response.data.error);
            else
                mostrarAlertError("Error de red. Inténtalo de nuevo.");
        }
    }

    return (
        <>
            <div className='contenedor-registro'>
                <div className='banner'>
                    <img src={IMG} alt="banner" />
                    <h6>Confección de hilados artesanales</h6>
                </div>
                <div className='.container_form'>
                    <GeneralRegistro_Components
                        enviarDatos={enviarDatos}
                        getDatos={getDatos}
                    />
                </div>
            </div>
        </>
    )
}

export default Registro