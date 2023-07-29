import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
// import { ToastContainer, toast } from 'react-toastify';
import useAuth from '../helpers/auth/useAuth';
import Logo from "../images/male_avatar.svg";
import { mostrarAlertSuccess, mostrarAlertError } from '../helpers/sweetAlerts/Alerts';
import InputsLoginComponent from '../components/Inputs/Login/InputsLoginComponent';
import InputRegitroComponent from '../components/Inputs/Login/InputRegitroComponent';
import { LoginServices } from '../services/LoginServices';
import RUTAS from '../helpers/RutasHelpers';


const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { tieneToken, saveUsuerLocal, deleteUserLocal, saveToken } = useAuth();
    let navigate = useNavigate();

    const [showPwd, setShowPwd] = useState(false);

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
            navigate(RUTAS.home);
            return;
        } catch (err) {
            if (err.response)
                return mostrarAlertError(err.response.data.error);
            else
                mostrarAlertError("Error de red. Inténtalo más tarde.");
        }
        e.target.reset();
    }

    return (
        <>
            <div className="container_form">
                <form onSubmit={handleSubmit(enviarDatos)} className="form-container-lavender" >
                    <div className="div_img" >
                        <img src={Logo} alt="login-logo" className="logo-img" />
                    </div>
                    <InputsLoginComponent
                        name="usuario"
                        label="Usuario"
                        placeholder="Usuario"
                        register={register}
                        required={true}
                        minLength={4}
                        maxLength={20}
                        getDatos={getDatos}
                        errors={errors}
                    />
                    <InputRegitroComponent
                        name="password"
                        label="Password"
                        placeholder="Password"
                        register={register}
                        required={true}
                        minLength={6}
                        maxLength={20}
                        getDatos={getDatos}
                        errors={errors}
                        setShowPwd={setShowPwd}
                        showPwd={showPwd}
                    />

                    <div className="d-flex justify-content-end">
                        <p className="d-inline-block m-0 pe-2 pt-2 fst-italic fw-semibold pointer forgot-text">No tienes cuenta? <Link to={RUTAS.register}>Registrate!👍</Link></p>
                    </div>
                    <div className="px-5">
                        <button className="text-white btn-purple mt-3 text-center py-2 fw-semibold fs-4 rounded-3 w-100 border border-4 border-white shadow">Ingresar</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login