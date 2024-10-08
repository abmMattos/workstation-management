import { BackgroundModal, Form } from "./NewRoomModalStyle"
import axios from "axios"
import { HeaderModal } from "./HeaderModal";
import { SubmitButton } from "../Button/Button";
import { CardModal } from "./CardModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function NewReservationModal({ isOpen, setOpen, id, date }) {

    const navigate = useNavigate();

    const idUser = localStorage.getItem('idUser');

    const [data, setData] = useState({
        dateReserve: new Date(date.setHours(0,0,0,0)).toISOString(),
        guests: "",
        motive: ""
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
        if (data.motive.trim().length <= 3 || data.guests.trim().length <= 3) {
            alert("Preencha todos os dados corretamente!");
            return;
        }
        
        var reservation = {
            dateReserve: data.dateReserve,
            guests: data.guests,
            motive: data.motive,
            station_id: id,
            user_id: idUser
        };

        try {
            const response = await axios.post(
                "https://workstation-management.onrender.com/reservation/reserveStation",
                reservation
            );
            setOpen(!isOpen)
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Erro ao Reservar!');
        }
    };

    if (isOpen) {
        return (
            <BackgroundModal onClick={fecharModal}>
                <Form onSubmit={add} onClick={e => e.stopPropagation()}>
                    <HeaderModal click={fecharModal} titulo="Agendamento" />
                    <CardModal text="Motivo do agendamento:" type="text" name="motive" change={handleChange} required={true} />
                    <CardModal text="Convidados:" type="text" name="guests" change={handleChange} required={true} />
                    <small>Separe os emails por virgula</small>
                    <SubmitButton text="AGENDAR" />
                </Form>
            </BackgroundModal>
        )
    }
}