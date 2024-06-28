import { BackgroundModal, Form } from "./NewRoomModalStyle"
import axios from "axios"
import { HeaderModal } from "./HeaderModal";
import { SubmitButton } from "../Button/Button";
import { CardModal } from "./CardModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function NewRoomModal({ isOpen, setOpen }) {

    const navigate = useNavigate();

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

    const add = (e) => {
        e.preventDefault();
        if (data.name.trim().length <= 3 || data.capacity == null || data.description.trim().length <= 3) {
            alert("Preencha todos os dados corretamente!");
            return;
        }
        const meetingRoom = {
            name: data.name,
            capacity: parseInt(data.capacity),
            description: data.description
        };
        axios.post("https://workstation-management.onrender.com/meetingRoom/create", meetingRoom)
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
                    <HeaderModal click={fecharModal} titulo="Criar Sala" />
                    <CardModal text="Nome:" type="text" name="name" change={handleChange} required={true} />
                    <CardModal text="Capacidade:" type="number" name="capacity" change={handleChange} required={true} />
                    <CardModal text="Equipamentos:" type="text" name="description" change={handleChange} required={true} />
                    <SubmitButton text="CRIAR" />
                </Form>
            </BackgroundModal>
        )
    }
}