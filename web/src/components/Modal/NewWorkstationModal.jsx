import { BackgroundModal, Form } from "./NewRoomModalStyle"
import axios from "axios"
import { HeaderModal } from "./HeaderModal";
import { SubmitButton } from "../Button/Button";
import { CardModal } from "./CardModal";
import { useState } from "react";

export function NewWorkstationModal({ isOpen, setOpen }) {

    const [data, setData] = useState({
        name: "",
        capacity: 0,
        screens:0,
        keyboard:false,
        mouse:false,    
        webcam:false,
        headset:false,
        description: "",
        isBlocked: false
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
        if (data.name.trim().length <= 3 || parseInt(data.capacity) == null || data.description.trim().length <= 3 || parseInt(data.screens) == null) {
            alert("Preencha todos os dados corretamente!");
            return;
        }
        
        const workstation = {
            name: data.name,
            capacity: parseInt(data.capacity),
            screens:parseInt(data.screens),
            keyboard:data.keyboard,
            mouse:data.mouse,    
            webcam:data.webcam,
            headset:data.headset,
            description: data.description,
            isBlocked: data.isBlocked
        };

        axios.post("http://localhost:3333/workstation/create", workstation)
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
            <BackgroundModal onClick={fecharModal}>
                <Form onSubmit={add} onClick={e => e.stopPropagation()}>
                    <HeaderModal click={fecharModal} titulo="Criar Estação de Trabalho" />
                    <CardModal text="Nome:" type="text" name="name" change={handleChange} />
                    <CardModal text="Capacidade:" type="number" name="capacity" change={handleChange} />
                    <CardModal text="Monitores:" type="number" name="screens" change={handleChange} />
                    <CardModal text="Teclado:" type="checkbox" name="keyboard" change={handleChange} />
                    <CardModal text="Mouse:" type="checkbox" name="mouse" change={handleChange} />
                    <CardModal text="WebCam:" type="checkbox" name="webcam" change={handleChange} />
                    <CardModal text="Headset:" type="checkbox" name="headset" change={handleChange} />
                    <CardModal text="Equipamentos:" type="text" name="description" change={handleChange} />
                    <SubmitButton text="CRIAR" />
                </Form>
            </BackgroundModal>
        )
    }
}