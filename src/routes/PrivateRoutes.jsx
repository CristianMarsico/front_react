import { Navigate } from 'react-router-dom'
import useAuth from "../helpers/auth/useAuth";
import RUTAS from '../helpers/RutasHelpers';

const PrivateRoutes = ({ props, children }) => {

    const { tieneRol, tieneToken } = useAuth();

    if (!tieneToken()) {
        return <Navigate to={RUTAS.login} />
    }

    if (!tieneRol(props?.super) && !tieneRol(props?.admin)) {
        return <Navigate to={`/${RUTAS.home}`} />
    }
    return children

}

export default PrivateRoutes