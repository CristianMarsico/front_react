import React from 'react'

const Contact = () => {
    return (
        <div className="contatc">
            <h3>Contacto</h3>
            <form >
                <label >
                    <span>Su email:</span>
                    <input type="email" name='email' required />
                </label>
                <label >
                    <span>Su mensaje:</span>
                    <textarea name='message' required />
                </label>
                <button>Enviar</button>
            </form>
        </div>
    )
}

export default Contact