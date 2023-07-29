import { Link, useRouteError } from "react-router-dom";

const CarreraError = () => {
    const error = useRouteError();
    console.log(error)
    return (
        <div className="careers-error">
            <h1>Error !</h1>
            <h3>{error.status}</h3>
            <p>{error.statusText}</p>
            <p>Volver al <Link to="/home">HOME</Link></p>
        </div>
    )
}

export default CarreraError