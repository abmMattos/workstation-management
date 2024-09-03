import { Main, Logo, UnitLink } from "./sideStyle";
import logo from "../../img/logo.png"
import { NavLink } from "react-router-dom";
import chair from "../../img/chair.png";
import chat from "../../img/chat.png"
import config from "../../img/config.png"
import help from "../../img/help.png"
import computer from "../../img/computer.png"
import user from "../../img/userGray.png"

export function Side() {

    const userType = localStorage.getItem('userType');

    return (
        <Main>
            <Logo>
                <img src={logo} alt="" />
                <p>Meeting & Work</p>
            </Logo>
            {userType === 'ADMIN' && (
                <NavLink to="/usuarios">
                    <UnitLink className="link" >
                        <img src={user} alt="Usuário" />
                        <p>USUÁRIOS</p>
                    </UnitLink>
                </NavLink>
            )}
            <NavLink to="/salas">
                <UnitLink className="link" >
                    <img src={chair} alt="Cadeira" />
                    <p>SALAS</p>
                </UnitLink>
            </NavLink>
            <NavLink to="/estacoes-de-trabalho">
                <UnitLink className="link" >
                    <img src={computer} alt="Computador" />
                    <p>ESTAÇÕES</p>
                </UnitLink>
            </NavLink>
            <NavLink to="/mensagens">
                <UnitLink className="link" >
                    <img src={chat} alt="Chat" />
                    <p>MENSAGENS</p>
                </UnitLink>
            </NavLink>
            <NavLink to="/configuracoes">
                <UnitLink className="link" >
                    <img src={config} alt="Engrenagem" />
                    <p>CONFIGURAÇÕES</p>
                </UnitLink>
            </NavLink>
            <NavLink to="/ajuda">
                <UnitLink className="link" >
                    <img src={help} alt="Interrogação" />
                    <p>AJUDA</p>
                </UnitLink>
            </NavLink>
        </Main>
    )
}