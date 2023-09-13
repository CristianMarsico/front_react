import { useState } from 'react';
import { Button } from 'react-bootstrap';
import useAuth from '../../../helpers/auth/useAuth';
import useGetDatosBD from '../../../helpers/hooks/useGetDatosBD';
import { useModal } from '../../../helpers/hooks/useModal';
import { getAllHilado } from '../../../services/ProductoService';
import BtnIncremetarStock from './BtnTablaHilado/BtnIncremetarStock';
import BtnModificarPrecio from './BtnTablaHilado/BtnModificarPrecio';
import BtnTransferirStock from './BtnTablaHilado/BtnTransferirStock';
import BtnVender from './BtnTablaHilado/BtnVender';
import Modal_AddHilado_Components from './Modal/Modal_AddHilado_Components';
import Modal_ReporteVenta_Components from './Modal/Modal_ReporteVenta_Components';

const GeneralHilado_Components = () => {

    /**
     * Me traigo todos los datos realacionados a la Materia Prima
     * mediante el uso un un hook (helpers -> hooks -> useEnviarDatosBD)
     */
    const { respuesta, fetchDatos } = useGetDatosBD(getAllHilado);
    const [searchHilado, setSearchHilado] = useState('');
    let { tieneRol } = useAuth()

    const [isOpenAddHiladoModal, openChangeAddHiladoModal, closeChangeAddHiladoModal] = useModal()
    const [isOpenAddReporteModal, openChangeAddReporteModal, closeChangeAddReporteModal] = useModal()
    // const [isOpenAddProduccionModal, openChangeAddProduccionModal, closeChangeAddProduccionModal] = useModal()

    //realizo la busqueda de usuarios
    const filteredHilado = respuesta.filter((h) =>
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

                    <Button variant="warning" onClick={openChangeAddReporteModal}>
                        Reporte Ventas
                    </Button>

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
                                                    fetchHilado={fetchDatos}
                                                />
                                                <BtnTransferirStock
                                                    hilado={h}
                                                    fetchHilado={fetchDatos}
                                                />

                                                <BtnModificarPrecio
                                                    hilado={h}
                                                    fetchHilado={fetchDatos}
                                                />
                                                <BtnVender
                                                    hilado={h}
                                                    fetchHilado={fetchDatos}
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
                fetchHilado={fetchDatos}
                hilado={respuesta}
            />

            <Modal_ReporteVenta_Components
                open={isOpenAddReporteModal}
                close={closeChangeAddReporteModal}
            />

            {/* <Modal_EnPorduccion
                open={isOpenAddProduccionModal}
                close={closeChangeAddProduccionModal} />  */}

        </>
    )
}

export default GeneralHilado_Components