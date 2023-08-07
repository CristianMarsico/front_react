import { useEffect, useState } from 'react';
import '../../../css/tabla.css'
import { editarUsuario, eliminarUsuario, getAllUsarios } from '../../../services/UserServices';
import useAuth from '../../../helpers/auth/useAuth';

//COMPONENTES
import BotonesTablaUsuarios from './components_internos/BotonesTablaUsuarios';

//IMAGENES
// import Lupa from "../../images/search.png";
import { Table } from 'react-bootstrap';


const GeneralTablaUsuarios_Components = () => {

    const [users, setUsers] = useState([]);
    const [searchUser, setSearchUser] = useState('');
    let { user, tieneRol } = useAuth()

    useEffect(() => {
        fetchUsers();
    }, []);

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


    const handleDeleteUser = async (userId) => {
        try {
            await eliminarUsuario(userId);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEditUser = async (user) => {
        try {
            await editarUsuario(user)
            fetchUsers();
        } catch (error) {
            console.error('Error editar user:', error);
        }
    };

    //realizo la busqueda de usuarios 
    const filteredUsers = users.filter((u) =>
        u.usuario.toLowerCase().includes(searchUser.toLowerCase())
    );

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
                                <th> Acciones</th>
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