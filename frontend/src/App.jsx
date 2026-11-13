import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Leaderboard from './pages/Leaderboard';
import ViewPoints from './pages/ViewPoints';
import History from './pages/History';
import ViewPlayersAdmin from './pages/ViewPlayersAdmin';
import ChangePoints from './pages/ChangePoints';

function App() {

    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/Leaderboard" element={<Leaderboard />} />

                <Route path="/ViewPoints" element={<ViewPoints />} />

                <Route path="/History" element={<History />} />

                <Route path="/ViewPlayersAdmin" element={<ViewPlayersAdmin/>} />

                <Route path="/ChangePoints" element={<ChangePoints />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;