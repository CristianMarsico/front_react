import { Navigate } from 'react-router-dom'
import useAuth from "../helpers/auth/useAuth";
import RUTAS from '../helpers/RutasHelpers';

const PublicRoutes = ({ children }) => {
    const { tieneToken } = useAuth();

    if (tieneToken())
        return <Navigate to={`/${RUTAS.home}`} />;
    return children;
}

export default PublicRoutes;