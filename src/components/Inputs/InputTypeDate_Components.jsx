import React from 'react';
import { Form } from 'react-bootstrap';

/**
 * Componente que representa un campo de entrada de tipo fecha con etiqueta.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.type - Tipo de entrada (por ejemplo, 'date').
 * @param {string} props.label - Etiqueta del campo de entrada.
 * @param {string} props.name - Nombre del campo de entrada.
 * @param {string} props.placeholder - Texto de marcador de posición del campo de entrada.
 * @param {Function} props.onChange - Función que se ejecuta cuando cambia el valor del campo de entrada.
 * @param {Function} props.register - Función para registrar el campo de entrada.
 * @param {Object} props.errors - Errores relacionados con el campo de entrada.
 * @param {string} props.max - Valor máximo permitido en el campo de entrada.
 * @returns {JSX.Element} Elemento que representa un campo de entrada de tipo fecha con etiqueta.
 */
const InputTypeDate_Components = ({ type, label, name, placeholder, onChange, register, errors, max }) => {
    return (
        <Form.Group className="mb-8" controlId={`formGroup_${name}`}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                name={name}
                max={max}
                placeholder={placeholder}
                onChange={onChange}
                {...register(name, {
                    required: {
                        value: true,
                        message: "*Campo requerido"
                    },
                })}
            />
            <small className='fail'>{errors?.[name]?.message}</small>
        </Form.Group>
    );
};



export default InputTypeDate_Components