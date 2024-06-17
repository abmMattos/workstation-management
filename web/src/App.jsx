import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Login/Register";
import { Home } from "./pages/home/Home";
import { Route, Routes } from "react-router-dom"
import { Rooms } from "./pages/rooms/rooms";

export default function App() {
    return(
        <> 
            <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Register />} />
                <Route path="/salas" element={<Rooms />} />
                <Route path="/estacoes-de-trabalho" element={<Rooms />} />
            </Routes>
        </>
    )
}