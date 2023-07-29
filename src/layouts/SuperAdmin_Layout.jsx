import { Outlet, NavLink } from 'react-router-dom'
import RUTAS from '../helpers/RutasHelpers'

const SuperAdmin_Layout = () => {
    return (
        <div className="help-layout">
            <nav>
                <NavLink to={RUTAS.compra}>Comprar MP</NavLink>
                <NavLink to={RUTAS.venta}>Vender Hilado</NavLink>
            </nav>
            <Outlet />
        </div>
    )
}
export default SuperAdmin_Layout
