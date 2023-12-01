import React from 'react';
import { Form } from 'react-bootstrap';


/**
 * Componente que representa un campo de selección con etiqueta.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.label - Etiqueta del campo de selección.
 * @param {string} props.name - Nombre del campo de selección.
 * @param {Array} props.options - Opciones del campo de selección en formato de arreglo.
 * @param {Function} props.onChange - Función que se ejecuta cuando cambia el valor del campo de selección.
 * @param {Function} props.register - Función para registrar el campo de selección.
 * @param {Object} props.errors - Errores relacionados con el campo de selección.
 * @param {string} props.defaultValue - Valor predeterminado del campo de selección.
 * @returns {JSX.Element} Elemento que representa un campo de selección con etiqueta.
 */
const InputTypeSelect_Components = ({ label, name, options, onChange, register, errors, defaultValue }) => {
    return (
        <Form.Group className="mb-8 group-select " controlId={`formGroup_${name}`}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                as="select"
                name={name}
                defaultValue={defaultValue}
                onChange={onChange}
                {...register(name, {
                    required: {
                        value: true,
                        message: "*Campo requerido"
                    },
                })}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Form.Control>
            <small className='fail'>{errors?.[name]?.message}</small>
        </Form.Group>
    )
}

export default InputTypeSelect_Components