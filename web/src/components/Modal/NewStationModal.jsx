import { BackgroundModal, Form } from "./NewStationModalStyle";
import axios from "axios";
import { HeaderModal } from "./HeaderModal";
import { SubmitButton } from "../Button/Button";
import { CardModal } from "./CardModal";
import { useState, useEffect } from "react";
import routes from "../../endpoints/routes";
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../toastify/ReactToastify.css'

export function NewStationModal({ isOpen, setOpen, id, setId }) {

    const [data, setData] = useState({
        name: "",
        capacity: 0,
        hardwares: [],
        status: "active",
        type: ""
    });

    const handleType = (select) => {
        setData({
            ...data,
            type: select.value
        });
    }

    const handleHardwares = (select) => {
        setData({
            ...data,
            hardwares: select.map(hardware => ({ id: hardware["value"] }))
        });
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };

    const fecharModal = (e) => {
        e.preventDefault();
        toast.info(
            <div>
                <span id="text">Tem certeza que deseja fechar?</span>
                <div id="buttons">
                    <button id="green-button-confirmation"
                        onClick={() => {
                            setOpen(!isOpen);
                            setId("");
                            toast.dismiss();
                        }}
                    >
                        Sim
                    </button>
                    <button id="grey-button-confirmation"
                        onClick={() => toast.dismiss()}
                    >
                        Não
                    </button>
                </div>
            </div>, {
            position: "top-center",
            autoClose: false,
            closeButton: false,
            draggable: false,
            pauseOnHover: false,
            className: 'toast-confirmation',
        });
        toast.clearWaitingQueue();
    }

    const [hardware, setHardware] = useState([]);

        const fetchData = async () => {
        try {
            const hardware = await axios.get(
                routes.HARDWARE.GET_ALL_HARDWARES
                );
            setHardware(hardware.data);
        } catch (error) {
            console.log("Erro:" + error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchHardware = async () => {
        try {
            const station = await axios.get(
                routes.STATION.GET_FIND_UNIQUE, {
                    params: {
                    id: id,
                }
            }
            );
            setData(station.data);
            // setHardware(station.data.hardwares.map(hardware => ({ id: hardware["value"] })));
        } catch (error) {
            toast.error("Erro ao buscar Estação " + error);
        }
        };
        
        useEffect(() => {
            if (id) {
                fetchHardware();
            }
          }, [id]);

    const add = (e) => {
        e.preventDefault();
        if (data.name.trim().length <= 3 || data.capacity == null) {
            toast.error(
                <div>
                    <span id="text">Preencha todos os dados corretamente!</span>
                </div>, {
                    position: "top-center",
                    autoClose: true,
                    draggable: false,
                    pauseOnHover: false,
                    className: 'toast-confirmation',
                });
            return;
        }
        const station = {
            name: data.name,
            capacity: parseInt(data.capacity),
            hardwares: data.hardwares,
            type: data.type,
            status: data.status,
            id: id
        };
        axios.post(id ? routes.STATION.UPDATE_STATION : routes.STATION.CREATE_STATION, station)
            .then((response) => {
                setOpen(!isOpen);
                setId("");
                window.location.reload();
            })
            .catch((err) => {
                toast.error("ops! ocorreu um erro" + err);
            });
    };

    const addNewHardware = (valor) => {
        if (valor.trim().length <= 3) {
            toast.error(
                <div>
                    <span id="text">Preencha todos os dados corretamente!</span>
                </div>, {
                    position: "top-center",
                    autoClose: true,
                    draggable: false,
                    pauseOnHover: false,
                    className: 'toast-confirmation',
                });
            return;
        }

        axios.post(routes.HARDWARE.CREATE_HARDWARE, { name: valor })
            .then((response) => {
                toast.success("Novo equipamento criado")
                fetchData()
            })
            .catch((err) => {
                toast.error("ops! ocorreu um erro" + err);
            });
    };

    if (isOpen) {
        return (
            <>
                <BackgroundModal onClick={fecharModal}>
                    <Form onSubmit={add} onClick={e => e.stopPropagation()}>
                        <HeaderModal click={fecharModal} titulo={id ? "Atualizar Estação" : "Criar Estação"} />
                        <label htmlFor="type">Tipo:</label>
                        <Select options={[{ label: "Estação de trabalho", value: "workstation" }, { label: "Sala de reunião", value: "room" }]} placeholder="Selecione o tipo" isSearchable={false} onChange={(escolha) => handleType(escolha)} required />
                        <CardModal text="Nome:" type="text" name="name" change={handleChange} required={true} value={data.name} />
                        <CardModal text="Capacidade:" type="number" name="capacity" change={handleChange} required={true} value={data.capacity} />
                        <label>Equipamentos:</label>
                        <Creatable options={hardware.map(hardware => ({ label: hardware["name"], value: hardware['id'] }))} isMulti formatCreateLabel={(valor) => "Crie o equipamento: " + valor} placeholder="Selecione os equipamentos" onCreateOption={(valor) => addNewHardware(valor)} onChange={(escolhas) => handleHardwares(escolhas)} required />
                        <SubmitButton text={id ? "ATUALIZAR" : "CRIAR"} />
                    </Form>
                </BackgroundModal>
                <ToastContainer limit={1} />
            </>
        )
    }
}
