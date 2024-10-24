import { Main, Logo, UnitLink } from "./sideStyle";
import logo from "../../img/logo.png";
import { NavLink } from "react-router-dom";
import chair from "../../img/chair.png";
import chat from "../../img/chat.png";
import config from "../../img/config.png";
import help from "../../img/help.png";
import computer from "../../img/computer.png";
import user from "../../img/userGray.png";

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
                        <img src={chair} alt="Reservas" />
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
                    <img src={computer} alt="Chave Inglesa" />
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
