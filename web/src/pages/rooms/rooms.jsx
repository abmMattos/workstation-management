import { Main, Section, Title, LineDiv } from "./roomStyle"
import { Side } from "../../components/Side/side"
import notification from "../../img/notification.png"
import { SmallButton, UserButton } from "../../components/Button/Button"
import mail from "../../img/mail.png"

export function Rooms() {
    return (
        <Main>
            <Side />
            <Section>
                <LineDiv>
                    <Title>Salas</Title>
                    <LineDiv>
                        <SmallButton img={notification} />
                        <SmallButton img={mail} />
                        <UserButton text="Admin" />
                    </LineDiv>
                </LineDiv>
            </Section>
        </Main>
    )
}