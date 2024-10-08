import { BackgroundModal, Form, Select } from "./NewStationModalStyle"
import axios from "axios"
import { HeaderModal } from "./HeaderModal";
import { SubmitButton } from "../Button/Button";
import { CardModal } from "./CardModal";
import { useState } from "react";

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
        setOpen(!isOpen);
    }

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
        axios.post("https://workstation-management.onrender.com/station/create", station)
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
                    <Select name="type" onChange={handleChange}>
                        <option value={"workstation"} selected>Estação de trabalho</option>
                        <option value={"meetingRoom"}>Sala de reunião</option>
                    </Select>
                    <CardModal text="Nome:" type="text" name="name" change={handleChange} required={true} />
                    <CardModal text="Capacidade:" type="number" name="capacity" change={handleChange} required={true} />
                    <CardModal text="Equipamentos:" type="text" name="description" change={handleChange} required={true} />
                    <SubmitButton text="CRIAR" />
                </Form>
            </BackgroundModal>
        )
    }
}