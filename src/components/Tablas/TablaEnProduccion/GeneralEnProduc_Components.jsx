import React from 'react'
import { Button } from 'react-bootstrap';
import useGetDatosBD from '../../../helpers/hooks/useGetDatosBD';
import { useModal } from '../../../helpers/hooks/useModal';
import { getAllEnProduccion } from '../../../services/EnProduccionServices';
import Modal_EnPorduccion from './Modal/Modal_EnPorduccion';


/**
 * Componente para mostrar y gestionar la información general de Materia Prima en Producción.
 *
 * @component
 */
const GeneralEnProduc_Components = () => {
    const { respuesta } = useGetDatosBD(getAllEnProduccion);
    const [isOpenAddProduccionModal, openChangeAddProduccionModal, closeChangeAddProduccionModal] = useModal()

    return (
        <>
            <div className="table">
                <section className="table__header">
                    <h3>MP en Produccion</h3>
                    <Button variant="warning" onClick={openChangeAddProduccionModal}>
                        PDF En Producción
                    </Button>
                </section>


                <section className="table__body">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th> MP En Produccion</th>
                                    <th> stock</th>
                                    <th> FECHA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {respuesta?.length === 0 ? (
                                    <tr>
                                        <td colSpan="3">No se encontraron resultados</td>
                                    </tr>
                                ) : (
                                    respuesta?.map((ep) => {
                                        const fecha = new Date(ep.fecha);
                                        const fechaFormateada = fecha.toLocaleDateString('es-ES');                                        
                                        return (
                                            <tr key={ep.id}>
                                                <td>{ep.nombre}</td>
                                                <td>{ep.stock}</td>
                                                <td>{fechaFormateada}</td>
                                                {/* <td className="td_btn">
                                                    <BtnEditarCliente
                                                        cliente={c}
                                                        fetchCliente={fetchDatos}
                                                    />
                                                </td> */}
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            <Modal_EnPorduccion
                open={isOpenAddProduccionModal}
                close={closeChangeAddProduccionModal} />
        </>
    )
}

export default GeneralEnProduc_Components