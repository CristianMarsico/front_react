import { useLoaderData, Link } from 'react-router-dom'


const CarreraDetalle = () => {

    const { data } = useLoaderData()
    return (
        <div className='career-details'>
            <h1>Detalles de la carrera: </h1>
            <hr />
            {
                data.length !== 0
                    ?
                    <>
                        <h3>{data.titulo}</h3>
                        <p>{data.Localidad}</p>
                        <p>{data.sueldo}</p>
                        <br />
                        <hr />
                        <p>Volver a todas las  <Link to="/carrers">CARRERAS</Link></p>
                    </>
                    :
                    <p>No hay nada</p>
            }

        </div>

    )
}

export default CarreraDetalle

export const LoaderCarreraDetale = async ({ params }) => {
    let { id } = params
    let res = await fetch(`http://localhost:4000/carrera/${id}`)
    if (!res.ok) {
        //SON LOS VALORES QUE USO EN LA PAGINA DE PAGES/CARRERAERROR.JS
        throw ({
            status: res.status,
            statusText: "No se ha encontrado esa carrera",
        })
    }
    let data = await res.json();
    return { data }
}