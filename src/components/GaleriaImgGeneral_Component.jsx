import React from 'react'
import ListaImg_Components from '../components/GaleriaFotos/ListaImg_Components';

const GaleriaImgGeneral_Component = ({ datos }) => {
    return (
        <div>
            <h1>Galería de imágenes</h1>
            <div className="contenedor_tarjeta_principal">
                {datos.map(imageFileName => (
                    <ListaImg_Components
                        key={imageFileName.id}
                        id_imagen={imageFileName.id_imagen}
                        descripcion={imageFileName.descripcion}
                        nombre={imageFileName.producto_terminado}
                        imagen={imageFileName.ruta_archivo}
                    />
                ))}
            </div>
        </div>
    )
}

export default GaleriaImgGeneral_Component