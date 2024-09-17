import { Login } from "./pages/login/Login";
import { Home } from "./pages/home/Home";
import { Route, Routes } from "react-router-dom"
import { Users } from "./pages/users/users";
import { Reservation } from "./pages/reservation/reservation"
import { Stations } from "./pages/stations/stations";

export default function App() {
    return(
        <> 
            <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/estacoes" element={<Stations />} />
                <Route path="/usuarios" element={<Users />} />
                <Route path="/reservas" element={<Reservation />} />
            </Routes>
        </>
    )
}