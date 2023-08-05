import React, { useEffect, useState } from 'react';
import useAuth from '../helpers/auth/useAuth';
import { getAll } from '../services/MateriaPrima';
import GeneralCompra_Component from '../components/Compra/GeneralCompra_Component';


const ComprarMP = () => {

    const { tieneToken, deleteUserLocal } = useAuth();
    const [productos, setProductos] = useState([]);

    if (!tieneToken()) deleteUserLocal();

    useEffect(() => {
        getAllMP();
    }, [])

    async function getAllMP() {
        try {
            let response = await getAll();
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
                getAllMP={getAllMP}
                productos={productos}
            />
        </>
    )
}

export default ComprarMP




