import { Main, Section } from "../rooms/roomStyle"
import { Side } from "../../components/Side/side"
import { AddButton } from "../../components/Button/Button"
import plus from "../../img/plus.png"
import { useEffect, useState } from "react"
import { Table } from "../../components/Table/Table"
import { Header } from "../../components/Header/Header"
import { NewWorkstationModal } from "../../components/Modal/NewWorkstationModal";
import { createColumnHelper } from "@tanstack/react-table"
import axios from "axios"

export function Workstations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userType = localStorage.getItem('userType');

  const [open, setOpen] = useState(false);
  if (open === true) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
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
        const response = await axios.get('https://workstation-management.onrender.com/workstation/');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <Main>
      <Side />
      <Section>
        <Header title="Estações de Trabalho" />
        <Section>
          {userType === 'ADMIN' && (
            <>
              <AddButton id="addButton" click={() => setOpen(!open)} text="Nova Sala" img={plus} />
              <NewWorkstationModal isOpen={open} setOpen={setOpen} />
            </>
          )}
          <Table type="Workstation" dataTable={data} dataColumns={columns} url={'https://workstation-management.onrender.com/workstation/delete'} />
        </Section>
      </Section>
    </Main>
  )
}