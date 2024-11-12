import { BackgroundModal, Form } from "./NewStationModalStyle";
import axios from "axios";
import { HeaderModal } from "./HeaderModal";
import { SubmitButton } from "../Button/Button";
import { CardModal } from "./CardModal";
import { useState } from "react";
import routes from "../../endpoints/routes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function NewUserModal({ isOpen, setOpen, id, setId }) {

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
        toast.info(
            <div>
                <span id="text">Tem certeza que deseja fechar?</span>
                <div id="buttons">
                    <button id="green-button-confirmation"
                        onClick={() => {
                            setOpen(!isOpen);
                            setId("");
                            toast.dismiss();
                        }}
                    >
                        Sim
                    </button>
                    <button id="grey-button-confirmation"
                        onClick={() => toast.dismiss()} 
                    >
                        Não
                    </button>
                </div>
            </div>, {
                position: "top-center",
                autoClose: false,
                closeButton: false,
                draggable: false,
                pauseOnHover: false,
                className: 'toast-confirmation',
            });
    }

    const add = async (e) => {
        e.preventDefault();
        if (data.name.trim().length <= 3 || data.email.trim().length <= 3 || data.password.trim().length <= 3) {
            alert("Preencha todos os dados corretamente!");
            return;
        }
        try {
            const response = await axios.post(
                id ? routes.USER.UPDATE_USER : routes.USER.CREATE_USER ,
                {...data, id: id},
            );
            setOpen(!isOpen)
            setId("");
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Erro criar usuário!');
        }
    };

    if (isOpen) {
        return (
            <>
            <BackgroundModal onClick={fecharModal}>
                <Form onSubmit={add} onClick={e => e.stopPropagation()}>
                    <HeaderModal click={fecharModal} titulo={id ? "Atualizar Usuário" : "Cadastrar Usuário"} />
                    <CardModal text="Nome:" type="text" name="name" change={handleChange} required={true} />
                    <CardModal text="Email:" type="email" name="email" change={handleChange} required={true} />
                    <CardModal text="Senha:" type="password" name="password" change={handleChange} required={true} />
                    <SubmitButton text={id ? "ATUALIZAR" : "CADASTRAR"} />
                </Form>
            </BackgroundModal>
            <ToastContainer />
            </>
        )
    }
}
