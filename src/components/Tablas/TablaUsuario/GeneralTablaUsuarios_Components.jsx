import { useEffect, useState } from 'react';
import { editarUsuario, eliminarUsuario, getAllUsarios } from '../../../services/UserServices';
import useAuth from '../../../helpers/auth/useAuth';

//COMPONENTES
import BotonesTablaUsuarios from './components_internos/BotonesTablaUsuarios';

/**
 * Componente que muestra una tabla de usuarios con funcionalidades de búsqueda, edición y eliminación.
 * @returns {JSX.Element} Elemento JSX que representa la tabla de usuarios.
 */
const GeneralTablaUsuarios_Components = () => {

    const [users, setUsers] = useState([]);
    const [searchUser, setSearchUser] = useState('');
    let { tieneRol } = useAuth()
    /**
       * Efecto secundario que se ejecuta después de que el componente se monta para cargar la lista de usuarios.
       */
    useEffect(() => {
        fetchUsers();
    }, []);

    /**
   * Función asincrónica que obtiene y actualiza la lista de usuarios desde el servidor.
   * @returns {void}
   */
    const fetchUsers = async () => {
        try {
            const response = await getAllUsarios();
            setUsers(response.data.results);
        } catch (err) {
            if (err)
                setUsers([]);
            else
                console.log(err)
        }
    };

    /**
       * Función asincrónica que maneja la eliminación de un usuario por ID y actualiza la lista de usuarios.
       * @param {number} userId - ID del usuario a eliminar.
       * @returns {void}
       */
    const handleDeleteUser = async (userId) => {
        try {
            await eliminarUsuario(userId);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    /**
   * Función asincrónica que maneja la edición de un usuario y actualiza la lista de usuarios.
   * @param {Object} user - Objeto que representa al usuario a editar.
   * @returns {void}
   */
    const handleEditUser = async (user) => {
        console.log(user)
        try {
            await editarUsuario(user)
            fetchUsers();
        } catch (error) {
            console.error('Error editar user:', error);
        }
    };

    /**
   * Filtra la lista de usuarios según el término de búsqueda.
   * @type {Array}
   */
    const filteredUsers = users.filter((u) =>
        u.usuario.toLowerCase().includes(searchUser.toLowerCase())
    );

    /**
       * Renderiza la tabla de usuarios con funciones de búsqueda, edición y eliminación.
       * @returns {JSX.Element} Elemento JSX que representa la tabla de usuarios.
       */
    return (
        <>
            <div className="table">
                <section className="table__header">
                    <h3>Listado de Usuarios</h3>
                    <div className="input-group">
                        <input
                            type="search"
                            placeholder="Buscar..."
                            value={searchUser}
                            onChange={(e) => setSearchUser(e.target.value)} />
                    </div>
                </section>
                <section className="table__body">
                    <table>
                        <thead>
                            <tr>
                                <th> Nombre</th>
                                <th> Usuario</th>
                                <th> Email</th>
                                {
                                    tieneRol("super_admin") &&
                                    <th> Acciones</th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="4">No se encontraron resultados</td>
                                </tr>
                            ) : (
                                filteredUsers.map((u) => (
                                    <tr key={u.id}>
                                        <td>{u.nombre}</td>
                                        <td>{u.usuario}</td>
                                        <td>{u.email}</td>
                                        {
                                            tieneRol("super_admin") &&
                                            <BotonesTablaUsuarios user={u}
                                                handleDeleteUser={handleDeleteUser}
                                                handleEditUser={handleEditUser}
                                            />
                                        }
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    )
}

export default GeneralTablaUsuarios_Components