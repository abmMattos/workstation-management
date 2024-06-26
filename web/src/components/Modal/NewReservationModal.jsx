import { BackgroundModal, Form } from "./NewRoomModalStyle"
import axios from "axios"
import { HeaderModal } from "./HeaderModal";
import { SubmitButton } from "../Button/Button";
import { CardModal } from "./CardModal";
import { useState } from "react";

export function NewReservationModal({ isOpen, setOpen, type, id }) {

    const idUser = localStorage.getItem('idUser');

    const [data, setData] = useState({
        dateReserve: "",
        guests: "",
        motive:""
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
            dateReserve: new Date(data.dateReserve).toJSON(),
            guests: data.guests,
            motive: data.motive,
            meetingroom_id: id,
            user_id: idUser
        };

        if (type === "Workstation") {
            reservation = {
                dateReserve: new Date(data.dateReserve).toJSON(),
                guests: data.guests,
                motive: data.motive,
                workstation_id: id,
                user_id: idUser
            };
        } 
            
        try {
            const response = await axios.post(
                `https://workstation-management.onrender.com/reservation/reserve`+ type,
                reservation,
            );
            console.log(response.data);
            setOpen(!isOpen)

        } catch (error) {
            console.log(reservation);
            console.error(error);
            alert('Erro ao Reservar!');
        }
    };

    if (isOpen) {
        return (
            <BackgroundModal onClick={fecharModal}>
                <Form onSubmit={add} onClick={e => e.stopPropagation()}>
                    <HeaderModal click={fecharModal} titulo="Agendamento" />
                    <CardModal text="Data de agendamento:" type="date" name="dateReserve" change={handleChange} required={true} />
                    <CardModal text="Motivo do agendamento:" type="text" name="motive" change={handleChange} required={true} />
                    <CardModal text="Convidados:" type="text" name="guests" change={handleChange} required={true} />
                    <small>Separe os emails por virgula</small>
                    <SubmitButton text="CONFIRMAR AGENDAMENTO" />
                </Form>
            </BackgroundModal>
        )
    }
}