import { BackgroundModal, Form } from "./NewStationModalStyle"
import axios from "axios"
import { HeaderModal } from "./HeaderModal";
import { SubmitButton } from "../Button/Button";
import { CardModal } from "./CardModal";
import { useState, useEffect } from "react";
import routes from "../../endpoints/routes";
import Select from 'react-select';
import Creatable from 'react-select/creatable';

export function NewStationModal({ isOpen, setOpen }) {

    const [data, setData] = useState({
        name: "",
        capacity: 0,
        description: "",
        status: "active",
        type: ""
    });

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
        }
        return;
    }

    const [hardware, setHardware] = useState([]);

    useEffect(() => {
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
            description: data.description
        };
        axios.post(routes.STATION.CREATE_STATION, station)
            .then((response) => {
                setOpen(!isOpen);
                window.location.reload();
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    };
    if (isOpen) {
        return (
            <BackgroundModal onClick={fecharModal}>
                <Form onSubmit={add} onClick={e => e.stopPropagation()}>
                    <HeaderModal click={fecharModal} titulo="Criar Estação" />
                    <label htmlFor="type">Tipo:</label>
                    <Select options={[{label:"Estação de trabalho", value:"workstation"},{label:"Sala de reunião", value:"meetingRoom"}]}/>
                    <CardModal text="Nome:" type="text" name="name" change={handleChange} required={true} />
                    <CardModal text="Capacidade:" type="number" name="capacity" change={handleChange} required={true} />
                    <label>Equipamentos:</label>
                    <Creatable options={hardware.map(hardware => ({ label: hardware["name"], value: hardware['id'] }))} isMulti/>
                    <SubmitButton text="CRIAR" />
                </Form>
            </BackgroundModal>
        )
    }
}