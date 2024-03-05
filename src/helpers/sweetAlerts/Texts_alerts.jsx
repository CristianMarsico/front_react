export function getTextComents(comentario) {
    return `<h6>Comentario: <span style="text-aling:center; color: red; font-weight: bold; text-transform: uppercase;">${comentario}</span></h6>`
}

export function getTextDescontarStock(data) {
    return `<h6>Está por retirar <span style="color: red; font-weight: bold; text-transform: uppercase;">${data.cantidad}kg.</span> de: <span style="color: red; font-weight: bold; text-transform: uppercase;">${data.nombre}</span></h6>`
}

export function getTextUpdateMP(mp, data) {
    return `<h6>Cambiará <span style="color: blue; font-weight: bold; text-transform: uppercase;">${mp.nombre}</span> por <span style="color: red; font-weight: bold; text-transform: uppercase;">${data.nombre}</span></h6>` +
            `<h6>Se actualizará el stock de <span style="color: blue; font-weight: bold;text-transform: uppercase;">${mp.stock}</span> a <span style="color: red; font-weight: bold;text-transform: uppercase;">${data.stock}</span> .</h6>` +
            `<h6>Se actualizará el precio de <span style="color: blue; font-weight: bold; text-transform: uppercase;">${mp.precio}</span> por <span style="color: red; font-weight: bold; text-transform: uppercase;">${data.precio}</span></h6>`
}


export function getTextAddMP(data) {
    return `<h6>Materia Prima: <span style="text-aling:center; color: red; font-weight: bold; text-transform: uppercase;">${data.producto}</span></h6>
                   <h6>Cantidad: <span style="text-aling:center; color: red; font-weight: bold; text-transform: uppercase;">${data.cantidad}</span></h6>
                   <h6>Valor: <span style="text-aling:center; color: red; font-weight: bold; text-transform: uppercase;">${data.precio_unitario}</span></h6>`
}

export function getTextDelete(data, text) {
    return `<h6>Está por eliminar ${text}: <span style="color: red; font-weight: bold; text-transform: uppercase;">${data.nombre}</span></h6>`
}

// TEXTO DEL CLIENTE
export function getTextUpdateClient(cliente, data) {
    return `<h6>Cambiará <span style="color: blue; font-weight: bold; text-transform: uppercase;">${cliente.direccion}</span> por <span style="color: red; font-weight: bold; text-transform: uppercase;">${data.direccion}</span></h6>` +
        `<h6>Se actualizará el stock de <span style="color: blue; font-weight: bold;text-transform: uppercase;">${cliente.email}</span> a <span style="color: red; font-weight: bold;text-transform: uppercase;">${data.email}</span> .</h6>` +
        `<h6>Se actualizará el precio de <span style="color: blue; font-weight: bold; text-transform: uppercase;">${cliente.telefono}</span> por <span style="color: red; font-weight: bold; text-transform: uppercase;">${data.telefono}</span></h6>`
}



// TEXTOS DE PRODUCTO TERMINADO
export function getTextCompraHilado(data) {
    return `<h6>Hilado: <span style="text-aling:center; color: red; font-weight: bold; text-transform: uppercase;">${data.nombre}</span></h6>
                    <h6>Color: <span style="text-aling:center; color: red; font-weight: bold; text-transform: uppercase;">${data.color}</span></h6>
                    <h6>Cantidad en Loberia: <span style="text-aling:center; color: red; font-weight: bold; text-transform: uppercase;">${data.stock_loberia}</span></h6>
                    <h6>Cantidad en Buenos Aires: <span style="text-aling:center; color: red; font-weight: bold; text-transform: uppercase;">${data.stock_BuenosAires}</span></h6>
                    <h6>Precio mayorista: <span style="text-aling:center; color: red; font-weight: bold; text-transform: uppercase;">${data.precio_mayorista}</span></h6>
                    <h6>Precio minorista: <span style="text-aling:center; color: red; font-weight: bold; text-transform: uppercase;">${data.precio_minorista}</span></h6>`
}


export function getTextIncrementarStock(data, prod) {
    return `<h6>Producto: <span style="text-aling:center; color: red; font-weight: bold; text-transform: uppercase;">${prod.producto_terminado}</span></h6>
            <h6> Ciudad: <span style="text-aling:center; color: red; font-weight: bold; text-transform: uppercase;">${data.ciudad == "stock_loberia" ? "Lobería" : "Buenos Aires"}</span ></h6>
            <h6>Sumar: <span style="text-aling:center; color: red; font-weight: bold; text-transform: uppercase;"> ${data.total} </span> nuevos</h6>`;
}

export function getTextUpdatePrecio(data, prod) {
    return `<h6>Producto: <span style="text-aling:center; color: red; font-weight: bold; text-transform: uppercase;">${prod.producto_terminado}</span></h6>
                     <h6>Tipo consumidor: <span style="text-aling:center; color: red; font-weight: bold; text-transform: uppercase;"> ${data.tipoConsumidor == "precio_venta_mayorista" ? "Mayorista" : "Minorista"}</span></h6>
                    <h6>Nuevo precio: <span style="text-aling:center; color: red; font-weight: bold; text-transform: uppercase;">${data.total}</span></h6>`

}


export function getTextTransferirStock(data) {
    return `<h6>Está por mover <span style="color: red; font-weight: bold; text-transform: uppercase;">${data.cantidad}</span> kg. de: <span style="color: red; font-weight: bold; text-transform: uppercase;">${data.origen == "stock_loberia" ? "Lobería" : "Buenos Aires"}</span> a: <span style="color: red; font-weight: bold; text-transform: uppercase;">${data.destino == "stock_loberia" ? "Lobería" : "Buenos Aires"}</span></h6>`
}

export function getTextVender(data, prod) {
    return `<h6>Producto: <span style="text-aling:center; color: red; font-weight: bold; text-transform: uppercase;">${prod}</span></h6>
                     <h6>Cantidad a vender: <span style="text-aling:center; color: red; font-weight: bold; text-transform: uppercase;">${data.cantidad}</span></h6>
                    <h6>Ciudad de despacho: <span style="text-aling:center; color: red; font-weight: bold; text-transform: uppercase;">${data.ciudad == "stock_loberia" ? "Lobería " : "Buenos Aires"}</span></h6>
                    <h6>Venta al por: <span style="text-aling:center; color: red; font-weight: bold; text-transform: uppercase;">${data.tipo_venta == "precio_venta_mayorista" ? "Mayorista" : "Minorista"}</span></h6>
                    <h6> Cliente: <span style="text-aling:center; color: red; font-weight: bold; text-transform: uppercase;">${data.cliente}</span></h6>`
}


export function getTextWelcome(data) {
    return `Bienvenido ${data} !`
}

export function getText(data) {
    return `${data} !`
}



