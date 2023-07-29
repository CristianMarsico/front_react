import { Outlet } from 'react-router-dom'


const LayoutCarreras = () => {
    return (
        <div className="carrers-layout">
            <h2>Carreras</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio, sequi?</p>
            <main>

                <Outlet />
            </main>
        </div>
    )
}

export default LayoutCarreras