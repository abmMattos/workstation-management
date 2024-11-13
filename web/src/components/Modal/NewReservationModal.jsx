import { BackgroundModal, Form } from "./NewStationModalStyle";
import axios from "axios";
import { HeaderModal } from "./HeaderModal";
import { SubmitButton } from "../Button/Button";
import { CardModal } from "./CardModal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import routes from "../../endpoints/routes";
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../toastify/ReactToastify.css';

export function NewReservationModal({ isOpen, setOpen, id, date, type, maxGuests }) {

    const navigate = useNavigate();
    const idUser = localStorage.getItem('idUser');
    const [data, setData] = useState({
        guests: [],
        motive: ""
    });

    const handleGuest = (select) => {
        setData({
            ...data,
            guests: select.map(guest => ({id: guest["value"], name:guest['name'], email: guest['email']}))
        });
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const users = await axios.get(
              routes.USER.GET_ALL_USERS
            );
            setUsers(users.data);
          } catch (error) {
            toast.error("Erro:" + error);
          }
        };
    
        fetchData();
      }, []);

    const fecharModal = (e) => {
        e.preventDefault();
        toast.info(
            <div>
                <span id="text">Tem certeza que deseja fechar?</span>
                <div id="buttons">
                    <button id="green-button-confirmation"
                        onClick={() => {
                            setOpen(!isOpen);
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
    };

    const add = async (e) => {
        e.preventDefault();
        if (data.motive.trim().length <= 3) {
            alert("Preencha todos os dados corretamente!");
            return;
        }
        
        if(type === "room" && data.guests.length > maxGuests){
            alert("Número de convidados selecionados superior a capacidade máxima da sala!");
            return;
        }

        
        var reservation = {
            dateReserve: new Date(date.setHours(0,0,0,0)).toISOString(),
            motive: data.motive,
            guests: data.guests,
            user_id: idUser,
            station_id: id
        };      
        
        try {
            const response = await axios.post(
                routes.RESERVATION.MAKE_RESERVATION,
                reservation
            );
            setOpen(!isOpen);
            window.location.reload();
        } catch (error) {
            console.error(error);
            toast.error('Erro ao Reservar!');
        }
    };

    if (isOpen) {
        return (
            <>
            <BackgroundModal onClick={fecharModal}>
                <Form onSubmit={add} onClick={e => e.stopPropagation()}>
                    <HeaderModal click={fecharModal} titulo="Agendamento" />
                    <CardModal text="Motivo do agendamento:" type="text" name="motive" change={handleChange} required={true} />
                    {type === "room" && (<Select options={users.map(user => ({ label: user["email"], value: user['email'] }))} placeholder="Selecione convidados" onChange={(escolha) => handleGuest(escolha)} isMulti />)}
                    <SubmitButton text="AGENDAR" />
                </Form>
            </BackgroundModal>
            <ToastContainer />
            </>  
        )
    }
}
