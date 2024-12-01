import { Main, Section } from "./usersStyle";
import { Side } from "../../components/Side/side";
import { AddButton } from "../../components/Button/Button";
import plus from "../../img/plus.png";
import { NewUserModal } from "../../components/Modal/NewUserModal";
import { useEffect, useState, useReducer } from "react";
import { Table } from "../../components/Table/Table";
import { Header } from "../../components/Header/Header";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "../../axios/axiosConfig.js";
import { Center, Spinner } from "../stations/stationsStyle";
import routes from "../../endpoints/routes";

export function Users() {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  if (open === true) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  const columnHelper = createColumnHelper();

  const openModal = (id,name) => {
    setId(id);
    setName(name);
    setTimeout(() => {
      setOpen(!open);
    }, 250);
  }

  const columns = [
    columnHelper.accessor("index", {
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
  ];

  const userType = localStorage.getItem("userType");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          routes.USER.GET_ALL_USERS
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  if (userType !== "ADMIN") {
    return (
      <Main>
        <Side />
      </Main>
    );
  }

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
        <Header title="Usuários" />
        <Section>
          <AddButton
            click={() => setOpen(!open)}
            text="Cadastrar Usuário"
            img={plus}
          />
          <NewUserModal isOpen={open} setOpen={setOpen} id={id} name={name} setId={setId} />
          <Table dataTable={data} dataColumns={columns} url={routes.USER.DELETE_USER} click={openModal} />
        </Section>
      </Section>
    </Main>
  );
}
