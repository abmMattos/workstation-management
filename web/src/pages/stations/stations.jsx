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
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const fetchData = async () => {
      try {
        const response = await axios.get(routes.STATION.GET_ALL_STATIONS);
        const data = response.data.map((station, index) => ({
          index: index + 1, // Adiciona um índice para a tabela
          id: station.id,
          name: station.name,
          status: station.status,
          capacity: station.capacity,
          hardwares: station.hardwares.map(({ name }) => name).join(", ") // Junte os nomes dos hardwares em uma string
        }));
        setStations(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [open]); // Adiciona `open` como dependência se a função de fetch depender dela.

  if (loading) {
    return <Center><Spinner /></Center>;
  }

  if (error) {
    return <div>Ocorreu um erro: {error.message}</div>; // Mensagem de erro mais amigável
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
      cell: (info) => info.renderValue(), // Certifique-se de que o valor de `capacity` seja retornado aqui.
    }),
    columnHelper.accessor("hardwares", {
      header: () => <strong>Equipamentos</strong>,
      cell: (info) => info.renderValue(), // Certifique-se de que o valor de `hardwares` seja retornado aqui.
    }),
  ];

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
            dataTable={stations} // Renomeado para `stations` para manter a clareza.
            dataColumns={columns}
            url={routes.STATION.DELETE_STATION}
          />
        </Section>
      </Section>
    </Main>
  );
}
