/**
 * Este módulo define el contexto de autenticación y proporciona funciones relacionadas
 * con la autenticación y el usuario en la aplicación React.
 *
 * @module AuthProvider
 */
import React, { createContext, useState } from 'react'


// Crear un contexto de autenticación
export const AuthContext = createContext();


/**
 * Componente que proporciona el contexto de autenticación y las funciones relacionadas
 * con la autenticación de usuario.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {ReactNode} props.children - Elementos secundarios del componente.
 */
export default function AuthProvider({ children }) {

    // Estado para almacenar los datos del usuario
    const [user, setUser] = useState({
        id: localStorage.getItem("id_usuario"),
        usuario: localStorage.getItem("Usuario"),
        rol: localStorage.getItem("Rol"),
    })

    // Estado para almacenar el token de autenticación
    const [token, setToken] = useState(null);

    /**
     * Guarda el token de autenticación en el estado.
     *
     * @param {string} t - Token de autenticación.
     */
    const saveToken = (t) => setToken(t);


    /**
     * Guarda los datos del usuario en el almacenamiento local y en el estado.
     *
     * @param {Object} data - Datos del usuario.
     */
    const saveUsuerLocal = (data) => {

        let rol = []
        data.rol.forEach(e => {
            rol.push(e.tipo);
        });
        localStorage.setItem("id_usuario", data.id)
        localStorage.setItem("Usuario", data.usuario)
        localStorage.setItem("Rol", rol)

        setUser({
            id: localStorage.getItem("id_usuario"),
            usuario: localStorage.getItem("Usuario"),
            rol: localStorage.getItem("Rol"),
        })
    };


    /**
    * Obtiene los roles del usuario a partir del almacenamiento local.
    *
    * @returns {string[]} - Roles del usuario.
    */
    const getRoleUser = () => {
        let str = localStorage.getItem("Rol")
        let arr = str?.split(',');
        return arr
    };

    /**
     * Borra los datos del usuario del almacenamiento local.
     */
    const deleteUserLocal = () => localStorage.clear();


    /**
     * Verifica si el usuario tiene un token de autenticación.
     *
     * @returns {boolean} - `true` si el usuario tiene un token, de lo contrario, `false`.
     */
    const tieneToken = () => {
        let token = document.cookie.split("=")[1];
        if (token?.length > 0) {
            return true
        } else {
            deleteUserLocal()
            return false
        }
    };

    /**
    * Verifica si un usuario está autenticado.
    *
    * @returns {boolean} - `true` si el usuario está autenticado, de lo contrario, `false`.
    */
    const estaLogeado = () => !!usuario;


    /**
     * Verifica si el usuario tiene un rol específico.
     *
     * @param {string} rol - Rol a verificar.
     * @returns {boolean} - `true` si el usuario tiene el rol especificado, de lo contrario, `false`.
     */
    const tieneRol = (rol) => {
        return getRoleUser()?.includes(rol)
    };


    // Valor del contexto de autenticación
    const contextValue = {
        user,
        token,

        getRoleUser,
        estaLogeado,
        tieneRol,
        tieneToken,
        saveUsuerLocal,
        deleteUserLocal,
        saveToken,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
