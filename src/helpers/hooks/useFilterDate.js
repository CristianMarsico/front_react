import { useState } from 'react';

export const useFilterDate = (initialData, filterFunction) => {
    const [data, setData] = useState(initialData);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    const handleFechaInicioChange = (event) => {
        if (event.target.value === '') {
            setFechaInicio('');
        } else {
            const partesFecha = event.target.value.split('-');
            const anio = partesFecha[0];
            const mes = partesFecha[1];
            const dia = partesFecha[2];
            const fechaConvertida = `${anio}-${mes}-${dia}`;
            setFechaInicio(fechaConvertida);
        }
    };

    const handleFechaFinChange = (event) => {
        if (event.target.value === '') {
            setFechaFin('');
        } else {
            const partesFecha = event.target.value.split('-');
            const anio = partesFecha[0];
            const mes = partesFecha[1];
            const dia = partesFecha[2];
            const fechaConvertida = `${anio}-${mes}-${dia}`;
            setFechaFin(fechaConvertida);
        }
    };

    const filterData = () => {
        if (!fechaInicio && !fechaFin) {
            setData(initialData);
        } else {
            setData(initialData.filter(filterFunction));
        }
    };

    return {
        data,
        fechaInicio,
        fechaFin,
        handleFechaInicioChange,
        handleFechaFinChange,
        filterData,
    };
};