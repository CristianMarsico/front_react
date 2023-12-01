import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import InputRegitroComponent from '../../Inputs/Login/InputRegitroComponent';
import InputsLoginComponent from '../../Inputs/Login/InputsLoginComponent'
import '../../../css/login.css'


/**
 * Componente que muestra un formulario de registro en la aplicación.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.enviarDatos - Función para enviar datos del formulario.
 * @param {Function} props.getDatos - Función para obtener datos del formulario.
 * @returns {JSX.Element} Elemento que muestra el formulario de registro.
 */
const GeneralRegistro_Components = ({ enviarDatos, getDatos }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPwd, setShowPwd] = useState(false);
    const [showRePwd, setShowRePwd] = useState(false);
    return (
        <form onSubmit={handleSubmit(enviarDatos)} className="form-container-lavender register-form" >
            <h2>Registro</h2>
            <div className='contenedor-input'>
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
                />
            </div>
            <p >Volver al <Link to="/">Login</Link></p>
            <Button
                onClick={handleSubmit(enviarDatos)}
                type='submit'
                variant="primary"
            >Confirmar
            </Button>
        </form>
    )
}

export default GeneralRegistro_Components