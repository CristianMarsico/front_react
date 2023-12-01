/**
 * Componente principal de la aplicación.
 * Configura las rutas de la aplicación y proporciona autenticación a través de 'AuthProvider'.
 */

// Importa las bibliotecas y componentes necesarios.
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './helpers/auth/AuthProvider'
import { router } from './routes/Routes'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    // Utiliza 'AuthProvider' para proporcionar capacidades de autenticación a la aplicación.
    // Configura las rutas de la aplicación mediante 'RouterProvider' y la configuración definida en 'router'.
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )

}
export default App
