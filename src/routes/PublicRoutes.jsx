import { Navigate } from 'react-router-dom'
import useAuth from "../helpers/auth/useAuth";
import RUTAS from '../helpers/RutasHelpers';

/**
 * Componente de ruta pública que redirige a la página de administración si el usuario está autenticado.
 *
 * @param {ReactNode} children - Los elementos hijos que estarán disponibles para rutas públicas.
 * @returns {JSX.Element} - Un elemento JSX que representa la ruta pública.
 */
const PublicRoutes = ({ children }) => {
    const { tieneToken } = useAuth();

    // Verifica si el usuario tiene un token de autenticación.
    if (tieneToken()) {
        return <Navigate to={`/${RUTAS.administracion}`} />;
    }
    return children;
}

export default PublicRoutes;