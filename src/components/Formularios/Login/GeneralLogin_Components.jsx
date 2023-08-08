import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import RUTAS from '../../../helpers/RutasHelpers';
import Logo from "../../../images/male_avatar.svg";
import InputRegitroComponent from '../../Inputs/Login/InputRegitroComponent';
import InputsLoginComponent from '../../Inputs/Login/InputsLoginComponent';
import BtnConfirmar_Components from '../../botones/BtnConfirmar_Components';

const GeneralLogin_Components = ({ enviarDatos, getDatos }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPwd, setShowPwd] = useState(false);


    return (

        <form onSubmit={handleSubmit(enviarDatos)} className="form-container-lavender" >
            <div className="div_img" >
                <img src={Logo} alt="login-logo" className="logo-img" />
                <h1>Login</h1>
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

            <div className="registrate">
                <p >No tienes cuenta? <Link to={RUTAS.register}>Registrate!👍</Link></p>
            </div>

            <BtnConfirmar_Components
                variant="primary"
                width="12rem"
                nombreAccion="Ingresar"
                padding=".4rem"
            />
        </form>

    )
}

export default GeneralLogin_Components