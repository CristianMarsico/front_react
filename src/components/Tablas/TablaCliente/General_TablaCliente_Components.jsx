import React, { useState } from 'react'
import { getAllClientes } from '../../../services/ClienteServices';
import useGetDatosBD from '../../../helpers/hooks/useGetDatosBD';
import useAuth from '../../../helpers/auth/useAuth';
import BtnEditarCliente from './BtnCliente/BtnEditarCliente';
import BtnComentarios from './BtnCliente/BtnComentarios';

/**
 * Componente que muestra una tabla de clientes y permite buscar y editar clientes.
 * @returns {JSX.Element} Elemento que representa la tabla de clientes.
 */
const General_TablaCliente_Components = () => {
    const { respuesta, fetchDatos } = useGetDatosBD(getAllClientes);
    const [searchUser, setSearchUser] = useState('');
    let { tieneRol } = useAuth()

    // Filtra los clientes que coinciden con el término de búsqueda
    const filteredClients = respuesta.filter((c) =>
        c.nombre.toLowerCase().includes(searchUser.toLowerCase())
    );

    return (
        <>
            <div className="table">
                <section className="table__header">
                    <h3>Mis Clientes</h3>
                    <div className="input-group">
                        <input
                            type="search"
                            placeholder="Buscar..."
                            value={searchUser}
                            onChange={(e) => setSearchUser(e.target.value)} />
                    </div>
                </section>

                <section className="table__body">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th> Cliente</th>
                                    <th> Dirección</th>
                                    <th> E_Mail</th>
                                    <th> Teléfono</th>
                                    {
                                        tieneRol("super_admin") &&
                                        <th> Acciones</th>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {filteredClients?.length === 0 ? (
                                    <tr>
                                        <td colSpan="5">No se encontraron resultados</td>
                                    </tr>
                                ) : (
                                    filteredClients?.map((c) => {
                                        return (
                                            <tr key={c.id_cliente}>
                                                <td >{c.nombre}
                                                   
                                                </td>
                                                <td>{c.direccion == "" ? "sin definir" : c.direccion}</td>
                                                <td>{c.email == "" ? "sin definir" : c.email}</td>
                                                <td>{c.telefono == "" ? "sin definir" : c.telefono}</td>
                                                <td className="td_btn">
                                                    <BtnEditarCliente
                                                        cliente={c}
                                                        fetchCliente={fetchDatos}
                                                    />

                                                    <BtnComentarios
                                                        id={c.id_cliente}
                                                    /> 
                                                </td>
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

export default General_TablaCliente_Components