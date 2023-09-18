import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import useGetDatosBD from '../../../helpers/hooks/useGetDatosBD';
import { useModal } from '../../../helpers/hooks/useModal';
import { getAllVentas } from '../../../services/VentaServices';


import Modal_ReporteVenta_Components from './Modal/Modal_ReporteVenta_Components';


const General_TablaVentas_Components = () => {

    const { respuesta, fetchDatos } = useGetDatosBD(getAllVentas);
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
    const elementosFiltrados = respuesta.filter((c) => {
        if (!fechaInicio && !fechaFin) {
            return true
        }
        else {
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

    const fechaActual = new Date().toISOString().split('T')[0];

    return (
        <>
            <div className="table">
                <section className="table__header">
                    <h3>Ventas realizadas</h3>
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
                        PDF Ventas
                    </Button>

                </section>

                <section className="table__body">
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th> Producto</th>
                                    <th> Cantidad</th>
                                    <th> Total</th>
                                    <th> Origen</th>
                                    <th> tipo Consumidor</th>
                                    <th> Cliente</th>
                                    <th> Medio Pago</th>
                                    <th> Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {elementosFiltrados.length === 0 ? (
                                    <tr>
                                        <td colSpan="8">No se encontraron resultados</td>
                                    </tr>
                                ) : (
                                    elementosFiltrados.map((v) => {
                                        const fecha = new Date(v.fecha);
                                        const fechaFormateada = fecha.toLocaleDateString('es-ES');
                                        return (
                                            <tr key={v.id}>
                                                <td>{v.nombre_prod} {v.color}</td>
                                                <td>{v.cantidad}</td>
                                                <td>{v.precio}</td>
                                                <td>{v.stock_origen === "stock_buenosAires" ? "Bs. As." : "Lobería"}</td>
                                                <td>{v.tipo_venta === "precio_venta_minorista" ? "Minorista" : "Mayorista"}</td>
                                                <td>{v.cliente}</td>
                                                <td>{v.medio_pago}</td>
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

            <Modal_ReporteVenta_Components
                open={isOpenAddReporteModal}
                close={closeChangeAddReporteModal}
            />

        </>
    )
}

export default General_TablaVentas_Components