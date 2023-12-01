/**
 * Este módulo define un hook personalizado para acceder al contexto de autenticación en la aplicación React.
 *
 * @module useAuth
 * @returns {Object} - Objeto que proporciona acceso a funciones y datos relacionados con la autenticación del usuario.
 */

import { useContext } from 'react'
import { AuthContext } from './AuthProvider'


/**
 * Hook personalizado que proporciona acceso al contexto de autenticación en la aplicación React.
 *
 * @returns {Object} - Un objeto que contiene funciones y datos relacionados con la autenticación del usuario.
 */
export default function useAuth() {
    // Obtiene el valor del contexto de autenticación
    const contextValue = useContext(AuthContext)
    return contextValue
}
