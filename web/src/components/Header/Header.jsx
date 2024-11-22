import { Title, LineDiv } from "./HeaderStyle"
import logout from "../../img/logout.png"
import { UserButton } from "../../components/Button/Button"


export function Header(props) {

    const nameUser = localStorage.getItem('nameUser');


    return (
        <LineDiv>
            <Title>{props.title}</Title>
            <LineDiv>
                <UserButton text={nameUser} img={logout} />
            </LineDiv>
        </LineDiv>
    )
}