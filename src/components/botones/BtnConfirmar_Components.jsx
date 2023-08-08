import React from 'react'
import { Button } from 'react-bootstrap'

const BtnConfirmar_Components = ({ variant, width, nombreAccion, padding }) => {
    return (
        <div className="d-flex justify-content-center mt-1">
            <Button
                type='submit'
                variant={variant}
                style={{ width, padding }}>
                {nombreAccion}
            </Button>
        </div>
    )
}

export default BtnConfirmar_Components