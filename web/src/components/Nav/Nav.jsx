import { DivItem, RegisterButton, NavItem } from "./NavStyle";
import Logo from "../../img/logo.png"

export function NavMenu(props) {
    return (
        <NavItem>
            <DivItem>
                <img src={Logo} alt="Senai" />
                {props.text}
            </DivItem>
            <DivItem>
                <ul>
                    <li>SERVIÇOS</li>
                    <li>SOBRE</li>
                </ul>
                <RegisterButton>CADASTRAR</RegisterButton>
            </DivItem>
        </NavItem>
    )
}