import { Main, Section, Title, LineDiv } from "./roomStyle"
import { Link } from "react-router-dom";
import { Side } from "../../components/Side/side"
import notification from "../../img/notification.png"
import { SmallButton, UserButton, AddButton } from "../../components/Button/Button"
import mail from "../../img/mail.png"
import plus from "../../img/plus.png"
import axios from "axios"
import { useState } from 'react';

export function Rooms() {
    const [meetingRoom, setMeetingRoom] = useState();

    function add() {
        axios
            .post("http://localhost:3333/meetingRoom/create", {
                name: "Nome teste",
                identifier: 123,
                description: "Descrição teste",
                photo: "foto teste",
            })
            .then((response) => {
                setMeetingRoom(response.data)
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });

    }


    return (
        <Main>
            <Side />
            <Section>
                <LineDiv>
                    <Title>Salas</Title>
                    <LineDiv>
                        <SmallButton img={notification} />
                        <SmallButton img={mail} />
                        <UserButton text="Admin" />
                    </LineDiv>
                </LineDiv>
                <Section>
                <Link to="/novaSala"><AddButton text="Nova Sala" img={plus} /></Link>
                    

                </Section>
            </Section>
        </Main>
    )
}