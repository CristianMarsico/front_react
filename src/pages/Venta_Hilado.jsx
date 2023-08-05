import React, { useEffect, useState } from 'react'
import GeneralVenta_component from '../components/Venta/GeneralVenta_component';
import useAuth from '../helpers/auth/useAuth';
import { getProductoByName } from '../services/ProductoService';

const Venta_Hilado = () => {

    const { tieneToken } = useAuth();
    const [productos, setProductos] = useState([]);

    if (!tieneToken()) deleteUserLocal();

    useEffect(() => {
        getProductos();
    }, [])

    async function getProductos() {
        try {
            let response = await getProductoByName();
            let product = response.data.response;
            setProductos(product);
        } catch (err) {
            if (err.response)
                return mostrarAlertError(err.response.data.error);
            else
                mostrarAlertError("Error de red. Inténtalo más tarde.");
        }
    }

    return (
        <GeneralVenta_component
            getProductos={getProductos}
            productos={productos}
        />
    )
}

export default Venta_Hilado