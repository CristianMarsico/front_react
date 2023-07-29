import React from 'react'
import Eye_InputComponent from '../../Navbar/Eye_InputComponent'

const InputRegitroComponent = ({ name, label, placeholder, register, required, minLength, maxLength, getDatos, errors, setShowPwd, showPwd }) => {
    return (
        <div className='form_box' >
            <Eye_InputComponent setShowPwd={setShowPwd} showPwd={showPwd} />
            <input
                type={showPwd ? "text" : "password"}
                className="form_input"
                placeholder={placeholder}
                id={name}
                {
                ...register(name, {
                    required: {
                        value: required,
                        message: "*Campo requerido"
                    },
                    minLength: {
                        value: minLength,
                        message: "*El mínimo son " + minLength + " caracteres"
                    },
                    maxLength: {
                        value: maxLength,
                        message: "*El máximo son " + maxLength + " caracteres"
                    },
                })
                }
                onChange={getDatos}

            />
            <label htmlFor={name} className="form_label">{label}</label>
            <small className='fail'>{errors?.password?.message}</small>
        </div>
    )
}

export default InputRegitroComponent