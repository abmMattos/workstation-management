import { BackgroundModal, Form } from "./NewStationModalStyle"
import axios from "axios"
import { HeaderModal } from "./HeaderModal";
import { SubmitButton } from "../Button/Button";
import { CardModal } from "./CardModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import routes from "../../endpoints/routes";

export function NewReservationModal({ isOpen, setOpen, id, date, type }) {

    const navigate = useNavigate();

    const idUser = localStorage.getItem('idUser');

    const [data, setData] = useState({
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
        if (window.confirm("Tem certeza que deseja fechar?")) {
            setOpen(!isOpen);
        }
        return;
    }

    const add = async (e) => {
        e.preventDefault();
        if (data.motive.trim().length <= 3 || data.guests.trim().length <= 3) {
            alert("Preencha todos os dados corretamente!");
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
                    {type === "room" && (<CardModal text="Convidados:" type="text" name="guests" change={handleChange} required={true} />)}
                    <SubmitButton text="AGENDAR" />
                </Form>
            </BackgroundModal>
        )
    }
}