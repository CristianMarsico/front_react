import React from 'react'
import IMG from "../../images/logo.svg";

/**
 * Componente de banner lateral que muestra una imagen y un título relacionado con la confección de hilados artesanales.
 *
 * @returns {JSX.Element} Elemento que muestra la imagen y el título del banner lateral.
 */
const Banner_Lateral = () => {
    return (
        <div className='banner'>
            <img src={IMG} alt="banner" />
            <h6>Confección de hilados artesanales</h6>
        </div>
    )
}

export default Banner_Lateral