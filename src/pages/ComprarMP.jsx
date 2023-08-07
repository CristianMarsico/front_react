import React, { useEffect, useState } from 'react';
import useAuth from '../helpers/auth/useAuth';
import { getMPByName } from '../services/MateriaPrima';
import GeneralCompra_Component from '../components/Compra/GeneralCompra_Component';


const ComprarMP = () => {

    const { tieneToken, deleteUserLocal } = useAuth();
    const [productos, setProductos] = useState([]);

    if (!tieneToken()) deleteUserLocal();

    useEffect(() => {
        getMPPorNombre();
    }, [])

    async function getMPPorNombre() {
        try {
            let response = await getMPByName();
            let mp = response.data.response;
            setProductos(mp);
        } catch (err) {
            if (err.response)
                return mostrarAlertError(err.response.data.error);
            else
                mostrarAlertError("Error de red. Inténtalo más tarde.");
        }
    }

    return (
        <>
            <GeneralCompra_Component
                getMPPorNombre={getMPPorNombre}
                productos={productos}
            />
        </>
    )
}

export default ComprarMP




