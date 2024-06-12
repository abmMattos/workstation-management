import { Form } from "./NewRoomModalStyle"
import axios from "axios"
import { useState } from 'react';

export function NewRoomModal() {
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
        <Form>

        </Form>
    )
}