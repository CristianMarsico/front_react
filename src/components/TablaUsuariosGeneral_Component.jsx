import { useState } from 'react';

//COMPONENTES
import BotonesTablaUsuarios from './TablaUsuario/BotonesTablaUsuarios';

//IMAGENES
import Lupa from "../../src/images/search.png";

const TablaUsuarioComponent = ({ datos }) => {

    let [search, setSearch] = useState("");

    // let [datosFiltrados, setDatosFiltrados] = useState([]);

    // let [selectedCheck, setSelectedCheck] = useState({
    //     admin: "false",
    //     regular: "false"
    // });

    let results = [];
    if (!search) {
        results = datos;
    }
    else {
        results = datos.filter((filtrarPor) =>
            //ACA DETERMINO POR QUE CAMPO BUSCAR
            filtrarPor.usuario.toLowerCase().includes(search.toLocaleLowerCase())
        );
    }

    const buscarPorUsuario = (e) => {
        setSearch(e.target.value);
    }



    return (
        < div >
            <form action="" className='search'>
                <input value={search} onChange={buscarPorUsuario} type="text" placeholder='search'></input>
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
                        datos.length > 0 &&

                        results.map((user) =>
                            <tr key={user.id}>
                                <td>{user.nombre}</td>
                                <td>{user.email}</td>
                                <td>{user.usuario}</td>
                                <td>{user.nombre}</td>
                                <BotonesTablaUsuarios user={user} />
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div >
    )
}

export default TablaUsuarioComponent