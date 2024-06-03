import { DivItem, RegisterButton, NavItem } from "./NavStyle";
import Logo from "../../img/logo.png"
import { Link } from "react-router-dom";

export function NavMenu(props) {
    return (
        <NavItem>
            <DivItem>
                <Link to="/"><img src={Logo} alt="Senai" /></Link>
                {props.text}
            </DivItem>
            <DivItem>
                <ul>
                    <li>SERVIÇOS</li>
                    <li>SOBRE</li>
                </ul>
                <Link to="/login"><RegisterButton>LOGIN</RegisterButton></Link>
            </DivItem>
        </NavItem>
    )
}