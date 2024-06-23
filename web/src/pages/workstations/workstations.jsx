import { Main, Section } from "../rooms/roomStyle"
import { Side } from "../../components/Side/side"
import { AddButton } from "../../components/Button/Button"
import plus from "../../img/plus.png"
import { useState } from "react"
import { Table } from "../../components/Table/Table"
import { Header } from "../../components/Header/Header"
import { NewWorkstationModal } from "../../components/Modal/NewWorkstationModal";
import { createColumnHelper } from "@tanstack/react-table"
import { dataTable } from "../../api/workstations/api"

export function Workstations() {
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
    columnHelper.accessor((row) => row.status, {
      id: "status",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <strong>Status</strong>,
    }),
    columnHelper.accessor("description", {
      header: () => <strong>Descrição</strong>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("local", {
      header: () => <strong>Localização</strong>,
    }),
  ];

  return (
    <Main>
      <Side />
      <Section>
        <Header title="Estações de Trabalho" />
        <Section>
          <AddButton click={() => setOpen(!open)} text="Nova estação" img={plus} />
          <NewWorkstationModal isOpen={open} setOpen={setOpen} />
          <Table dataTable={dataTable} dataColumns={columns} />
        </Section>
      </Section>
    </Main>
  )
}