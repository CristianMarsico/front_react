import Swal from 'sweetalert2/dist/sweetalert2.js'
import '../../css/sweets.css'

export function mostrarAlertSuccess(data) {
    Swal.fire({
        iconColor: 'rgb(76, 201, 45)',
        title: `Bienvenido ${data} !!!`,
        icon: 'success',
        showConfirmButton: false,
        timer: 2500,
        customClass: {
            title: 'custom_title',
            popup: 'custom_width',
        }
    })
}

export function mostrarAlertCompraSuccess(data) {
    Swal.fire({
        iconColor: 'rgb(76, 201, 45)',
        title: `${data} !!!`,
        icon: 'success',
        showConfirmButton: false,
        timer: 2500,
        customClass: {
            title: 'custom_title',
            popup: 'custom_width',
        }
    })
}


export function mostrarAlertError(data) {
    Swal.fire({
        iconColor: 'rgb(255, 0, 0)',
        title: `${data} !!!`,
        icon: 'error',
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
        customClass: {
            title: 'custom_title',
            popup: 'custom_width',
        }
    })
}


export function alertWarningStock(data) {
    return new Promise((resolve) => {
        Swal.fire({
            iconColor: 'rgb(252, 113, 0)',
            title: 'Está seguro de retirar stock ?',
            html: `<h6>Está por retirar <span style="color: red; font-weight: bold; text-transform: uppercase;">${data.cantidad}kg.</span> de: <span style="color: red; font-weight: bold; text-transform: uppercase;">${data.nombre}</span></h6>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Si, deseo continuar!',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            customClass: {
                title: 'custom_title',
                popup: 'custom_width',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}



export function alertWarningDelete(data) {
    return new Promise((resolve) => {
        Swal.fire({
            iconColor: 'rgb(252, 113, 0)',
            title: 'Está seguro que desea eliminar ?',
            html: `<h6>Está por eliminar la materia prima: <span style="color: red; font-weight: bold; text-transform: uppercase;">${data.nombre}</span></h6>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Si, deseo eliminar!',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            customClass: {
                title: 'custom_title',
                popup: 'custom_width',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

export function alertWarningUpdate(mp, data) {
    return new Promise((resolve) => {
        Swal.fire({
            iconColor: 'rgb(252, 113, 0)',
            title: `Está por realizar modificaciones !`,
            html: `<h6>Cambiará <span style="color: blue; font-weight: bold; text-transform: uppercase;">${mp.nombre}</span> por <span style="color: red; font-weight: bold; text-transform: uppercase;">${data.nombre}</span></h6>` +
                `<h6>Además, se actualizará el stock de <span style="color: blue; font-weight: bold;text-transform: uppercase;">${mp.stock}</span> a <span style="color: red; font-weight: bold;text-transform: uppercase;">${data.stock}</span> .</h6>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Si, deseo modificar!',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            customClass: {
                title: 'custom_title',
                popup: 'custom_width',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

