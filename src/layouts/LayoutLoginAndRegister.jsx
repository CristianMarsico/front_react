import { Outlet } from 'react-router-dom';

/**
 * Componente que proporciona un diseño básico para las páginas de inicio de sesión y registro.
 * Este diseño permite a las rutas anidadas mostrar su contenido en el área definida por <Outlet />.
 */
const LayoutLoginAndRegister = () => {
    return (
        <Outlet />
    )
}

export default LayoutLoginAndRegister;