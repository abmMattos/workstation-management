import { Title, LineDiv } from "./HeaderStyle"
import notification from "../../img/notification.png"
import logout from "../../img/logout.png"
import { SmallButton, UserButton } from "../../components/Button/Button"
import mail from "../../img/mail.png"


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