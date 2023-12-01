import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/login.css'

// Crea un punto de entrada para la aplicación en el elemento HTML con el ID 'root'.
// Utiliza ReactDOM para renderizar el componente 'App' en el elemento 'root'.
// Esto inicia la aplicación React en el navegador.
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
