import { Main, Section } from "./usersStyle"
import { Side } from "../../components/Side/side"
import { AddButton } from "../../components/Button/Button"
import plus from "../../img/plus.png"
import { NewUserModal } from "../../components/Modal/NewUserModal";
import { useState } from "react"
import { Table } from "../../components/Table/Table"
import { Header } from "../../components/Header/Header"
import { createColumnHelper } from "@tanstack/react-table";
import { dataTable } from "../../api/users/api";

export function Users() {
  const [open, setOpen] = useState(false);
  if (open === true) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: () => <strong>#</strong>,
    }),
    columnHelper.accessor((row) => row.name, {
      id: "name",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <strong>Nome</strong>,
    }),
    columnHelper.accessor("email", {
      header: () => <strong>Email</strong>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("userType", {
      header: () => <strong>Tipo de Usuário</strong>,
    }),
  ];

  return (
    <Main>
      <Side />
      <Section>
        <Header title="Usuários" />
        <Section>
          <AddButton click={() => setOpen(!open)} text="Cadastrar Usuário" img={plus} />
          <NewUserModal isOpen={open} setOpen={setOpen} />
          <Table dataTable={dataTable} dataColumns={columns} />
        </Section>
      </Section>
    </Main>
  )
}