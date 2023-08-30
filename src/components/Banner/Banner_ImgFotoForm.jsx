import React from 'react'
import Logo from "../../images/male_avatar.svg";

const Banner_ImgFotoForm = ({ nombre }) => {
    return (
        <div className="div_img" >
            <img src={Logo} alt="login-logo" className="logo-img" />
            <h2>{nombre}</h2>
        </div>
    )
}

export default Banner_ImgFotoForm