import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import RUTAS from '../../../helpers/RutasHelpers';
import Logo from "../../../images/male_avatar.svg";
import InputRegitroComponent from '../../Inputs/Login/InputRegitroComponent';
import InputsLoginComponent from '../../Inputs/Login/InputsLoginComponent';
// import BtnConfirmar_Components from '../../botones/BtnConfirmar_Components';
import { Button } from 'react-bootstrap';
import Banner_ImgFotoForm from '../../Banner/Banner_ImgFotoForm';

const GeneralLogin_Components = ({ enviarDatos, getDatos }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPwd, setShowPwd] = useState(false);


    return (

        <form onSubmit={handleSubmit(enviarDatos)} className="form-container-lavender" >
            <Banner_ImgFotoForm nombre="Login" />
            <div className='contenedor-input'>

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
            </div>

            <p>No tienes cuenta? <Link to={RUTAS.register}>Registrate!👍</Link></p>


            <Button
                onClick={handleSubmit(enviarDatos)}
                type='submit'
                variant="primary"
            >Confirmar
            </Button>


        </form>

    )
}

export default GeneralLogin_Components