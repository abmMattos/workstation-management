import { useState, useEffect } from "react";
import axios from "axios";
import { Main, Section } from "./roomStyle";
import { Side } from "../../components/Side/side";
import { AddButton } from "../../components/Button/Button";
import plus from "../../img/plus.png";
import { NewRoomModal } from "../../components/Modal/NewRoomModal";
import { Table } from "../../components/Table/Table";
import { Header } from "../../components/Header/Header";
import { createColumnHelper } from "@tanstack/react-table";

export function Rooms() {
  const userType = localStorage.getItem("userType");
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState([]);
  const [reservation, setReservation] = useState([]);

  if (open === true) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("index", {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://workstation-management.onrender.com/meetingRoom/"
        );
        setRoom(response.data);
      } catch (error) {
        console.error('Não foi possível consultar salas');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://workstation-management.onrender.com/reservation/findReservedMeetingRoom"
        );
        setReservation(response.data);
      } catch (error) {
        console.error('Não foi possível consultar salas');
      }
    };

    fetchData();
  }, []);

  let data = room.map(room => {
    const date = new Date()
    date.setUTCHours(0,0,0,0);
    if(date === reservation.dateReserve) {
      return { ...room, status: 'Indisponível'}
    }
    return { ...room, status: 'Disponível'}
  })     

  return (
    <Main>
      <Side />
      <Section>
        <Header title="Salas" />
        <Section>
          {userType === "ADMIN" && (
            <>
              <AddButton
                id="addButton"
                click={() => setOpen(!open)}
                text="Nova Sala"
                img={plus}
              />
              <NewRoomModal isOpen={open} setOpen={setOpen} />
            </>
          )}
          <Table
            type="MeetingRoom"
            dataTable={data}
            dataColumns={columns}
            url={
              "https://workstation-management.onrender.com/meetingRoom/delete"
            }
          />
        </Section>
      </Section>
    </Main>
  );
}
