import {Routes, Route} from 'react-router-dom';

import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import NovaReserva from '../pages/NovaReserva'
import PrivateRoute from '../components/PrivateRoute';
import EditarReserva from '../pages/EditarReserva';
import Cadastro from '../pages/Cadastro/index';

function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            
            <Route
            path='/dashboard'
            element={
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
            }
            />

            <Route 
            path='/reservar'
            element={
                <PrivateRoute>
                    <NovaReserva />
                </PrivateRoute>
            }
            />

            <Route 
            path='/editar/:id'
            element={
                <PrivateRoute>
                    <EditarReserva />
                </PrivateRoute>
            }
            />

            <Route 
            path='/cadastro'
            element={
                <PrivateRoute>
                    <Cadastro />
                </PrivateRoute>
            }
            />
        </Routes>
        
    )
};

export default AppRoutes;