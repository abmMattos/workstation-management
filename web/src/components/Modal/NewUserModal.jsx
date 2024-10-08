import { BackgroundModal, Form } from "./NewStationModalStyle"
import axios from "axios"
import { HeaderModal } from "./HeaderModal";
import { SubmitButton } from "../Button/Button";
import { CardModal } from "./CardModal";
import { useState } from "react";
import routes from "../../endpoints/routes";

export function NewUserModal({ isOpen, setOpen }) {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
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

    const add = async (e) => {
        e.preventDefault();
        if (data.name.trim().length <= 3 || data.email.trim().length <= 3 || data.password.trim().length <= 3) {
            alert("Preencha todos os dados corretamente!");
            return;
        }
        try {
            const response = await axios.post(
                routes.USER.CREATE_USER,
                data,
            );
            setOpen(!isOpen)
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Erro criar usuário!');
        }
    };

    if (isOpen) {
        return (
            <BackgroundModal onClick={fecharModal}>
                <Form onSubmit={add} onClick={e => e.stopPropagation()}>
                    <HeaderModal click={fecharModal} titulo="Cadastrar Usuário" />
                    <CardModal text="Nome:" type="text" name="name" change={handleChange} required={true} />
                    <CardModal text="Email:" type="email" name="email" change={handleChange} required={true} />
                    <CardModal text="Senha:" type="password" name="password" change={handleChange} required={true} />
                    <SubmitButton text="CADASTRAR" />
                </Form>
            </BackgroundModal>
        )
    }
}