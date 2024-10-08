import { Login } from "./pages/Login/Login";
import { Home } from "./pages/home/Home";
import { Route, Routes } from "react-router-dom"
import { Users } from "./pages/users/users";
import { Reservation } from "./pages/reservation/reservation"
import { Stations } from "./pages/stations/stations";
import { MyReserves } from "./pages/my-reserves/myReserves";

export default function App() {
    return(
        <> 
            <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/estacoes" element={<Stations />} />
                <Route path="/usuarios" element={<Users />} />
                <Route path="/reservar" element={<Reservation />} />
                <Route path="/reservas" element={<MyReserves />} />
            </Routes>
        </>
    )
}