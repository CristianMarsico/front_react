
import React from 'react'
import { Button } from "react-bootstrap";
// import { useModal } from '../../../helpers/hooks/useModal';
// import EditUserModal_Component from '../../Tablas/TablaUsuario/components_internos/EditUserModal_Component';
const BtnEditarMP = ({ openChangeEditModal }) => {
    // const [isOpenChangeEditModal, openChangeEditModal, closeChangeEditModal] = useModal();
    return (
        <>
            <Button className="dimensionBtn"
                variant="primary"
                onClick={openChangeEditModal}
            >Editar
            </Button>

            {/* <EditUserModal_Component
                isOpen={isOpenChangeEditModal}
                close={closeChangeEditModal}
                user={mp}
                handleEditUser={editarMP}
            /> */}
        </>
    )
}

export default BtnEditarMP