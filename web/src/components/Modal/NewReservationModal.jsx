import { BackgroundModal, Form } from "./NewRoomModalStyle"
import axios from "axios"
import { HeaderModal } from "./HeaderModal";
import { SubmitButton } from "../Button/Button";
import { CardModal } from "./CardModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function NewReservationModal({ isOpen, setOpen, type, id }) {

    const navigate = useNavigate();

    const idUser = localStorage.getItem('idUser');

    const [data, setData] = useState({
        dateReserve: "",
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
        var dataA = new Date();
        var dataAtual = new Date(dataA.getTime() - (dataA.getTimezoneOffset() * 60000));
        dataAtual.setUTCHours(0,0,0,0);
        if (new Date(data.dateReserve).toJSON() < dataAtual.toJSON()) {
            alert("Data inválida! A data de agendamento tem que ser posterior a data atual!");
            return;
        }
        try {
            const response = await axios.get(
                `https://workstation-management.onrender.com/reservation/findReservedDate` + type,
                {
                    params: {
                        id: id,
                        date: dataAtual.toJSON()
                    }
                }
            );
            if (response.data === null) {
                alert("Data inválida! Esta " + (type === "Workstation" ? 'estação de trabalho' : 'sala') + " já está agendada para data selecionada!");
                console.log(response.data);
                return;
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao Reservar!');
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
                `https://workstation-management.onrender.com/reservation/reserve` + type,
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