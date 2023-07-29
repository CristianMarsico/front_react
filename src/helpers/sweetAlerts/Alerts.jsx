import Swal from 'sweetalert2/dist/sweetalert2.js'

export function mostrarAlertSuccess(data) {
    Swal.fire({
        width: '45%',
        color: 'white',
        position: 'center',
        icon: 'success',
        title: `Bienvenido ${data}`,
        showConfirmButton: false,
        timer: 2500
    })
}

export function mostrarAlertCompraSuccess(data) {
    Swal.fire({
        width: '45%',
        color: 'white',
        position: 'center',
        icon: 'success',
        title: `${data}`,
        showConfirmButton: false,
        timer: 2500
    })
}

export function mostrarAlertError(data) {
    Swal.fire({
        width: '45%',
        border: '1px solid white',
        color: 'white',
        position: 'center',
        icon: 'error',
        title: `${data}`,
        showConfirmButton: true,
        confirmButtonColor: '#FFC900',
        // timer: 1500
    })
}