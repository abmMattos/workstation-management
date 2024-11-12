import { BackgroundModal, Form } from "./NewStationModalStyle"
import axios from "axios"
import { HeaderModal } from "./HeaderModal";
import { SubmitButton } from "../Button/Button";
import { CardModal } from "./CardModal";
import { useState, useEffect } from "react";
import routes from "../../endpoints/routes";
import Select from 'react-select';
import Creatable from 'react-select/creatable';

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
            hardwares: select.map(hardware => ({ id: hardware["value"]}))
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
        if (window.confirm("Tem certeza que deseja fechar?")) {
            setOpen(!isOpen);
            setId("");
        }
        return;
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

    const add = (e) => {
        e.preventDefault();
        if (data.name.trim().length <= 3 || data.capacity == null) {
            alert("Preencha todos os dados corretamente!");
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
                console.error("ops! ocorreu um erro" + err);
            });
    };

    const addNewHardware = (valor) => {
        if (valor.trim().length <= 3) {
            alert("Preencha todos os dados corretamente!");
            return;
        }

        axios.post(routes.HARDWARE.CREATE_HARDWARE, {name : valor})
            .then((response) => {
                alert("Novo equipamento criado");
                fetchData()
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    };

    if (isOpen) {
        return (
            <BackgroundModal onClick={fecharModal}>
                <Form onSubmit={add} onClick={e => e.stopPropagation()}>
                    <HeaderModal click={fecharModal} titulo={id ? "Atualizar Estação" : "Criar Estação"} />
                    <label htmlFor="type">Tipo:</label>
                    <Select options={[{label:"Estação de trabalho", value:"workstation"},{label:"Sala de reunião", value:"room"}]} placeholder="Selecione o tipo" isSearchable={false} onChange={(escolha) => handleType(escolha)} required/>
                    <CardModal text="Nome:" type="text" name="name" change={handleChange} required={true} />
                    <CardModal text="Capacidade:" type="number" name="capacity" change={handleChange} required={true} />
                    <label>Equipamentos:</label>
                    <Creatable options={hardware.map(hardware => ({ label: hardware["name"], value: hardware['id'] }))} isMulti formatCreateLabel={(valor) => "Crie o equipamento: " + valor} placeholder="Selecione os equipamentos" onCreateOption={(valor) => addNewHardware(valor)} onChange={(escolhas) => handleHardwares(escolhas)} required />
                    <SubmitButton text={id ? "ATUALIZAR" : "CRIAR"} />
                </Form>
            </BackgroundModal>
        )
    }
}