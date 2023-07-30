import React from 'react';
import { useLoaderData } from 'react-router-dom'
import { RequiereTokenHelpers } from '../helpers/RequiereTokenHelpers'
// import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';
import TablaUsuariosGeneral_Component from '../components/TablaUsuariosGeneral_Component';

const Home = () => {

    let [userData, setUserData] = useState([]);
    const data = useLoaderData()
    let datos = data.data.results
    useEffect(() => {
        setUserData(datos)
    }, [])

    return (
        <>
            <TablaUsuariosGeneral_Component datos={userData} />

        </>
    )
}

export default Home


export const LoaderHome = async () => {

    // let token = await RequiereTokenHelpers()
    const GETALL = "http://localhost:3000/api/getAll";
    try {
        let res = await fetch(GETALL, {
            "headers": {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token}`,
            },
        })


        let data = await res.json();

        if (res.ok) {
            return {
                data,
                ok: res.ok
            }
        } else {

            return {
                data,
                ok: res.ok,
                text: res.statusText
            }
        }

    } catch (error) {
        console.log(error)
    }

}