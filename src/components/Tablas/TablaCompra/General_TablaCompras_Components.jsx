import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import useGetDatosBD from '../../../helpers/hooks/useGetDatosBD';
import { useModal } from '../../../helpers/hooks/useModal';
import { getAllCompras } from '../../../services/CompraServices';
import Modal_Reporte from './Modal/Modal_Reporte';

/**
 * Componente que muestra una tabla de compras realizadas con opciones de filtrado y generación de informe.
 *
 * @returns {JSX.Element} Elemento que representa la tabla de compras.
 */
const General_TablaCompras_Components = () => {

    const { respuesta, fetchDatos } = useGetDatosBD(getAllCompras);
    const [isOpenAddReporteModal, openChangeAddReporteModal, closeChangeAddReporteModal] = useModal()

    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');


    const handleFechaInicioChange = (event) => {
        if (event.target.value == "") {
            setFechaInicio("");
        } else {
            let partesFecha = event.target.value.split("-");
            let anio = partesFecha[0];
            let mes = partesFecha[1];
            let dia = partesFecha[2];
            let fechaConvertida = anio + "-" + mes + "-" + dia;
            setFechaInicio(fechaConvertida);

        }
    };


    const handleFechaFinChange = (event) => {
        if (event.target.value == "") {
            setFechaFin("");
        } else {
            let partesFecha = event.target.value.split("-");
            let anio = partesFecha[0];
            let mes = partesFecha[1];
            let dia = partesFecha[2];
            let fechaConvertida = anio + "-" + mes + "-" + dia;
            setFechaFin(fechaConvertida);

        }
    };

    // Realizar el filtrado de compras por fecha
    const elementosFiltrados = respuesta.filter((c) => {
        if (!fechaInicio && !fechaFin) {
            return true
        }
        else {
            // Realizar el filtrado de compras por rango de fechas
            // El procesamiento necesario se debe realizar en los manejadores de eventos handleFechaInicioChange y handleFechaFinChange.
            let fechaOriginal = new Date(c.fecha);


            let anio = fechaOriginal.getFullYear();
            let mes = fechaOriginal.getMonth() + 1; // El mes se indexa desde 0, por lo que sumamos 1
            let dia = fechaOriginal.getDate();

            // Formatear el mes y el día con ceros a la izquierda si es necesario
            let mesFormateado = mes < 10 ? "0" + mes : mes;
            let díaFormateado = dia < 10 ? "0" + dia : dia;

            // Crear la fecha en formato "2023-09-01"
            let fechaConvertida = anio + "-" + mesFormateado + "-" + díaFormateado;

            if (!fechaInicio) {
                return fechaConvertida <= fechaFin;
            } else if (!fechaFin) {
                return fechaConvertida >= fechaInicio;
            } else {
                return fechaConvertida >= fechaInicio && fechaConvertida <= fechaFin;
            }
        }
    });

    // Obtener la fecha actual en formato ISO
    const fechaActual = new Date().toISOString().split('T')[0];

    return (
        <>
            <div className="table">
                <section className="table__header">
                    <h3>Compras Realizadas</h3>
                    <Form.Group className="mb-8">
                        <Form.Label>Desde: </Form.Label>
                        <Form.Control
                            type="date"
                            max={fechaActual}
                            value={fechaInicio || ''}
                            onChange={handleFechaInicioChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-8">
                        <Form.Label>Hasta: </Form.Label>
                        <Form.Control
                            type="date"
                            max={fechaActual}
                            value={fechaFin || ''}
                            onChange={handleFechaFinChange}
                        />
                    </Form.Group>

                    <Button variant="warning" onClick={openChangeAddReporteModal}>
                        PDF Compras
                    </Button>

                </section>

                <section className="table__body">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th> Producto</th>
                                    <th> Cantidad</th>
                                    <th> Costo de Compra</th>
                                    <th> Total</th>
                                    <th> Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {elementosFiltrados.length === 0 ? (
                                    <tr>
                                        <td colSpan="5">No se encontraron resultados</td>
                                    </tr>
                                ) : (
                                    elementosFiltrados.map((c) => {
                                        const fecha = new Date(c.fecha);
                                        const fechaFormateada = fecha.toLocaleDateString('es-ES');
                                        return (
                                            <tr key={c.id}>
                                                <td>{c.producto}</td>
                                                <td>{c.cantidad}</td>
                                                <td>{c.precio_unitario}</td>
                                                <td>{c.total}</td>
                                                <td>{fechaFormateada}</td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            <Modal_Reporte
                open={isOpenAddReporteModal}
                close={closeChangeAddReporteModal}
            />

        </>
    )
}

export default General_TablaCompras_Components