import React from 'react'
import Eye_InputComponent from '../../Navbar/Eye_InputComponent'


/**
 * Componente que representa un campo de entrada de texto para formularios de registro.
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
 * @param {Function} props.setShowPwd - Función para mostrar/ocultar la contraseña.
 * @param {boolean} props.showPwd - Indica si la contraseña se muestra.
 * @returns {JSX.Element} Elemento que representa un campo de entrada de texto.
 */
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