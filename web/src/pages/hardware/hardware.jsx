import { useState, useEffect } from "react";
import axios from "../../axios/axiosConfig.js";
import { Center, Main, Section, Spinner } from "./hardwareStyle";
import { Side } from "../../components/Side/side";
import { AddButton } from "../../components/Button/Button";
import plus from "../../img/plus.png";
import { NewHardwareModal } from "../../components/Modal/NewHardwareModal";
import { Table } from "../../components/Table/Table";
import { Header } from "../../components/Header/Header";
import { createColumnHelper } from "@tanstack/react-table";
import routes from "../../endpoints/routes";

export function Hardwares() {
  const userType = localStorage.getItem("userType");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [hardware, setHardware] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (open === true) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  const openModal = (id) => {
    setId(id);
    setTimeout(() => {
      setOpen(!open);
    }, 250);
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

  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hardware = await axios.get(
          routes.HARDWARE.GET_ALL_HARDWARES
        );
        setHardware(hardware.data);
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
        <Header title="Equipamentos" />
        <Section>
          {userType === "ADMIN" && (
            <>
              <AddButton
                id="addButton"
                click={() => setOpen(!open)}
                text="Novo Equipamento"
                img={plus}
              />
              <NewHardwareModal isOpen={open} setOpen={setOpen} id={id} setId={setId} />
            </>
          )}
          <Table
            type="hardware"
            dataTable={hardware}
            dataColumns={columns}
            url={
              routes.HARDWARE.DELETE_HARDWARE
            }
            click={openModal}
          />
        </Section>
      </Section>
    </Main>
  );
}
