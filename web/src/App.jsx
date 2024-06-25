import { Login } from "./pages/Login/Login";
import { Home } from "./pages/home/Home";
import { Route, Routes } from "react-router-dom"
import { Rooms } from "./pages/rooms/rooms";
import { Workstations } from "./pages/workstations/workstations";
import { Users } from "./pages/users/users";

export default function App() {
    return(
        <> 
            <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/salas" element={<Rooms />} />
                <Route path="/estacoes-de-trabalho" element={<Workstations />} />
                <Route path="/usuarios" element={<Users />} />
            </Routes>
        </>
    )
}