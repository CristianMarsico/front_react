import React from 'react'
import { Form } from 'react-bootstrap'

/**
 * Componente que representa un interruptor personalizado (switch) con etiqueta.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.show - Indica si el interruptor está activado o desactivado.
 * @param {Function} props.set - Función para cambiar el estado del interruptor.
 * @param {string} props.text - Texto de la etiqueta del interruptor.
 * @returns {JSX.Element} Elemento que representa un interruptor personalizado.
 */
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