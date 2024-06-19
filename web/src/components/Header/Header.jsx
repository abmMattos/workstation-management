import { Title, LineDiv } from "./HeaderStyle"
import notification from "../../img/notification.png"
import { SmallButton, UserButton } from "../../components/Button/Button"
import mail from "../../img/mail.png"


export function Header(props) {

    return (
        <LineDiv>
            <Title>{props.title}</Title>
            <LineDiv>
                <SmallButton img={notification} />
                <SmallButton img={mail} />
                <UserButton text="Admin" />
            </LineDiv>
        </LineDiv>
    )
}