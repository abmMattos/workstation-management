import { BackgroundModal, Form } from "./NewRoomModalStyle"
import axios from "axios"
import { HeaderModal } from "./HeaderModal";
import { SubmitButton } from "../Button/Button";
import { CardModal } from "./CardModal";
import { useState } from "react";

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

    const add = (e) => {
        e.preventDefault();
        if (data.name.trim().length <= 3 || data.email.trim().length <= 3 || data.password.trim().length <= 3) {
            alert("Preencha todos os dados corretamente!");
            return;
        }
        const user = {
            name: data.name,
            email: data.email,
            password: data.password
        };
        axios.post("http://localhost:3333/user/create", user)
            .then((response) => {
                //atualizar tabela
                console.log("deu certo");
                setOpen(!isOpen)
            })
            .catch((err) => {
                alert("Email já utilizado!")
            });
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