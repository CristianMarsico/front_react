import { useState, useEffect } from 'react';

const useGetDatosBD = (fetchFunction) => {
    const [respuesta, setRespuesta] = useState([]);
    const [loading, setLoading] = useState(true);

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
        fetchDatos();
    }, [fetchFunction]);

    return { respuesta, loading, fetchDatos };
};

export default useGetDatosBD;



