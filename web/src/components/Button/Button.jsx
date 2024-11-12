import { Menu, MenuItem, HomeButtonComponent, LoginButtonComponent, RegisterButtonComponent, SmallButtonComponent, UserButtonComponent, AddButtonComponent, SubmitButtonComponent, DeleteButtonComponent, StationPickerButton } from "./ButtonStyle"
import arrow from "../../img/arrow-down.png"
import user from "../../img/userGray.png"
import axios from "axios"
import { useState } from "react"
import { NewReservationModal } from "../Modal/NewReservationModal"
import { NavLink } from "react-router-dom"
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../toastify/ReactToastify.css';


export function HomeButton(props) {
    return (
        <HomeButtonComponent>
            {props.text}
        </HomeButtonComponent>
    )
}

export function LoginButton(props) {
    return (
        <LoginButtonComponent type="submit">
            {props.text}
        </LoginButtonComponent>
    )
}

export function RegisterButton(props) {
    return (
        <RegisterButtonComponent>
            {props.text}
        </RegisterButtonComponent>
    )
}

export function ReservationButton(props) {

    const [open, setOpen] = useState(false);

    function abrirModal() {
        setOpen(!open)
    }

    return (
        <>
            <NewReservationModal id={props.id} date={props.date} type={props.type} isOpen={open} setOpen={setOpen} />
            <SubmitButtonComponent onClick={abrirModal} >
                <h4>{props.text}</h4>
            </SubmitButtonComponent>
        </>
    )
}

export function SmallButton({ img, click, id }) {
    return (
        <SmallButtonComponent onClick={() => click(id)} >
            <img src={img} alt="" />
        </SmallButtonComponent>
    )
}

export function EditButton({ img, click, id }) {

    const handleClick = (id) => {
        toast.info(
            <div>
                <span id="text">Tem certeza que deseja editar?</span>
                <div id="buttons">
                    <button id="green-button-confirmation"
                        onClick={() => {
                            click(id);
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
    }

    return (
        <>
            <SmallButtonComponent onClick={() => handleClick(id)} >
                <img src={img} alt="" />
            </SmallButtonComponent>
            <ToastContainer />
        </>
    )
}

export function CancelReservationButton(props) {

    const handleCancelReservation = (id, url) => {
        toast.info(
            <div>
                <span id="text">Tem certeza que deseja cancelar a reserva?</span>
                <div id="buttons">
                    <button id="red-button-confirmation"
                        onClick={() => {
                            deleteData(id, url);
                            toast.dismiss();
                        }}
                    >
                        Sim
                    </button>
                    <button id="grey-button-confirmation"
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

    async function deleteData(id, url) {
        try {
            const response = await axios.delete(`${url}`, { data: { id: id } });
            window.location.reload();
            toast.success("Reserva cancelada com sucesso!");
        } catch (error) {
            toast.error("Ocorreu um erro ao tentar cancelar a reserva.");
        }
    }

    return (
        <>
            <DeleteButtonComponent onClick={() => handleCancelReservation(props.id, props.url)} >
                {props.text}
            </DeleteButtonComponent>
            <ToastContainer />
        </>
    );
}

export function DeleteButton(props) {

    const handleDeleteConfirmation = (id, url) => {
        toast.info(
            <div>
                <span id="text">Tem certeza que deseja deletar este item?</span>
                <div id="buttons">
                    <button id="red-button-confirmation"
                        onClick={async () => {
                            await deleteData(id, url);
                            toast.dismiss();
                        }}
                    >
                        Sim
                    </button>
                    <button id="grey-button-confirmation"
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

    const deleteData = async (id, url) => {
        try {
            const response = await axios.delete(`${url}`, { data: { id: id } });
            window.location.reload();
            return response.data;
        } catch (error) {
            console.error("Erro ao deletar:", error);
        }
    };

    return (
        <>
            <SmallButtonComponent onClick={() => handleDeleteConfirmation(props.id, props.url)}>
                <img src={props.img} alt="Deletar" />
            </SmallButtonComponent>
            <ToastContainer />
        </>
    );
}

export function UserButton(props) {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLogout = () => {
    };

    return (
        <div>
            <UserButtonComponent onClick={toggleMenu}>
                <div>
                    <img src={user} alt="" />
                    <p>{props.text}</p>
                </div>
                <img src={arrow} alt="" />
            </UserButtonComponent>
            {menuVisible && (
                <Menu>
                    <NavLink to='/login'>
                        <MenuItem onClick={handleLogout}>
                            <img src={props.img} alt="Sair" />
                            Sair
                        </MenuItem>
                    </NavLink>
                </Menu>
            )}
        </div>
    );
}

export function AddButton(props) {
    return (
        <AddButtonComponent onClick={props.click}>
            <img src={props.img} alt="" />
            {props.text}
        </AddButtonComponent>
    )
}

export function SubmitButton(props) {
    return (
        <SubmitButtonComponent type="submit">
            {props.text}
        </SubmitButtonComponent>
    )
}


export function StationPicker(props) {
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        setSelected(prev => !prev);
        props.onSelect();
    };

    return (
        <StationPickerButton
            selected={selected}
            onClick={handleClick}
        >
            {props.text}
        </StationPickerButton>
    );
}
