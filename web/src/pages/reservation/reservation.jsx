import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import 'react-calendar/dist/Calendar.css';
import { Main, Section } from './reservationStyle';
import { Side } from '../../components/Side/side';

// Defina o elemento de aplicação para acessibilidade
Modal.setAppElement('#root');

export function Reservation() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Funções para abrir e fechar o modal
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    // Função para lidar com a mudança de data
    const handleDateChange = (date) => {
        setSelectedDate(date);
        closeModal(); // Fecha o modal após selecionar a data
    };

    return (
        <div>
            <button onClick={openModal}>Open Calendar</button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Select a Date"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>Select a Date</h2>
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                />
                <button onClick={closeModal}>Close</button>
            </Modal>

            <p>Selected Date: {selectedDate.toDateString()}</p>
        </div>
    );
};
