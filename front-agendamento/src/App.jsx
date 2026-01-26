import { BrowserRouter } from 'react-router-dom';
//Importando o estilo criado em global
import GlobalStyles from './assets/styles/global'; 
import AppRoutes from './routes/routes';

function App() {
  return (
    <BrowserRouter>
    <GlobalStyles />
    <AppRoutes />
    </BrowserRouter>
    
  )
}

export default App;
