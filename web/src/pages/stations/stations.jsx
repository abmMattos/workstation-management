import { useState, useEffect } from "react";
import axios from "axios";
import { Center, Main, Section, Spinner } from "./stationsStyle";
import { Side } from "../../components/Side/side";
import { AddButton } from "../../components/Button/Button";
import plus from "../../img/plus.png";
import { NewStationModal } from "../../components/Modal/NewStationModal";
import { Table } from "../../components/Table/Table";
import { Header } from "../../components/Header/Header";
import { createColumnHelper } from "@tanstack/react-table";
import routes from "../../endpoints/routes";

export function Stations() {
  const userType = localStorage.getItem("userType");
  const [open, setOpen] = useState(false);
  const [station, setStation] = useState([]);
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
      header: () => <strong>Ativo</strong>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("capacity", {
      header: () => <strong>Capacidade</strong>,
    }),
    columnHelper.accessor("hardwares", {
      header: () => <strong>Equipamentos</strong>,
    }),
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const station = await axios.get(
          routes.STATION.GET_ALL_STATIONS
        );
        setStation(station.data);
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
    return <div>Erro</div>;
  }

  return (
    <Main>
      <Side />
      <Section>
        <Header title="Estações" />
        <Section>
          {userType === "ADMIN" && (
            <>
              <AddButton
                id="addButton"
                click={() => setOpen(!open)}
                text="Nova Estação"
                img={plus}
              />
              <NewStationModal isOpen={open} setOpen={setOpen} />
            </>
          )}
          <Table
            type="station"
            dataTable={station}
            dataColumns={columns}
            url={
              routes.STATION.DELETE_STATION
            }
          />
        </Section>
      </Section>
    </Main>
  );
}
