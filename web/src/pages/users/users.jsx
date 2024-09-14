import { Main, Section } from "./usersStyle";
import { Side } from "../../components/Side/side";
import { AddButton } from "../../components/Button/Button";
import plus from "../../img/plus.png";
import { NewUserModal } from "../../components/Modal/NewUserModal";
import { useEffect, useState, useReducer } from "react";
import { Table } from "../../components/Table/Table";
import { Header } from "../../components/Header/Header";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { Center, Spinner } from "../stations/stationsStyle";

export function Users() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
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
          "https://workstation-management.onrender.com/user"
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
          <NewUserModal isOpen={open} setOpen={setOpen} />
          <Table dataTable={data} dataColumns={columns} url={'https://workstation-management.onrender.com/user/delete'} />
        </Section>
      </Section>
    </Main>
  );
}
