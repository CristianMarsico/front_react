import React from 'react';
import { Form } from 'react-bootstrap';

/**
 * Componente que representa un campo de entrada de texto editable o deshabilitado.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.label - Etiqueta del campo de entrada.
 * @param {string} props.type - Tipo de campo de entrada (e.g., "text", "password").
 * @param {string} props.name - Nombre del campo de entrada.
 * @param {string} props.defaultValue - Valor predeterminado para el campo de entrada.
 * @param {string} props.placeholder - Texto de marcador de posición.
 * @param {boolean} props.disabled - Indica si el campo está deshabilitado.
 * @param {Function} props.onChange - Función de cambio para el campo de entrada.
 * @param {Function} props.register - Función de registro de React Hook Form.
 * @param {boolean} props.required - Indica si el campo es requerido.
 * @param {string} props.errorMessage - Mensaje de error personalizado.
 * @returns {JSX.Element} Elemento que representa un campo de entrada de texto editable o deshabilitado.
 */
const InputEdit_Components = ({ label, type, name, defaultValue, placeholder, disabled, onChange, register, required, errorMessage }) => {
    return (
        <Form.Group className="mb-8" controlId={`formGroup_${name}`}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                name={name}
                defaultValue={defaultValue}
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChange}
                {...register(name, {
                    required: {
                        value: required,
                        message: "*Campo requerido",
                    },
                })}
            />
            <small className="fail">{errorMessage}</small>
        </Form.Group>
    );
}

export default InputEdit_Components