import { useState, useEffect } from "react";
import axios from "axios";
import { Center, Main, Section, Spinner } from "./stationsStyle";
import { Side } from "../../components/Side/side";
import { AddButton } from "../../components/Button/Button";
import plus from "../../img/plus.png";
import { NewRoomModal } from "../../components/Modal/NewRoomModal";
import { Table } from "../../components/Table/Table";
import { Header } from "../../components/Header/Header";
import { createColumnHelper } from "@tanstack/react-table";

export function Stations() {
  const userType = localStorage.getItem("userType");
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    columnHelper.accessor("hardware", {
      header: () => <strong>Equipamentos</strong>,
    }),
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rooms = await axios.get(
          "https://workstation-management.onrender.com/station/"
        );
        setRoom(rooms.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
            dataTable={room}
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
