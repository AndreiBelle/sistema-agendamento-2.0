import { BrowserRouter } from 'react-router-dom';
//Importando o estilo criado em global
import GlobalStyles from './assets/styles/global'; 
import AppRoutes from './routes/routes';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <GlobalStyles />
    <ToastContainer autoClose={3000} position="top-right" />
    <AppRoutes />
    </BrowserRouter>
    
  )
}

export default App;
