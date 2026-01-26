import {Routes, Route} from 'react-router-dom';

import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import NovaReserva from '../pages/NovaReserva'

function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/reservar' element={<NovaReserva />} /> 
        </Routes>
    )
};

export default AppRoutes;