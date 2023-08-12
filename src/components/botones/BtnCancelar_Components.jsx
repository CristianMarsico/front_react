import React from 'react'
import { Button } from 'react-bootstrap'

const BtnCancelar_Components = ({ variant, width, nombreAccion, padding, close }) => {
    return (
        <div className="d-flex justify-content-center mt-1">
            <Button
                variant={variant}
                style={{ width, padding }}
                onClick={close}>
                {nombreAccion}
            </Button>
        </div >
    )
}

export default BtnCancelar_Components