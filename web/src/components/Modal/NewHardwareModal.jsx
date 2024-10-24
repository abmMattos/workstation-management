import { BackgroundModal, Form } from "./NewStationModalStyle"
import axios from "axios"
import { HeaderModal } from "./HeaderModal";
import { SubmitButton } from "../Button/Button";
import { CardModal } from "./CardModal";
import { useState } from "react";
import routes from "../../endpoints/routes";

export function NewHardwareModal({ isOpen, setOpen }) {

    const [data, setData] = useState({
        name: "",
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

    const add = (e) => {
        e.preventDefault();
        if (data.name.trim().length <= 3) {
            alert("Preencha todos os dados corretamente!");
            return;
        }
        const hardware = {
            name: data.name,
        };
        axios.post(routes.HARDWARE.CREATE_HARDWARE, hardware)
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
                    <HeaderModal click={fecharModal} titulo="Criar Equipamento" />
                    <CardModal text="Nome:" type="text" name="name" change={handleChange} required={true} />
                    <SubmitButton text="CRIAR" />
                </Form>
            </BackgroundModal>
        )
    }
}