import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Login/Register";
import { Home } from "./pages/home/Home";
import { Route, Routes } from "react-router-dom"

export default function App() {
    return(
        <> 
            <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Register />} />
            </Routes>
        </>
    )
}