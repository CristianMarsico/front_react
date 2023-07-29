import { Link, useRouteError } from "react-router-dom";

const NotFound = () => {
    const error = useRouteError();

    return (
        <div>
            <h1>General notFound</h1>
            <h1>{error.status}</h1>
            <h3>{error.statusText}</h3>
            <Link to="home">volver al homeeee</Link>
        </div>
    )
}

export default NotFound