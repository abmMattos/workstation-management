import { Main, Section } from "./roomStyle"
import { Side } from "../../components/Side/side"
import { AddButton } from "../../components/Button/Button"
import plus from "../../img/plus.png"
import { NewRoomModal } from "../../components/Modal/NewRoomModal";
import { useState } from "react"
import { Table } from "../../components/Table/Table"
import { Header } from "../../components/Header/Header"

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
                <Header title="Salas" />
                <Section>
                    <AddButton click={() => setOpen(!open)} text="Nova Sala" img={plus} />
                    <NewRoomModal isOpen={open} setOpen={setOpen} />
                    <Table />
                </Section>
            </Section>
        </Main>
    )
}