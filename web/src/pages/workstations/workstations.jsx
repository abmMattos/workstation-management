import { Center, Main, Section, Spinner } from "../rooms/roomStyle"
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
    const [workstation, setWorkstation] = useState([]);
    const [reservation, setReservation] = useState([]);
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
        columnHelper.accessor("name", {
            header: () => <strong>Nome</strong>,
            cell: (info) => info.renderValue(),
        }),
        columnHelper.accessor((row) => row.status, {
            id: "status",
            cell: (info) => <i>{info.getValue()}</i>,
            header: () => <strong>Status</strong>,
        }),
        columnHelper.accessor("description", {
            header: () => <strong>Descrição</strong>,
        }),
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reservation = await axios.get(
                    "https://workstation-management.onrender.com/reservation/findReservedWorkstation"
                );
                const workstation = await axios.get(
                    'https://workstation-management.onrender.com/workstation/'
                );
                setWorkstation(workstation.data);
                setReservation(reservation.data);
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

    let data = workstation.map(work => {
        const [reserved] = reservation.map(res => {
          if (work.id === res.workstation_id) {
            return res;
          }
          return false
        })
        if (reserved) {
          if (reserved.dateReserve === dataAtual) {
            return { ...work, status: 'Indisponível' }
          }
        }
        return { ...work, status: 'Disponível' }
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
                <Header title="Estações de Trabalho" />
                <Section>
                    {userType === 'ADMIN' && (
                        <>
                            <AddButton id="addButton" click={() => setOpen(!open)} text="Nova Estação" img={plus} />
                            <NewWorkstationModal isOpen={open} setOpen={setOpen} />
                        </>
                    )}
                    <Table type="Workstation" dataTable={data} dataColumns={columns} url={'https://workstation-management.onrender.com/workstation/delete'} />
                </Section>
            </Section>
        </Main>
    )
}