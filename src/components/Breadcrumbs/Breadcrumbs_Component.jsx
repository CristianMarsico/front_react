import { Link, useLocation } from 'react-router-dom'

/**
 * Componente de migas de pan (breadcrumbs) que muestra la ubicación actual en la aplicación.
 *
 * @returns {JSX.Element} Elemento que muestra las migas de pan con enlaces a ubicaciones anteriores.
 */
const Breadcrumbs_Component = () => {
    let ubicacion = useLocation();
    let posURL = '';

    // Divide la URL actual en partes y crea enlaces a ubicaciones anteriores
    let partesURL = ubicacion.pathname.split('/')
        .filter(parte => parte !== '')
        .map(parte => {
            posURL = +`/${parte}`; // Actualiza la posición de la URL

            return (
                <div className="crumb" key={parte}>
                    <Link to={parte}>{parte}</Link>
                </div>
            )
        })


    return (
        <div className='breadcrumbs'>
            {partesURL}
        </div>
    )
}

export default Breadcrumbs_Component;