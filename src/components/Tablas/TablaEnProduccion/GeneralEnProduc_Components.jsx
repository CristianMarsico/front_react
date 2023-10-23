import React from 'react'
import useGetDatosBD from '../../../helpers/hooks/useGetDatosBD';
import { getAllEnProduccion } from '../../../services/EnProduccionServices';



const GeneralEnProduc_Components = () => {
    const { respuesta, fetchDatos } = useGetDatosBD(getAllEnProduccion);
    return (
        <>
            <div className="table">
                <section className="table__header">
                    <h3>MP en Produccion</h3>
                </section>

                <section className="table__body">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th> MP En Produccion</th>
                                    <th> stock</th>
                                    <th> FECHA</th>
                                    {/* {
                                        tieneRol("super_admin") &&
                                        <th> Acciones</th>
                                    } */}
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
                                            <tr key={ep.id_cliente}>
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


        </>
    )
}

export default GeneralEnProduc_Components