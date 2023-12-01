import React from 'react';

/**
 * Componente que representa un campo de entrada de texto para formularios de registro o inicio de sesión.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.name - Nombre del campo de entrada.
 * @param {string} props.label - Etiqueta del campo de entrada.
 * @param {string} props.placeholder - Texto de marcador de posición.
 * @param {Function} props.register - Función de registro de React Hook Form.
 * @param {boolean} props.required - Indica si el campo es obligatorio.
 * @param {number} props.minLength - Longitud mínima del campo.
 * @param {number} props.maxLength - Longitud máxima del campo.
 * @param {Function} props.getDatos - Función para obtener datos del campo.
 * @param {Object} props.errors - Errores de validación del campo.
 * @returns {JSX.Element} Elemento que representa un campo de entrada de texto.
 */
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