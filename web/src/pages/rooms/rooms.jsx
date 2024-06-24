import { Main, Section } from "./roomStyle"
import { Side } from "../../components/Side/side"
import { AddButton } from "../../components/Button/Button"
import plus from "../../img/plus.png"
import { NewRoomModal } from "../../components/Modal/NewRoomModal";
import { useState } from "react"
import { Table } from "../../components/Table/Table"
import { Header } from "../../components/Header/Header"
import { createColumnHelper } from "@tanstack/react-table";
import { apiData } from "../../api/rooms/api";

export function Rooms() {

  const userType = localStorage.getItem('userType');

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
        <Header title="Salas" />
        <Section>
          {userType === 'ADMIN' && (
            <>
              <AddButton id="addButton" click={() => setOpen(!open)} text="Nova Sala" img={plus} />
              <NewRoomModal isOpen={open} setOpen={setOpen} />
            </>
          )}

          <Table dataTable={apiData} dataColumns={columns} />
        </Section>
      </Section>
    </Main>
  )
}