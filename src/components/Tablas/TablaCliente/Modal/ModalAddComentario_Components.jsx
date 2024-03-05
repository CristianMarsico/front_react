import { useEffect, useState } from 'react';

import { addComentario } from '../../../../services/ComentarioServices';
import InputBasico_Components from '../../../Inputs/InputBasico_Components';
import BtnConfirmar_Cancelar_Components from '../../BtnConfirmar_Cancelar/BtnConfirmar_Cancelar_Components'

import { Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { alertSuccess, alertWarning, mostrarAlertError } from '../../../../helpers/sweetAlerts/Alerts';
import { getText, getTextComents } from '../../../../helpers/sweetAlerts/Texts_alerts';

const ModalAddComentario_Components = ({ isOpen, isClose, fetchComentarios, id_cliente}) => {

  
    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm();
   
    const existenModificaciones = !!Object.keys(dirtyFields).length;

    const [datos, setDatos] = useState({
        comentario: ""
    });

    useEffect(() => {
        if (!isOpen) {
            reset()
        }
    }, [isOpen])


    let getDatos = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    }

    let enviarDatos = async (datosEnviados) => {
        try {
            if (!datosEnviados.comentario)
                datosEnviados.comentario = datos.comentario;

            let isTrue = await alertWarning("Desea agregar el siguiente comentario ?",getTextComents(datosEnviados.comentario))
            if (isTrue) {
                let response = await addComentario(id_cliente, datosEnviados);
                alertSuccess(getText(response.data));
                fetchComentarios();
                isClose(true)
                return;
            }
        } catch (err) {
            console.log(err)
            if (err.response)
                return mostrarAlertError(err.response.data.error);
            else
                mostrarAlertError("Error de red. Inténtalo más tarde.");
        }
    }

  return (
      <Modal show={isOpen} onHide={close}>
          <Modal.Header className='header-modal' closeButton>
              <Modal.Title>Agregar Comentario</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              <Form className='form-modal' onSubmit={handleSubmit(enviarDatos)}>
                  
                  <InputBasico_Components
                      type="text"
                      label="Comentario"
                      name="comentario"
                      placeholder="Ingrese Comentario*"
                      onChange={getDatos}
                      register={register}
                      errors={errors}
                      defaultValue=""
                  />
              </Form>
          </Modal.Body>

          <Modal.Footer>
              <BtnConfirmar_Cancelar_Components
                  handleSubmit={handleSubmit}
                  enviarDatos={enviarDatos}
                  existenModificaciones={existenModificaciones}
                  close={isClose}
              />
          </Modal.Footer>
      </Modal>
  )
}

export default ModalAddComentario_Components