import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import '../../../css/tabla.css'
import useAuth from '../../../helpers/auth/useAuth';
import { useModal } from '../../../helpers/hooks/useModal';
import { getAllHilado } from '../../../services/ProductoService';
import BtnIncremetarStock from './BtnTablaHilado/BtnIncremetarStock';
import BtnModificarPrecio from './BtnTablaHilado/BtnModificarPrecio';
import BtnTransferirStock from './BtnTablaHilado/BtnTransferirStock';
import BtnVender from './BtnTablaHilado/BtnVender';
import Modal_AddHilado_Components from './Modal/Modal_AddHilado_Components';

const GeneralHilado_Components = () => {
    const [hilado, setHilado] = useState([]);
    const [searchHilado, setSearchHilado] = useState('');
    let { tieneRol } = useAuth()

    const [isOpenAddHiladoModal, openChangeAddHiladoModal, closeChangeAddHiladoModal] = useModal()
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
                    <Button variant="primary" onClick={openChangeAddHiladoModal}>
                        Agregar Hilado
                    </Button>

                    {/* <Button variant="warning" onClick={openChangeAddReporteModal}>
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
                                <th> Color</th>
                                <th> Stock Loberia</th>
                                <th> Stock Bs. As.</th>
                                <th> Precio Mayorista</th>
                                <th> Precio Minorista</th>
                                {
                                    tieneRol("super_admin") &&
                                    <th> Acciones</th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {filteredHilado.length === 0 ? (
                                <tr>
                                    <td colSpan="7">No se encontraron resultados</td>
                                </tr>
                            ) : (
                                filteredHilado.map((h) => (
                                    <tr key={h.id}>
                                        <td>{h.producto_terminado}</td>
                                        <td>{h.color}</td>
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

                                                <BtnIncremetarStock
                                                    hilado={h}
                                                    fetchHilado={fetchHilado}
                                                />
                                                <BtnTransferirStock
                                                    hilado={h}
                                                    fetchHilado={fetchHilado}
                                                />

                                                <BtnModificarPrecio
                                                    hilado={h}
                                                    fetchHilado={fetchHilado}
                                                />
                                                <BtnVender
                                                    hilado={h}
                                                    fetchHilado={fetchHilado}
                                                />


                                            </td>
                                        }
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </section>
            </div>
            <Modal_AddHilado_Components
                isOpen={isOpenAddHiladoModal}
                close={closeChangeAddHiladoModal}
                fetchHilado={fetchHilado}
                hilado={hilado}
            />

            {/* <Modal_Reporte
                open={isOpenAddReporteModal}
                close={closeChangeAddReporteModal}
            />

            <Modal_EnPorduccion
                open={isOpenAddProduccionModal}
                close={closeChangeAddProduccionModal} />  */}
        </>
    )
}

export default GeneralHilado_Components