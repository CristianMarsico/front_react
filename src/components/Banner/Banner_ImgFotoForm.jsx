import React from 'react'
import Logo from "../../images/male_avatar.svg";

/**
 * Componente que muestra una imagen (avatar) y un nombre en un formato específico.
 *
 * @param {string} nombre - El nombre que se mostrará junto a la imagen.
 * @returns {JSX.Element} Elemento que muestra la imagen y el nombre.
 */
const Banner_ImgFotoForm = ({ nombre }) => {
    return (
        <div className="div_img" >
            <img src={Logo} alt="login-logo" className="logo-img" />
            <h2>{nombre}</h2>
        </div>
    )
}

export default Banner_ImgFotoForm