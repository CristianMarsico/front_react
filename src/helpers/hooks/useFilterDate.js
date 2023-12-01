import { useState } from 'react';


/**
 * Hook personalizado para filtrar datos por un rango de fechas.
 *
 * @param {Array} initialData - Los datos iniciales que se filtrarán.
 * @param {Function} filterFunction - La función de filtro personalizada para aplicar.
 * @returns {Object} - Un conjunto de funciones y valores relacionados con el filtro de fechas.
 */
export const useFilterDate = (initialData, filterFunction) => {
    const [data, setData] = useState(initialData);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');


    /**
     * Maneja el cambio en la fecha de inicio y actualiza el estado correspondiente.
     *
     * @param {Event} event - El evento de cambio de fecha.
     */
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


    /**
     * Maneja el cambio en la fecha de fin y actualiza el estado correspondiente.
     *
     * @param {Event} event - El evento de cambio de fecha.
     */
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


    /**
     * Filtra los datos en base a las fechas de inicio y fin especificadas.
     * Si no se especifica ningún rango de fechas, se restablecen los datos originales.
     */
    const filterData = () => {
        if (!fechaInicio && !fechaFin) {
            setData(initialData);
        } else {
            setData(initialData.filter(filterFunction));
        }
    };

    return {
        data, // Los datos filtrados
        fechaInicio, // La fecha de inicio seleccionada
        fechaFin, // La fecha de fin seleccionada
        handleFechaInicioChange, // Función para manejar el cambio de fecha de inicio
        handleFechaFinChange, // Función para manejar el cambio de fecha de fin
        filterData, // Función para aplicar el filtro de fechas
    };
};