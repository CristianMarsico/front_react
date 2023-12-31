import { useState } from 'react';
import useAuth from '../../../helpers/auth/useAuth';
import { Button } from 'react-bootstrap';
import { getAllMP } from '../../../services/MateriaPrimaServices';
import { useModal } from '../../../helpers/hooks/useModal';
import ModalCompraMP_Components from './Modal/ModalCompraMP_Components';
import BtnEliminarMP from './BtnMateriaPrima/BtnEliminarMP';
import BtnEditarMP from './BtnMateriaPrima/BtnEditarMP';
import BtnDescontarStock from './BtnMateriaPrima/BtnDescontarStock';
import useGetDatosBD from '../../../helpers/hooks/useGetDatosBD';



const GeneralTablaMP_Components = () => {
    /**
     * Me traigo todos los datos realacionados a la Materia Prima
     * mediante el uso un un hook (helpers -> hooks -> useEnviarDatosBD)
     */
    const { respuesta, fetchDatos } = useGetDatosBD(getAllMP);
    const [searchMP, setSearchMP] = useState('');
    let { tieneRol } = useAuth()

    const [isOpenAddMPModal, openChangeAddMPModal, closeChangeAddMPModal] = useModal()
    // const [isOpenAddReporteModal, openChangeAddReporteModal, closeChangeAddReporteModal] = useModal()

    //realizo la busqueda de usuarios 
    const filteredMP = respuesta.filter((mp) =>
        mp.nombre?.toLowerCase().includes(searchMP.toLowerCase())
    );

    return (
        <>
            <div className="table">
                <section className="table__header">
                    <h3>Materia Prima</h3>
                    <Button variant="primary" onClick={openChangeAddMPModal}>
                        Agregar Compra
                    </Button>
                    <div className="input-group">
                        <input
                            type="search"
                            placeholder="Buscar..."
                            value={searchMP}
                            onChange={(e) => setSearchMP(e.target.value)} />
                    </div>
                </section>

                <section className="table__body">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th> Nombre</th>
                                    <th> Stock</th>
                                    <th> Precio de Compra</th>
                                    {
                                        tieneRol("super_admin") &&
                                        <th> Acciones</th>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMP.length === 0 ? (
                                    <tr>
                                        <td colSpan="4">No se encontraron resultados</td>
                                    </tr>
                                ) : (
                                    filteredMP.map((mp) => (
                                        <tr key={mp.id}>
                                            <td>{mp.nombre}</td>
                                            <td className={mp.stock > 0 ? '' : 'sin-stock'}>
                                                {
                                                    mp.stock > 0 ? mp.stock : <span>Agotado</span>

                                                }
                                            </td>
                                            <td>{mp.precio}</td>

                                            {
                                                tieneRol("super_admin") &&
                                                <td className="td_btn">
                                                    <BtnEditarMP
                                                        mp={mp}
                                                        fetchMateriaPrima={fetchDatos}
                                                    />
                                                    <BtnEliminarMP
                                                        mp={mp}
                                                        fetchMateriaPrima={fetchDatos}
                                                    />
                                                    <BtnDescontarStock
                                                        mp={mp}
                                                        fetchMateriaPrima={fetchDatos}
                                                    />
                                                </td>
                                            }
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            <ModalCompraMP_Components
                isOpen={isOpenAddMPModal}
                close={closeChangeAddMPModal}
                fetchMateriaPrima={fetchDatos}
                materiaPrima={respuesta}
            />
        </>
    )
}
export default GeneralTablaMP_Components