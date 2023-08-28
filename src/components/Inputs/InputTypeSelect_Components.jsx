import React from 'react';
import { Form } from 'react-bootstrap';

const InputTypeSelect_Components = ({ label, name, options, onChange, register, errors, defaultValue }) => {
    return (
        <Form.Group className="mb-8" controlId={`formGroup_${name}`}>
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