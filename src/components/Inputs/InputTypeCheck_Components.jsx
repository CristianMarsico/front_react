import React from 'react'
import { Form } from 'react-bootstrap'

const InputTypeCheck_Components = ({ show, set, text }) => {
    return (

        <Form.Check // prettier-ignore
            type="switch"
            label={text}
            id="disabled-custom-switch"
            checked={show}
            onChange={(e) => set(e.target.checked)}
        />

    )
}

export default InputTypeCheck_Components