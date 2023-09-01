import React from 'react'
import { Button } from 'react-bootstrap'

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