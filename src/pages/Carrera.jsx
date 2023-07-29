import { Link, useLoaderData } from 'react-router-dom'

const Carrera = () => {

    const { data } = useLoaderData()

    return (
        <div className="careers">
            {
                data.length > 0
                    ?
                    data.map((carrera) =>
                        <Link to={carrera.id.toString()} key={carrera.id} >
                            <p>{carrera.titulo}</p>
                        </Link>
                    )
                    :
                    <li>No hay nada</li>
            }
        </div >
    )
}

export default Carrera


//funcion de carga de pagina
export const LoaderCarrera = async () => {
    let res = await fetch('http://localhost:4000/carrera')
    let data = await res.json();
    if (!res.ok) {
        throw ({ //SON LOS VALORES QUE USO EN LA PAGINA DE PAGES/NOTFOUND.JSX
            status: res.status,
            statusText: "error en la respuesta",
        })
    }
    return { data }
}