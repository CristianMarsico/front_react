import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import useGetDatosByAttribute_BD from '../../../../helpers/hooks/useGetDatosByAttribute_BD';
import { useModal } from '../../../../helpers/hooks/useModal';
import { getAllComentarios } from '../../../../services/ComentarioServices';
import ModalAddComentario_Components from './ModalAddComentario_Components';

const Modal_Comentarios = ({ open, close, id, eliminarComentario }) => {
    const [isOpenAddComentModal, openChangeAddComentModal, closeChangeAddComentModal] = useModal()
    const { respuesta, fetchDatos } = useGetDatosByAttribute_BD(id, getAllComentarios);

    const { reset } = useForm();
    const [selectedCommentIds, setSelectedCommentIds] = useState([]);

    useEffect(() => {
        if (!open) {
            reset();
            setSelectedCommentIds([]);
        }
    }, [open])

    const handleCommentSelection = (commentId) => {
        if (selectedCommentIds.includes(commentId)) {
            setSelectedCommentIds(selectedCommentIds.filter(id => id !== commentId));
        } else {
            setSelectedCommentIds([...selectedCommentIds, commentId]);
        }
    }

    const handleEliminarClick = () => {
        eliminarComentario(selectedCommentIds, fetchDatos)
        setSelectedCommentIds([]);
    }

    return (
        <>
            <Modal show={open} onHide={close}>
                <Modal.Header className='header-modal' closeButton>
                    <Modal.Title>Comentarios</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicComments">
                            {respuesta.length === 0 ? (
                                <h5>No hay comentarios disponibles</h5>
                            ) : (
                                respuesta.map((comment, index) => (
                                    <Form.Check
                                        key={index}
                                        type="checkbox"
                                        label={comment.comentario}
                                        checked={selectedCommentIds.includes(comment.id_comentario)}
                                        onChange={() => handleCommentSelection(comment.id_comentario)}
                                    />
                                ))
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="confirmar" type='submit' variant="primary" onClick={openChangeAddComentModal}>
                        Agregar Comentario
                    </Button>
                    {selectedCommentIds.length > 0 &&
                        <Button className="eliminar" variant="danger" onClick={handleEliminarClick}>
                            Eliminar
                        </Button>
                    }
                    <Button className="cancelar" variant="secondary" onClick={close}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>

            <ModalAddComentario_Components
                isOpen={isOpenAddComentModal}
                isClose={closeChangeAddComentModal}
                fetchComentarios={fetchDatos}
                id_cliente={id}
            />
        </>
    )
}

export default Modal_Comentarios;
