import { useEffect, useState } from 'react';
import { editarUsuario, eliminarUsuario, getAllUsarios } from '../../services/UserServices';
import useAuth from '../../helpers/auth/useAuth';

//COMPONENTES
import BotonesTablaUsuarios from './components_internos/BotonesTablaUsuarios';

//IMAGENES
import Lupa from "../../images/search.png";
import { Table } from 'react-bootstrap';


const TablaUsuarioComponent = () => {

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
            {/* <form action="" className='search'>
                <input value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    type="text"
                    placeholder='search'>
                </input>
                <button type='submit'><img src={Lupa}></img></button>
            </form> */}
            < div className='contenedor-tabla' >
                <div className='contenedor-tabla-hijo'>


                    <Table striped bordered variant="dark" className="tabla">
                        <caption>LISTA DE USUARIOS</caption>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Usuario</th>
                                <th>Email</th>
                                {
                                    tieneRol("super_admin") &&
                                    < th > Botones</th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.length > 0
                                    ?
                                    filteredUsers.map((u) =>
                                        user.usuario != u.usuario &&
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
                                    )
                                    :
                                    <tr key={-1}>
                                        <td>No hay usuarios en la base de datos</td>
                                    </tr>
                            }
                        </tbody>
                    </Table>
                </div>
            </div >
        </>
    )
}

export default TablaUsuarioComponent