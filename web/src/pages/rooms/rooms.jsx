import { useState, useEffect } from "react";
import axios from "axios";
import { Center, Main, Section, Spinner } from "./roomStyle";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    columnHelper.accessor("name", {
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <strong>Nome</strong>,
    }),
    columnHelper.accessor("status", {
      header: () => <strong>Status</strong>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("capacity", {
      header: () => <strong>Capacidade</strong>,
    }),
    columnHelper.accessor("description", {
      header: () => <strong>Descrição</strong>,
    }),
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rooms = await axios.get(
          "https://workstation-management.onrender.com/meetingRoom/"
        );
        const reservations = await axios.get(
          "https://workstation-management.onrender.com/reservation/findReservedMeetingRoom"
        );
        setReservation(reservations.data);
        setRoom(rooms.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  var dataA = new Date();
  var dataAtual = new Date(dataA.getTime() - (dataA.getTimezoneOffset() * 60000));
  dataAtual.setUTCHours(0,0,0,0);
  dataAtual = dataAtual.toJSON();

  let data = room.map(room => {
    const [reserved] = reservation.map(res => {
      if (room.id === res.meetingroom_id) {
        return res;
      }
      return false
    })
    if (reserved) {
      if (reserved.dateReserve === dataAtual) {
        return { ...room, status: 'Indisponível' }
      }
    }
    return { ...room, status: 'Disponível' }
  })

  if (loading) {
    return <Center><Spinner /></Center>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

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
