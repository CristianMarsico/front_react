import React from 'react';
// import { RequiereTokenHelpers } from '../helpers/RequiereTokenHelpers'
const Home = () => {

    return (
        <>
            <h1>Hola</h1>
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