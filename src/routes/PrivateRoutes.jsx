import { Navigate } from 'react-router-dom'
import useAuth from "../helpers/auth/useAuth";
import RUTAS from '../helpers/RutasHelpers';

/**
 * Componente de ruta privada que verifica la autenticación y la sesión del usuario.
 * Redirige a la página de inicio de sesión si la sesión ha expirado.
 *
 * @param {Object} props - Propiedades pasadas al componente.
 * @param {ReactNode} children - Los elementos hijos que estarán protegidos por esta ruta privada.
 * @returns {JSX.Element} - Un elemento JSX que representa la ruta privada.
 */
const PrivateRoutes = ({ props, children }) => {

    const { tieneToken } = useAuth();
    // Verifica si el usuario tiene un token de autenticación.
    if (!tieneToken()) {
        alert("sesion expirada")
        return <Navigate to={RUTAS.login} />
    }
    return children
}

export default PrivateRoutes