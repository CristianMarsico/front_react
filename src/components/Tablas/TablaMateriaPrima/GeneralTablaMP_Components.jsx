import { useEffect, useState } from 'react';
import '../../../css/tabla.css'
import useAuth from '../../../helpers/auth/useAuth';
import { Button } from 'react-bootstrap';
import { getAllMP } from '../../../services/MateriaPrima';
import { useModal } from '../../../helpers/hooks/useModal';
import ModalCompraMP_Components from './Modal/ModalCompraMP_Components';

import BtnEditarMP from '../../botones/BotonesMateriaPrima/BtnEditarMP';
import BtnEliminarMP from '../../botones/BotonesMateriaPrima/BtnEliminarMP';
import BtnDescontarStock from '../../botones/BotonesMateriaPrima/BtnDescontarStock';


const GeneralTablaMP_Components = () => {
    const [materiaPrima, setMateriaPrima] = useState([]);
    const [searchMP, setSearchMP] = useState('');
    let { tieneRol } = useAuth()

    const [isOpenAddMPModal, openChangeAddMPModal, closeChangeAddMPModal] = useModal()

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



    //realizo la busqueda de usuarios 
    const filteredMP = materiaPrima.filter((mp) =>
        mp.nombre?.toLowerCase().includes(searchMP.toLowerCase())
    );

    return (
        <>
            <div className="table">
                <section className="table__header">
                    <h3>Listado de Materia Prima</h3>
                    <Button variant="primary" onClick={openChangeAddMPModal}>
                        Agregar Materia Prima
                    </Button>
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
                                        <td className={mp.stock > 0 ? '' : 'sin-stock'}>
                                            {
                                                mp.stock > 0 ? mp.stock : <span>sin stock</span>

                                            }
                                        </td>
                                        <td>{mp.precio}</td>
                                        {
                                            tieneRol("super_admin") &&
                                            <td className="td_btn">
                                                <BtnEditarMP
                                                    mp={mp}
                                                    fetchMateriaPrima={fetchMateriaPrima}
                                                />

                                                <BtnEliminarMP
                                                    mp={mp}
                                                    fetchMateriaPrima={fetchMateriaPrima}
                                                />

                                                <BtnDescontarStock
                                                    mp={mp}
                                                    fetchMateriaPrima={fetchMateriaPrima}
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
            <ModalCompraMP_Components
                isOpen={isOpenAddMPModal}
                close={closeChangeAddMPModal}
                fetchMateriaPrima={fetchMateriaPrima}
                materiaPrima={materiaPrima}
            />
        </>
    )
}
export default GeneralTablaMP_Components