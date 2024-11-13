import { Main, Logo, UnitLink } from "./sideStyle";
import logo from "../../img/logo.png";
import { NavLink } from "react-router-dom";
import chair from "../../img/chair.png";
import chat from "../../img/chat.png";
import { FaTools } from "react-icons/fa";
import help from "../../img/help.png";
import computer from "../../img/computer.png";
import user from "../../img/userGray.png";
import { RiCalendarScheduleFill } from "react-icons/ri";

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
                        <img src={user} alt="Usuário" />
                        <p>USUÁRIOS</p>
                    </UnitLink>
                </NavLink>
            )}
            {userType === "USER" && (
                <NavLink to="/reservar">
                    <UnitLink className="link">
                        <img src={chair} alt="Reservas" />
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
                    <img src={computer} alt="Computador" />
                    <p>ESTAÇÕES</p>
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
            <NavLink to="/mensagens">
                <UnitLink className="link" >
                    <img src={chat} alt="Chat" />
                    <p>MENSAGENS</p>
                </UnitLink>
            </NavLink>
            <NavLink to="/ajuda">
                <UnitLink className="link" >
                    <img src={help} alt="Interrogação" />
                    <p>AJUDA</p>
                </UnitLink>
            </NavLink>
        </Main>
    );
}
