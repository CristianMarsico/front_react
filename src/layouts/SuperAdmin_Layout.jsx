import { Outlet, NavLink } from 'react-router-dom'
import RUTAS from '../helpers/RutasHelpers'

const SuperAdmin_Layout = () => {
    return (
        <div className="help-layout">
            <nav>
                <NavLink to={RUTAS.compra}>Registrar Materia Prima</NavLink>
                <NavLink to={RUTAS.venta}>Registrar Venta de Hilado</NavLink>
            </nav>
            <div className="contenedor_compraVenta">
                <div className="hijo" >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default SuperAdmin_Layout
