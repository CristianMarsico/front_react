import { useEffect, useState } from 'react';
import '../../../css/tabla.css'
import useAuth from '../../../helpers/auth/useAuth';
import { Table } from 'react-bootstrap';
import { getAllMP } from '../../../services/MateriaPrima';
import BotonesTablaUsuarios from '../TablaUsuario/components_internos/BotonesTablaUsuarios';
import Lupa from '../../../images/search.png'

const GeneralTablaMP_Components = () => {
    const [materiaPrima, setMateriaPrima] = useState([]);
    const [searchMP, setSearchMP] = useState('');
    let { user, tieneRol } = useAuth()

    useEffect(() => {
        fetchMateriaPrima();
    }, []);

    const fetchMateriaPrima = async () => {
        try {
            const response = await getAllMP();
            setMateriaPrima(response.data.response);
        } catch (err) {
            if (err)
                setMateriaPrima([]);
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
    const filteredMP = materiaPrima.filter((mp) =>

        mp.nombre?.toLowerCase().includes(searchMP.toLowerCase())
    );

    return (
        <>
            <div className="table">
                <section className="table__header">
                    <h3>Listado de Materia Prima</h3>
                    <div className="input-group">
                        <input
                            type="search"
                            placeholder="Buscar..."
                            value={searchMP}
                            onChange={(e) => setSearchMP(e.target.value)} />
                    </div>
                </section>
                <section className="table__body">
                    <table>
                        <thead>
                            <tr>
                                <th> Nombre</th>
                                <th> Stock</th>
                                <th> Precio</th>
                                <th> Acciones</th>
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
                                        <td>{mp.stock}</td>
                                        <td>{mp.precio}</td>
                                        {
                                            tieneRol("super_admin") &&
                                            <BotonesTablaUsuarios user={mp}
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

export default GeneralTablaMP_Components