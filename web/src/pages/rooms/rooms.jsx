import { Main, Section, Title, LineDiv } from "./roomStyle"
import { Side } from "../../components/Side/side"
import notification from "../../img/notification.png"
import { SmallButton, UserButton, AddButton } from "../../components/Button/Button"
import mail from "../../img/mail.png"
import plus from "../../img/plus.png"
import { NewRoomModal } from "../../components/Modal/NewRoomModal";
import { useState } from "react"
import { Table } from "../../components/Table/Table"

export function Rooms() {
    const [open, setOpen] = useState(false);
    if (open === true) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }

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
                <Section>
                <AddButton click={() => setOpen(!open)} text="Nova Sala" img={plus} />
                <NewRoomModal isOpen={open} setOpen={setOpen} />
                <Table />
                </Section>
            </Section>
        </Main>
    )
}