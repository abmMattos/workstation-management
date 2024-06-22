import { Main, Section } from "./usersStyle"
import { Side } from "../../components/Side/side"
import { AddButton } from "../../components/Button/Button"
import plus from "../../img/plus.png"
import { NewUserModal } from "../../components/Modal/NewUserModal";
import { useState } from "react"
import { Table } from "../../components/Table/Table"
import { Header } from "../../components/Header/Header"

export function Users() {
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
                <Header title="Usuários" />
                <Section>
                    <AddButton click={() => setOpen(!open)} text="Cadastrar Usuário" img={plus} />
                    <NewUserModal isOpen={open} setOpen={setOpen} />
                    <Table />
                </Section>
            </Section>
        </Main>
    )
}