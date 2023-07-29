import { Link, useLocation } from 'react-router-dom'
import '../../css/posicionURL.css';


const Breadcrumbs_Component = () => {
    let ubicacion = useLocation();
    let posURL = '';

    let partesURL = ubicacion.pathname.split('/')
        .filter(parte => parte !== '')
        .map(parte => {
            posURL = +`/${parte}`

            return (
                <div className="crumb" key={parte}>
                    <Link to={parte}>{parte}</Link>
                </div>
            )
        })


    return (

        <div className="contenedorBreadcrumbs">
            <div className='breadcrumbs'>
                {partesURL}
            </div>
        </div>
    )
}

export default Breadcrumbs_Component;