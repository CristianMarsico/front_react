import React from 'react';
import { Form } from 'react-bootstrap';

const InputBasico_Components = ({ type, name, label, placeholder, register, required, getDatos, errors }) => {
    return (
        <Form.Group >
            <Form.Label className='label-modal'>{label}</Form.Label>
            <Form.Control
                type={type}
                placeholder={placeholder}
                name={name}
                {...register(name, {
                    required: {
                        value: { required },
                        message: "*Campo requerido"
                    }
                })}
                onChange={getDatos}
            />
            <small className='fail'>{errors?.[name]?.message}</small>
        </Form.Group>
    );
};

export default InputBasico_Components