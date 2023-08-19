import React from 'react';
import { Form } from 'react-bootstrap';

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