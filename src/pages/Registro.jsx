import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from '../helpers/auth/useAuth';
import { mostrarAlertError, alertSuccess } from '../helpers/sweetAlerts/Alerts';
import { RegistroService } from '../services/RegistroService';
import GeneralRegistro_Components from '../components/Formularios/Registro/GeneralRegistro_Components';
import Banner_Lateral from '../components/Banner/Banner_Lateral';
import { getTextWelcome } from '../helpers/sweetAlerts/Texts_alerts';

/**
 * Página de registro que permite a los usuarios crear nuevas cuentas.
 * @returns {JSX.Element} Elemento JSX que representa la página de registro.
 */
const Registro = () => {
    const { tieneToken, deleteUserLocal } = useAuth();
    let navigate = useNavigate();

    // Estado para almacenar los datos del formulario de registro
    const [datos, setDatos] = useState({
        nombre: "",
        password: "",
        confirm_password: "",
        usuario: "",
        email: ""
    });

    /**
     * Maneja el cambio de datos en los campos del formulario de registro.
     * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio.
     */
    let getDatos = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
        console.log(datos)
    }

    // Verifica si el usuario ya tiene un token de autenticación
    if (!tieneToken()) deleteUserLocal();

    /**
     * Envia los datos de registro al servidor para crear una nueva cuenta.
     * @param {Object} datosEnviados - Datos de registro enviados desde el formulario.
     */
    let enviarDatos = async (datosEnviados) => {
        try {
            let response = await RegistroService(datosEnviados);
            alertSuccess(getTextWelcome(response.data));
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