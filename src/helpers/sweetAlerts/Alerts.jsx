import Swal from 'sweetalert2/dist/sweetalert2.js'
import '../../css/sweets.css'

export function alertSuccess(title) {
    Swal.fire({
        iconColor: 'rgb(76, 201, 45)',
        title,
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
        title: `${data} !`,
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

export function sesionExpirada() {

    return new Promise((resolve) => {
        Swal.fire({
            iconColor: 'rgb(252, 113, 0)',
            title: 'La sesión ha expirado !',            
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar!',
            customClass: {
                title: 'custom_title',
                popup: 'custom_width',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                resolve(true);
            }
        });
    });
}

export function alertWarning(title, html) {
    return new Promise((resolve) => {
        Swal.fire({
            iconColor: 'rgb(252, 113, 0)',
            title,
            html,
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