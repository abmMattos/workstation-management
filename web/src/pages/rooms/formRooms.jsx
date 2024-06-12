import { Main, Section, Title, LineDiv, } from "./roomStyle"
import { Side } from "../../components/Side/side"
import notification from "../../img/notification.png"
import { SmallButton, UserButton } from "../../components/Button/Button"
import mail from "../../img/mail.png"
import axios from "axios"
import { useState } from 'react';
import { NewRoomModal } from "../../components/Modal/NewRoomModal"


export function FormRooms() {
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
                    <Title>Nova Sala</Title>
                    <LineDiv>
                        <SmallButton img={notification} />
                        <SmallButton img={mail} />
                        <UserButton text="Admin" />
                    </LineDiv>
                </LineDiv>
                <NewRoomModal>
                    
                </NewRoomModal>
            </Section>
        </Main>
    )
}