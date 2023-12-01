import { useState, useEffect } from 'react';

/**
 * Hook personalizado para obtener datos de una base de datos.
 *
 * @param {Function} fetchFunction - Función que realiza la solicitud para obtener datos de la base de datos.
 * @returns {Object} - Un conjunto de funciones y valores relacionados con la obtención de datos.
 */
const useGetDatosBD = (fetchFunction) => {
    const [respuesta, setRespuesta] = useState([]);
    const [loading, setLoading] = useState(true);

    /**
     * Función para realizar la solicitud y obtener datos de la base de datos.
     */
    const fetchDatos = async () => {
        try {
            const response = await fetchFunction();
            setRespuesta(response.data.response);
        } catch (err) {
            if (err) {
                setRespuesta([]);
            } else {
                console.log(err);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Realizar la solicitud cuando el componente se monta o cuando la función de solicitud cambia.
        fetchDatos();
    }, [fetchFunction]);

    return {
        respuesta, // Los datos obtenidos de la base de datos
        loading, // Un indicador que muestra si la solicitud está en curso
        fetchDatos // Función para volver a realizar la solicitud
    };
};

export default useGetDatosBD;