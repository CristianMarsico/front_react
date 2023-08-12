// import React from 'react'
// import { Button } from "react-bootstrap";
// import { useModal } from "../../helpers/hooks/useModal";
// import Modal_TransferirStock from '../Tablas/TablaMateriaPrima/Modal/Modal_TransferirStock';
// import EditUserModal_Component from '../Tablas/TablaUsuario/components_internos/EditUserModal_Component';

// const Btn_TablaMP = ({ user, handleDeleteUser, handleEditUser, moverStock }) => {
//     const [isOpenChangeEditModal, openChangeEditModal, closeChangeEditModal] = useModal();
//     const [isOpenMoveStockModal, openMoveStockModal, closeMoveStockModal] = useModal()

//     return (
//         <>
//             <td className="td_btn">
//                 <Button className="dimensionBtn"
//                     variant="danger"
//                     onClick={() => { handleDeleteUser(user.id) }}
//                 >Eliminar
//                 </Button>

//                 <Button className="dimensionBtn"
//                     variant="primary"
//                     onClick={openChangeEditModal}
//                 >Editar
//                 </Button>

//                 <Button className="dimensionBtn"
//                     variant="primary"
//                     onClick={openMoveStockModal}
//                 >Mover Stock
//                 </Button>
//             </td >

//             <EditUserModal_Component
//                 isOpen={isOpenChangeEditModal}
//                 close={closeChangeEditModal}
//                 user={user}
//                 handleEditUser={handleEditUser}
//             />

//             <Modal_TransferirStock
//                 isOpen={isOpenMoveStockModal}
//                 close={closeMoveStockModal}
//                 user={user}
//                 moverStock={moverStock}
//             />
//         </>
//     )
// }

// export default Btn_TablaMP