import { BackgroundModal, Form } from "./NewRoomModalStyle"
import axios from "axios"
import { HeaderModal } from "./HeaderModal";
import { SubmitButton } from "../Button/Button";
import { CardModal } from "./CardModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function NewWorkstationModal({ isOpen, setOpen }) {

    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        capacity: 0,
        screens: 0,
        keyboard: false,
        mouse: false,
        webcam: false,
        headset: false,
        description: "",
        isBlocked: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData({
            ...data,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const fecharModal = (e) => {
        e.preventDefault();
        setOpen(!isOpen);
    }

    const add = async (e) => {
        e.preventDefault();
        if (data.name.trim().length <= 3 || parseInt(data.capacity) == null || data.description.trim().length <= 3 || parseInt(data.screens) == null) {
            alert("Preencha todos os dados corretamente!");
            return;
        }

        const workstation = {
            name: data.name,
            capacity: parseInt(data.capacity),
            screens: parseInt(data.screens),
            keyboard: data.keyboard,
            mouse: data.mouse,
            webcam: data.webcam,
            headset: data.headset,
            description: data.description,
            isBlocked: data.isBlocked
        };

        try {
            const response = await axios.post(
                `https://workstation-management.onrender.com/workstation/create`,
                workstation,
            );
            setOpen(!isOpen);
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Erro ao criar estação!');
        }
    };

    if (isOpen) {
        return (
            <BackgroundModal onClick={fecharModal}>
                <Form onSubmit={add} onClick={e => e.stopPropagation()}>
                    <HeaderModal click={fecharModal} titulo="Criar Estação de Trabalho" />
                    <CardModal text="Nome:" type="text" name="name" change={handleChange} required={true} />
                    <CardModal text="Capacidade:" type="number" name="capacity" change={handleChange} required={true} />
                    <CardModal text="Monitores:" type="number" name="screens" change={handleChange} required={true} />
                    <CardModal text="Teclado:" type="checkbox" name="keyboard" change={handleChange} />
                    <CardModal text="Mouse:" type="checkbox" name="mouse" change={handleChange} />
                    <CardModal text="WebCam:" type="checkbox" name="webcam" change={handleChange} />
                    <CardModal text="Headset:" type="checkbox" name="headset" change={handleChange} />
                    <CardModal text="Equipamentos:" type="text" name="description" change={handleChange} required={true} />
                    <SubmitButton text="CRIAR" />
                </Form>
            </BackgroundModal>
        )
    }
}
