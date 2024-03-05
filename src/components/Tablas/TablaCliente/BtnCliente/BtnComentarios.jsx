import React from 'react'
import { Button } from 'react-bootstrap';
import { useModal } from '../../../../helpers/hooks/useModal';
import { alertSuccess, mostrarAlertError } from '../../../../helpers/sweetAlerts/Alerts';
import { getText } from '../../../../helpers/sweetAlerts/Texts_alerts';
import { eliminarComentarios } from '../../../../services/ComentarioServices';
import Modal_Comentarios from '../Modal/Modal_Comentarios';

const BtnComentarios = ({ id }) => {
    
    const [isOpenChangeEditModal, openChangeEditModal, closeChangeEditModal] = useModal();


    const openModal = () => {
        openChangeEditModal(true);
    };
    const eliminarComentario = async (datos, actualizar) => {
         try {
            
            let response = await eliminarComentarios(datos);
           
            if (response.status === 200) {
                alertSuccess(getText(response.data));
                actualizar();
                //closeChangeEditModal(true)
            }
            return;
        } catch (err) {
            if (err.response)
                return mostrarAlertError(err.response.data.error);
            else
                mostrarAlertError("Error de red. Inténtalo más tarde.");
        }
    };
  return (
      <>
          <Button variant=""
              onClick={openModal}
              style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  border: "2px solid red",
                  fontSize: "13px",
                  margin: "0 0 0 1rem"
              }}
          >Observaciones</Button>{' '}

          {isOpenChangeEditModal && <Modal_Comentarios
              open={isOpenChangeEditModal}
              close={() => closeChangeEditModal(true)}
              id={id}
              eliminarComentario={eliminarComentario}
          />}
      </>
  )
}

export default BtnComentarios