import React from 'react';
import { Form } from 'react-bootstrap';

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