import React from 'react';

const InputsLoginComponent = ({ name, label, placeholder, register, required, minLength, maxLength, getDatos, errors }) => {
    return (
        <div className='form_box'>
            <div>
                <input
                    type="text"
                    className="form_input"
                    placeholder={placeholder}
                    id={name}
                    {...register(name, {
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
                    })}
                    onChange={getDatos}
                />
                <label htmlFor={name} className="form_label">{label}</label>
                <small className='fail'>{errors?.[name]?.message}</small>
            </div>
        </div>
    );
};

export default InputsLoginComponent;