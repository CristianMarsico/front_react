import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
// import { ToastContainer, toast } from 'react-toastify';
import useAuth from '../helpers/auth/useAuth';
import { mostrarAlertSuccess, mostrarAlertError } from '../helpers/sweetAlerts/Alerts';
import InputsLoginComponent from '../components/Inputs/Login/InputsLoginComponent';
import InputRegitroComponent from '../components/Inputs/Login/InputRegitroComponent';
import { RegistroService } from '../services/RegistroService';


const Registro = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { tieneToken, saveUsuerLocal, deleteUserLocal, saveToken } = useAuth();
    let navigate = useNavigate();

    const [showPwd, setShowPwd] = useState(false);
    const [showRePwd, setShowRePwd] = useState(false);
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

    let enviarDatos = async (datosEnviados, e) => {
        console.log(datosEnviados)
        try {
            let response = await RegistroService(datosEnviados, e);
            console.log(response);
            mostrarAlertSuccess(response.data);
            setTimeout(() => {
                navigate("/")
            }, 1500)

        } catch (err) {
            if (err.response)
                return mostrarAlertError(err.response.data.error);
            else
                mostrarAlertError("Error de red. Inténtalo de nuevo.");
        }
        e.target.reset();
    }

    return (
        <>
            <div className="container_form">
                <form onSubmit={handleSubmit(enviarDatos)} className="form-container-lavender" >

                    <InputsLoginComponent
                        name="nombre"
                        label="Nombre"
                        placeholder="Nombre"
                        register={register}
                        required={true}
                        minLength={4}
                        maxLength={20}
                        getDatos={getDatos}
                        errors={errors}
                    />
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
                    <InputRegitroComponent
                        name="confirm_password"
                        label="Confirmar Password"
                        placeholder="Confirmar Password"
                        register={register}
                        required={true}
                        minLength={6}
                        maxLength={20}
                        getDatos={getDatos}
                        errors={errors}
                        setShowPwd={setShowRePwd}
                        showPwd={showRePwd}
                    />

                    <InputsLoginComponent
                        name="email"
                        label="Email"
                        placeholder="Email"
                        register={register}
                        required={true}
                        minLength={3}
                        maxLength={50}
                        getDatos={getDatos}
                        errors={errors}
                        setShowPwd={setShowPwd}
                        showPwd={showPwd}
                    />


                    <div className="d-flex justify-content-end">
                        <p className="d-inline-block m-0 pe-2 pt-2 fst-italic fw-semibold pointer forgot-text"><Link to="/">Volver al Login </Link></p>
                    </div>
                    <div className="px-5">
                        <button className="text-white btn-purple mt-3 text-center py-2 fw-semibold fs-4 rounded-3 w-100 border border-4 border-white shadow">Registrar</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Registro