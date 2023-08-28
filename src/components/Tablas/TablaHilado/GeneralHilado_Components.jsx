import { useEffect, useState } from 'react';
import '../../../css/tabla.css'
import useAuth from '../../../helpers/auth/useAuth';
import { getAllHilado } from '../../../services/ProductoService';
import BtnTransferirStock from '../../botones/BotonesHilado/BtnTransferirStock';
// import { Button } from 'react-bootstrap';
// import { getAllMP } from '../../../services/MateriaPrimaServices';
// import { useModal } from '../../../helpers/hooks/useModal';
// import ModalCompraMP_Components from './Modal/ModalCompraMP_Components';

// import BtnEditarMP from '../../botones/BotonesMateriaPrima/BtnEditarMP';
// import BtnEliminarMP from '../../botones/BotonesMateriaPrima/BtnEliminarMP';
// import BtnDescontarStock from '../../botones/BotonesMateriaPrima/BtnDescontarStock';
// import Modal_Reporte from './Modal/Modal_Reporte';
// import Modal_EnPorduccion from './Modal/Modal_EnPorduccion';

const GeneralHilado_Components = () => {
    const [hilado, setHilado] = useState([]);
    const [searchHilado, setSearchHilado] = useState('');
    let { tieneRol } = useAuth()

    // const [isOpenAddMPModal, openChangeAddMPModal, closeChangeAddMPModal] = useModal()
    // const [isOpenAddReporteModal, openChangeAddReporteModal, closeChangeAddReporteModal] = useModal()
    // const [isOpenAddProduccionModal, openChangeAddProduccionModal, closeChangeAddProduccionModal] = useModal()

    useEffect(() => {
        fetchHilado();
    }, []);

    const fetchHilado = async () => {
        try {
            const response = await getAllHilado();
            setHilado(response.data.response);
        } catch (err) {
            if (err)
                setHilado([]);
            else
                console.log(err)
        }
    };

    //realizo la busqueda de usuarios
    const filteredHilado = hilado.filter((h) =>
        h.producto_terminado?.toLowerCase().includes(searchHilado.toLowerCase())
    );
    return (
        <>
            <div className="table">
                <section className="table__header">
                    <h3>Hilado</h3>
                    {/* <Button variant="primary" onClick={openChangeAddMPModal}>
                        Agregar Compra
                    </Button>

                    <Button variant="warning" onClick={openChangeAddReporteModal}>
                        Reporte Compras
                    </Button> */}

                    {/* <Button variant="warning" onClick={openChangeAddProduccionModal}>
                        Reporte en Producción
                    </Button> */}
                    <div className="input-group">
                        <input
                            type="search"
                            placeholder="Buscar..."
                            value={searchHilado}
                            onChange={(e) => setSearchHilado(e.target.value)}
                        />
                    </div>
                </section>

                <section className="table__body">
                    <table>
                        <thead>
                            <tr>
                                <th> Nombre</th>
                                <th> Stock Loberia</th>
                                <th> Stock Bs. As.</th>
                                <th> Precio Mayorista</th>
                                <th> Precio Minorista</th>
                                <th> Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredHilado.length === 0 ? (
                                <tr>
                                    <td colSpan="6">No se encontraron resultados</td>
                                </tr>
                            ) : (
                                filteredHilado.map((h) => (
                                    <tr key={h.id}>
                                        <td>{h.producto_terminado}</td>
                                        <td className={h.stock_loberia > 0 ? '' : 'sin-stock'}>
                                            {
                                                h.stock_loberia > 0 ? h.stock_loberia : <span>sin stock</span>

                                            }
                                        </td>
                                        <td className={h.stock_buenosAires > 0 ? '' : 'sin-stock'}>
                                            {
                                                h.stock_buenosAires > 0 ? h.stock_buenosAires : <span>sin stock</span>

                                            }
                                        </td>
                                        <td>{h.precio_venta_mayorista}</td>
                                        <td>{h.precio_venta_minorista}</td>

                                        {
                                            tieneRol("super_admin") &&
                                            <td className="td_btn">
                                                {/* <BtnEditarMP
                                                    mp={mp}
                                                    fetchMateriaPrima={fetchMateriaPrima}
                                                /> */}
                                                <BtnTransferirStock
                                                    hilado={h}
                                                    fetchHilado={fetchHilado}
                                                />
                                                {/* <BtnEliminarMP
                                                    mp={mp}
                                                    fetchMateriaPrima={fetchMateriaPrima}
                                                />
                                                <BtnDescontarStock
                                                    mp={mp}
                                                    fetchMateriaPrima={fetchMateriaPrima}
                                                /> */}
                                            </td>
                                        }
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </section>
            </div>
            {/* <ModalCompraMP_Components
                isOpen={isOpenAddMPModal}
                close={closeChangeAddMPModal}
                fetchMateriaPrima={fetchMateriaPrima}
                materiaPrima={materiaPrima}
            />

            <Modal_Reporte
                open={isOpenAddReporteModal}
                close={closeChangeAddReporteModal}
            />

            <Modal_EnPorduccion
                open={isOpenAddProduccionModal}
                close={closeChangeAddProduccionModal} /> */}
        </>
    )
}

export default GeneralHilado_Components