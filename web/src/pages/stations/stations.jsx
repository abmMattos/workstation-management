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
  const [id, setId] = useState("");
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  

  const openModal = (id) => {
    setId(id);
    setTimeout(() => {
      setOpen(!open);
    }, 250);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const fetchData = async () => {
      try {
        const response = await axios.get(routes.STATION.GET_ALL_STATIONS);
        const data = response.data.map((station, index) => ({
          index: index + 1, 
          id: station.id,
          name: station.name,
          status: (station.status == "active") ? "Ativo"  : "Desativado",
          capacity: station.capacity,
          hardwares: station.hardwares.map(({ name }) => name).join(", ") 
        }));
        setStations(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [open]); 

  if (loading) {
    return <Center><Spinner /></Center>;
  }

  if (error) {
    return <div>Ocorreu um erro: {error.message}</div>; 
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
      cell: (info) => info.renderValue(), 
    }),
    columnHelper.accessor("hardwares", {
      header: () => <strong>Equipamentos</strong>,
      cell: (info) => info.renderValue(),
    }),
  ];

  return (
    <Main>
      <Side />
      <Section>
        <Header title="Salas e Estações" />
        <Section>
          {userType === "ADMIN" && (
            <>
              <AddButton
                id="addButton"
                click={() => setOpen(!open)}
                text="Cadastrar"
                img={plus}
              />
              <NewStationModal isOpen={open} setOpen={setOpen} id={id} setId={setId} />
            </>
          )}
          <Table
            type="station"
            dataTable={stations} 
            dataColumns={columns}
            url={routes.STATION.DELETE_STATION}
            urlBlock={routes.STATION.BLOCK_STATION}
            click={openModal}
          />
        </Section>
      </Section>
    </Main>
  );
}
