import React from 'react'
import Logo from "../../images/male_avatar.svg";

const Banner = ({ nombre }) => {
    return (
        <div className="div_img" >
            <img src={Logo} alt="login-logo" className="logo-img" />
            <h1>{nombre}</h1>
        </div>
    )
}

export default Banner