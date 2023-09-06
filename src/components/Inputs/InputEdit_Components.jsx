import React from 'react';
import { Form } from 'react-bootstrap';

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