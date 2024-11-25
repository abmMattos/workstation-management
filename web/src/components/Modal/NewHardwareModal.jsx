import { BackgroundModal, Form } from "./NewStationModalStyle";
import axios from "../../axios/axiosConfig.js";
import { HeaderModal } from "./HeaderModal";
import { SubmitButton } from "../Button/Button";
import { CardModal } from "./CardModal";
import { useState, useEffect } from "react";
import routes from "../../endpoints/routes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../toastify/ReactToastify.css';

export function NewHardwareModal({ isOpen, setOpen, id, setId }) {

    const [data, setData] = useState({
        name: "",
    });
    
    const fetchData = async () => {
        try {
            const hardware = await axios.get(
                routes.HARDWARE.GET_FIND_UNIQUE, {
                    params: {
                    id: id,
                }
            }
            );
            setData(hardware.data);
        } catch (error) {
            toast.error("Erro ao buscar Equipamento " + error, {autoClose: 1500, position: "top-center"});
        }
        };
        
        useEffect(() => {
            if (id) {
              fetchData();
            }
          }, [id]);
        
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
            toast.clearWaitingQueue();
        }
        
        const add = () => {
        if (data.name.trim().length <= 3) {
            toast.error(
                <div>
                    <span id="text">Preencha todos os dados corretamente!</span>
                </div>, {
                    position: "top-center",
                    autoClose: true,
                    draggable: false,
                    pauseOnHover: false,
                    className: 'toast-confirmation',
                });
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
                                        toast.error("ops! ocorreu um erro" + err, {autoClose: 1500, position: "top-center"});
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
                    toast.error("ops! ocorreu um erro" + err, {autoClose: 1500, position: "top-center"});
                });
        }
    };

    if (isOpen) {
        return (
            <>
                <BackgroundModal onClick={fecharModal}>
                    <Form onSubmit={add} onClick={e => e.stopPropagation()}>
                        <HeaderModal click={fecharModal} titulo={id ? "Atualizar Equipamento" : "Criar Equipamento"} />
                        <CardModal text="Nome:" type="text" name="name" change={handleChange} required={true} value={data.name} />
                        <SubmitButton text={id ? "ATUALIZAR" : "CRIAR"} onSubmit={add} />
                    </Form>
                </BackgroundModal>
                <ToastContainer  limit={1} />
            </>
        )
    }
}
