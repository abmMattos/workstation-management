import { Main, Section } from "../rooms/roomStyle"
import { Side } from "../../components/Side/side"
import { AddButton } from "../../components/Button/Button"
import plus from "../../img/plus.png"
import { useState } from "react"
import { Table } from "../../components/Table/Table"
import { Header } from "../../components/Header/Header"
import { NewWorkstationModal } from "../../components/Modal/NewWorkstationModal";

export function Workstations() {
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
                <Header title="Estações de Trabalho" />
                <Section>
                    <AddButton click={() => setOpen(!open)} text="Nova estação" img={plus} />
                    <NewWorkstationModal isOpen={open} setOpen={setOpen} />
                    <Table />
                </Section>
            </Section>
        </Main>
    )
}