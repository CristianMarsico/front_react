import { useEffect, useState } from 'react';
import { editarUsuario, eliminarUsuario, getAllUsarios } from '../../services/UserServices';

//COMPONENTES
import BotonesTablaUsuarios from './components_internos/BotonesTablaUsuarios';

//IMAGENES
import Lupa from "../../images/search.png";
import useAuth from '../../helpers/auth/useAuth';
// import EditUserModal_Component from './components_internos/EditUserModal_Component';

const TablaUsuarioComponent = () => {

    const [users, setUsers] = useState([]);
    const [searchUser, setSearchUser] = useState('');
    let { user } = useAuth()
    // const [isOpenChangeEditModal, openChangeEditModal, closeChangeEditModal] = EditUserModal_Component()


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
        < div >
            <form action="" className='search'>
                <input value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    type="text"
                    placeholder='search'>
                </input>
                <button type='submit'><img src={Lupa}></img></button>
            </form>

            <table className="tabla">
                <caption>LISTA DE USUARIOS</caption>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Rol Usuario</th>
                        <th>Usuario</th>
                        <th>Usuario</th>
                        <th>Botones</th>
                    </tr>
                </thead>
                <tbody id="lista">
                    {
                        users.length > 0 ?
                            filteredUsers.map((u) =>
                                user.usuario != u.usuario &&
                                <tr key={u.id}>
                                    <td>{u.nombre}</td>
                                    <td>{u.email}</td>
                                    <td>{u.usuario}</td>
                                    <td>{u.nombre}</td>
                                    <BotonesTablaUsuarios user={u}
                                        handleDeleteUser={handleDeleteUser}
                                        handleEditUser={handleEditUser}
                                    />
                                </tr>
                            )
                            :
                            <tr key={-1}>
                                <td>No hay usuarios en la base de datos</td>
                            </tr>
                    }
                </tbody>
            </table>
        </div >
    )
}

export default TablaUsuarioComponent