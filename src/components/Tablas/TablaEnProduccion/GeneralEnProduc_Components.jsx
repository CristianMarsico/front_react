import React from 'react'
import { Button } from 'react-bootstrap';
import useAuth from '../../../helpers/auth/useAuth';
import useGetDatosBD from '../../../helpers/hooks/useGetDatosBD';
import { useModal } from '../../../helpers/hooks/useModal';
import { getAllEnProduccion } from '../../../services/EnProduccionServices';
import BtnEliminarEnProduccion from './BtnEnProduccion/BtnEliminarEnProduccion';
import Modal_EnProduccion from './Modal/Modal_EnProduccion';



/**
 * Componente para mostrar y gestionar la información general de Materia Prima en Producción.
 *
 * @component
 */
const GeneralEnProduc_Components = () => {
    const { respuesta, fetchDatos } = useGetDatosBD(getAllEnProduccion);
    const [isOpenAddProduccionModal, openChangeAddProduccionModal, closeChangeAddProduccionModal] = useModal()

    let { tieneRol } = useAuth()
    return (
        <>
            <div className="table">
                <section className="table__header">
                    <h3>En Producción</h3>
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
                                    <th> Stock</th>
                                    <th> Fecha</th>
                                    <th> Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {respuesta?.length === 0 ? (
                                    <tr>
                                        <td colSpan="4">No se encontraron resultados</td>
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

                                                {
                                                    tieneRol("super_admin") &&
                                                    <td className="td_btn">
                                                        <BtnEliminarEnProduccion
                                                            mp_prod={ep}
                                                            fetchMateriaPrima={fetchDatos}
                                                        />
                                                    </td>
                                                }
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            <Modal_EnProduccion
                open={isOpenAddProduccionModal}
                close={closeChangeAddProduccionModal} />
        </>
    )
}

export default GeneralEnProduc_Components