import { Outlet, NavLink } from 'react-router-dom'
import RUTAS from '../helpers/RutasHelpers'

const LayoutsAyuda = () => {
    return (
        <div className="help-layout">
            <h2>Ayuda</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, totam!</p>

            <nav>
                <NavLink to={RUTAS.faq}>Preguntas</NavLink>
                <NavLink to={RUTAS.contact}>Contacto</NavLink>
            </nav>

            <Outlet />
        </div>
    )
}

export default LayoutsAyuda