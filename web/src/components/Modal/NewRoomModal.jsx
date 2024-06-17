import { Form } from "./NewRoomModalStyle"
import axios from "axios"
import { HeaderModal } from "./HeaderModal";
import { SubmitButton } from "../Button/Button";
import { CardModal } from "./CardModal";
import { useState } from "react";

export function NewRoomModal({ isOpen, setOpen }) {

    const [data, setData] = useState({
        name: "",
        capacity: 0,
        description: ""
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

    const add  = (e) => {
        e.preventDefault();
        const meetingRoom = {
            name: data.name,
            capacity: parseInt(data.capacity),
            description: data.description
        };
        axios.post("http://localhost:3333/meetingRoom/create", meetingRoom)
        .then((response) => {
            //atualizar tabela
            console.log("deu certo");
            setOpen(!isOpen)
        })
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
    };
    if (isOpen) {
        return (
            <Form onSubmit={add}>
                <HeaderModal click={fecharModal} titulo="Criar Sala" />
                <CardModal text="Nome:" type="text" name="name" change={handleChange} />
                <CardModal text="Capacidade:" type="number" name="capacity" change={handleChange}  />
                <CardModal text="Equipamentos:" type="text" name="description" change={handleChange} />
                <SubmitButton text="CRIAR" />
            </Form>
        )    
    }
}