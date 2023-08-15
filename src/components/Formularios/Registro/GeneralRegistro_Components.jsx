import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import InputRegitroComponent from '../../Inputs/Login/InputRegitroComponent';
import InputsLoginComponent from '../../Inputs/Login/InputsLoginComponent'

const GeneralRegistro_Components = ({ enviarDatos, getDatos }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPwd, setShowPwd] = useState(false);
    const [showRePwd, setShowRePwd] = useState(false);
    return (
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


            <div className="registrate">
                <p >Volver al <Link to="/">Login</Link></p>
            </div>
            <div className="contenedorConfirmarLogin">
                <Button
                    onClick={handleSubmit(enviarDatos)}
                    type='submit'
                    variant="primary"
                >Confirmar
                </Button>

            </div>
        </form>
    )
}

export default GeneralRegistro_Components