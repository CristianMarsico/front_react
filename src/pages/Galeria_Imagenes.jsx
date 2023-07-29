import React from 'react';
import { useLoaderData } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import GaleriaImgGeneral_Component from '../components/GaleriaImgGeneral_Component';

const Galeria_Imagenes = () => {

    let [userData, setUserData] = useState([]);
    const data = useLoaderData()
    let datos = data.data.response;

    useEffect(() => {
        setUserData(datos)
    }, [])

    return (
        <GaleriaImgGeneral_Component datos={userData} />
    )

}

export default Galeria_Imagenes

export const LoaderGaleriaImagen = async () => {

    // let token = await RequiereTokenHelpers()
    const GETALL = "http://localhost:3000/api/imagenes";
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