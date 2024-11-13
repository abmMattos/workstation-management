import { Main, Logo, UnitLink } from "./sideStyle";
import logo from "../../img/logo.png";
import { NavLink } from "react-router-dom";
import { FaTools } from "react-icons/fa";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { RiComputerFill } from "react-icons/ri";
import { BiSolidHelpCircle } from "react-icons/bi";
import { MdContentPasteSearch } from "react-icons/md";

export function Side() {
    const userType = localStorage.getItem("userType");

    return (
        <Main>
            <Logo>
                <img src={logo} alt="" />
                <p>Meeting & Work</p>
            </Logo>
            {userType === "ADMIN" && (
                <NavLink to="/usuarios">
                    <UnitLink className="link" >
                        <FaUserCircle style={{background: 'none', padding: 0, borderRadius: 0, fontSize: 16}} />
                        <p>USUÁRIOS</p>
                    </UnitLink>
                </NavLink>
            )}
            {userType === "USER" && (
                <NavLink to="/reservar">
                    <UnitLink className="link">
                        <MdContentPasteSearch style={{background: 'none', padding: 0, borderRadius: 0, fontSize: 16}} />
                        <p>RESERVAR</p>
                    </UnitLink>
                </NavLink>
            )}
            {userType === "USER" && (
                <NavLink to="/reservas">
                    <UnitLink className="link">
                        <RiCalendarScheduleFill style={{background: 'none', padding: 0, borderRadius: 0, fontSize: 16}} />
                        <p>MINHAS RESERVAS</p>
                    </UnitLink>
                </NavLink>
            )}
            {userType === "ADMIN" && (
            <NavLink to="/estacoes">
                <UnitLink className="link" >
                    <RiComputerFill style={{background: 'none', padding: 0, borderRadius: 0, fontSize: 16}} />
                    <p>SALAS / ESTAÇÕES</p>
                </UnitLink>
            </NavLink>
            )}
            {userType === "ADMIN" && (
            <NavLink to="/equipamentos">
                <UnitLink className="link" >
                    <FaTools style={{ background: 'none', padding: 0, borderRadius: 0, fontSize: 16}}/>
                    <p>EQUIPAMENTOS</p>
                </UnitLink>
            </NavLink>
            )}
            <NavLink to="/ajuda">
                <UnitLink className="link" >
                    <BiSolidHelpCircle style={{background: 'none', padding: 0, borderRadius: 0, fontSize: 18}} />
                    <p>AJUDA</p>
                </UnitLink>
            </NavLink>
        </Main>
    );
}
