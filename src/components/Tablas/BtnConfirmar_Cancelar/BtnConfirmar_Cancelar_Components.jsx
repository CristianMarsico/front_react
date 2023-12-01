import React from 'react'
import { Button } from 'react-bootstrap'

/**
 * Componente que muestra botones para confirmar o cancelar una acción.
 *
 * @param {object} props - Propiedades del componente.
 * @param {function} props.handleSubmit - Función a llamar al confirmar la acción.
 * @param {function} props.enviarDatos - Función a ejecutar al confirmar.
 * @param {boolean} props.existenModificaciones - Indica si existen modificaciones pendientes.
 * @param {function} props.close - Función para cerrar o cancelar la acción.
 * @returns {JSX.Element} Elemento que representa los botones de confirmar y cancelar.
 */
const BtnConfirmar_Cancelar_Components = ({ handleSubmit, enviarDatos, existenModificaciones, close }) => {
    return (
        <>
            <Button className="confirmar"
                onClick={handleSubmit(enviarDatos)}
                type='submit'
                variant="primary"
                disabled={!existenModificaciones}>
                Confirmar
            </Button>
            <Button className="cancelar"
                variant="secondary"
                onClick={close}>
                Cancelar
            </Button>
        </>
    )
}

export default BtnConfirmar_Cancelar_Components