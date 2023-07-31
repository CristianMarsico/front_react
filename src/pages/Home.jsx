import React from 'react';
// import { RequiereTokenHelpers } from '../helpers/RequiereTokenHelpers'
import TablaUsuariosGeneral_Component from '../components/TablaUsuario/TablaUsuariosGeneral_Component';

const Home = () => {

    return (
        <>
            <TablaUsuariosGeneral_Component />

        </>
    )
}

export default Home


// export const LoaderHome = async () => {

//     // let token = await RequiereTokenHelpers()
//     const GETALL = "http://localhost:3000/api/getAll";
//     try {
//         let res = await fetch(GETALL, {
//             "headers": {
//                 "Content-Type": "application/json",
//                 // "Authorization": `Bearer ${token}`,
//             },
//         })


//         let data = await res.json();

//         if (res.ok) {
//             return {
//                 data,
//                 ok: res.ok
//             }
//         } else {

//             return {
//                 data,
//                 ok: res.ok,
//                 text: res.statusText
//             }
//         }

//     } catch (error) {
//         console.log(error)
//     }

// }