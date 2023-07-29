import React from 'react'
const ListaImg_Components = ({ id_imagen, descripcion, nombre, imagen }) => {

    return (
        <div className="contenedor_tarjeta">
            <a href="#" className="etiqueta_a">
                <figure>
                    <img src={`http://localhost:3000/${imagen}`} className="frontal" alt={id_imagen} />
                    <figcaption className="trasera">
                        <h2 className="titulo"> {nombre}</h2>
                        <hr />
                        <p>{descripcion}</p>
                    </figcaption>
                </figure>
            </a>
        </div>
    )
}

export default ListaImg_Components