import { Main, Logo, UnitLink } from "./sideStyle";
import logo from "../../img/logo.png"
import { Link, useLocation } from "react-router-dom";
import chair from "../../img/chair.png";
import chat from "../../img/chat.png"
import { useEffect, useState } from "react";
import theme from "../../style/theme";
import config from "../../img/config.png"
import help from "../../img/help.png"
import computer from "../../img/computer.png"

export function Side() {
    const location = useLocation();
    const [backgrounds, setBackgrounds] = useState({
        link1: theme.COLORS.BACKGROUND, // Cor padrão do tema ou qualquer outra cor inicial
        link2: theme.COLORS.BACKGROUND,
        link3: theme.COLORS.BACKGROUND,
        link4: theme.COLORS.BACKGROUND
    });

    useEffect(() => {
        const path = location.pathname;

        let newBackgrounds;
        if (path === "/salas" || path === "/novaSala") {
            newBackgrounds = {
                link1: theme.COLORS.BACKGROUND2,
                link2: theme.COLORS.BACKGROUND,
                link3: theme.COLORS.BACKGROUND,
                link4: theme.COLORS.BACKGROUND,
                link5: theme.COLORS.BACKGROUND
            };
        } else if (path === "/estacoes-de-trabalho") {
            newBackgrounds = {
                link1: theme.COLORS.BACKGROUND,
                link2: theme.COLORS.BACKGROUND2,
                link3: theme.COLORS.BACKGROUND,
                link4: theme.COLORS.BACKGROUND,
                link5: theme.COLORS.BACKGROUND
            };
        } else if (path === "/mensagens") {
            newBackgrounds = {
                link1: theme.COLORS.BACKGROUND,
                link2: theme.COLORS.BACKGROUND,
                link3: theme.COLORS.BACKGROUND2,
                link4: theme.COLORS.BACKGROUND,
                link5: theme.COLORS.BACKGROUND
            };
        } else if(path === "/configuracoes") {
            newBackgrounds = {
                link1: theme.COLORS.BACKGROUND,
                link2: theme.COLORS.BACKGROUND,
                link3: theme.COLORS.BACKGROUND,
                link4: theme.COLORS.BACKGROUND2,
                link5: theme.COLORS.BACKGROUND
            };
        } else if(path === "/ajuda") {
            newBackgrounds = {
                link1: theme.COLORS.BACKGROUND,
                link2: theme.COLORS.BACKGROUND,
                link3: theme.COLORS.BACKGROUND,
                link4: theme.COLORS.BACKGROUND,
                link5: theme.COLORS.BACKGROUND2
        };
    }

        setBackgrounds(newBackgrounds);
    }, [location.pathname]);
    
    return (
        <Main>
            <Logo>
                <img src={logo} alt="" />
                <p>Meeting & Work</p>
            </Logo>
            <Link to="/salas">
                <UnitLink bg={backgrounds.link1} className="link">
                    <img src={chair} alt="Cadeira" />
                    <p>SALAS</p>
                </UnitLink>
            </Link>
            <Link to="/estacoes-de-trabalho">
                <UnitLink bg={backgrounds.link2} className="link">
                    <img src={computer} alt="Computador" />
                    <p>ESTAÇÕES</p>
                </UnitLink>
            </Link>
            <Link to="/mensagens">
                <UnitLink bg={backgrounds.link3} className="link">
                    <img src={chat} alt="Chat" />
                    <p>MENSAGENS</p>
                </UnitLink>
            </Link>
            <Link to="/configuracoes">
                <UnitLink bg={backgrounds.link4} className="link">
                    <img src={config} alt="Cadeira" />
                    <p>CONFIGURAÇÕES</p>
                </UnitLink>
            </Link>
            <Link to="/ajuda">
                <UnitLink bg={backgrounds.link5} className="link">
                    <img src={help} alt="Cadeira" />
                    <p>AJUDA</p>
                </UnitLink>
            </Link>
        </Main>
    )
}