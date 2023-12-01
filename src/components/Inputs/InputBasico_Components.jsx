import React from 'react';
import { Form } from 'react-bootstrap';

/**
 * Componente que representa un campo de entrada de texto básico.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.type - Tipo de campo de entrada (e.g., "text", "password").
 * @param {string} props.label - Etiqueta del campo de entrada.
 * @param {string} props.name - Nombre del campo de entrada.
 * @param {string} props.placeholder - Texto de marcador de posición.
 * @param {Function} props.onChange - Función de cambio para el campo de entrada.
 * @param {Function} props.register - Función de registro de React Hook Form.
 * @param {Object} props.errors - Errores de validación del campo.
 * @param {string} props.defaultValue - Valor predeterminado para el campo de entrada.
 * @returns {JSX.Element} Elemento que representa un campo de entrada de texto básico.
 */
const InputBasico_Components = ({ type, label, name, placeholder, onChange, register, errors, defaultValue }) => {
    return (
        <Form.Group className="mb-8" controlId={`formGroup_${name}`}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                name={name}
                defaultValue={defaultValue}
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


export default InputBasico_Components