import { RouterProvider } from 'react-router-dom'
import AuthProvider from './helpers/auth/AuthProvider'
import { router } from './routes/Routes'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )

}
export default App
