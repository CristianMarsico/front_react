import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from '../helpers/auth/useAuth';
import { mostrarAlertSuccess, mostrarAlertError } from '../helpers/sweetAlerts/Alerts';
import { RegistroService } from '../services/RegistroService';
import GeneralRegistro_Components from '../components/Formularios/Registro/GeneralRegistro_Components';
import Banner_Lateral from '../components/Banner/Banner_Lateral';

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
        console.log(datos)
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
            <div className='contenedor-login'>
                <Banner_Lateral />

                <GeneralRegistro_Components
                    enviarDatos={enviarDatos}
                    getDatos={getDatos}
                />
            </div>
        </>
    )
}

export default Registro