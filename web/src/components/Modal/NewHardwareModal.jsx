import { BackgroundModal, Form } from "./NewStationModalStyle";
import axios from "axios";
import { HeaderModal } from "./HeaderModal";
import { SubmitButton } from "../Button/Button";
import { CardModal } from "./CardModal";
import { useState } from "react";
import routes from "../../endpoints/routes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../toastify/ReactToastify.css';

export function NewHardwareModal({ isOpen, setOpen, id, setId }) {

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
        toast.info(
            <div>
                <span id="text">Tem certeza que deseja fechar?</span>
                <div id="buttons">
                    <button id="yes-button"
                        onClick={() => {
                            setOpen(false);
                            setId("");
                            toast.dismiss();
                        }}
                    >
                        Sim
                    </button>
                    <button id="no-button"
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

    const add = (e) => {
        e.preventDefault();
        if (data.name.trim().length <= 3) {
            alert("Preencha todos os dados corretamente!");
            return;
        }

        const hardware = {
            name: data.name,
            id: id
        };

        if (id) {
            toast.info(
                <div>
                    <span id="text">Tem certeza que deseja atualizar este equipamento?</span>
                    <div id="buttons">
                        <button id="green-button-confirmation"
                            onClick={() => {
                                axios.post(routes.HARDWARE.UPDATE_HARDWARE, hardware)
                                    .then((response) => {
                                        setOpen(false);
                                        setId("");
                                        window.location.reload();
                                    })
                                    .catch((err) => {
                                        console.error("ops! ocorreu um erro" + err);
                                    });
                                toast.dismiss();
                            }}
                        >
                            Sim
                        </button>
                        <button id="red-button-confirmation"
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
        } else {
            axios.post(routes.HARDWARE.CREATE_HARDWARE, hardware)
                .then((response) => {
                    setOpen(false);
                    setId("");
                    window.location.reload();
                })
                .catch((err) => {
                    console.error("ops! ocorreu um erro" + err);
                });
        }
    };

    if (isOpen) {
        return (
            <>
                <BackgroundModal onClick={fecharModal}>
                    <Form onSubmit={add} onClick={e => e.stopPropagation()}>
                        <HeaderModal click={fecharModal} titulo={id ? "Atualizar Equipamento" : "Criar Equipamento"} />
                        <CardModal text="Nome:" type="text" name="name" change={handleChange} required={true} />
                        <SubmitButton text={id ? "ATUALIZAR" : "CRIAR"} />
                    </Form>
                </BackgroundModal>
                <ToastContainer />
            </>
        )
    }
}
