import { Menu, MenuItem, RequestTradeButton, HomeButtonComponent, LoginButtonComponent, RegisterButtonComponent, SmallButtonComponent, UserButtonComponent, AddButtonComponent, SubmitButtonComponent, DeleteButtonComponent, StationPickerButton } from "./ButtonStyle"
import axios from "../../axios/axiosConfig.js"
import { useState } from "react"
import { NewReservationModal } from "../Modal/NewReservationModal"
import { NavLink } from "react-router-dom"
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../toastify/ReactToastify.css';
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowRoundDown } from "react-icons/io";

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

export function RequestTrade(props) {
    return (
        <>
            <RequestTradeButton>
                <h4>{props.text}</h4>
            </RequestTradeButton>
        </>
    )
}

export function ReservationButton(props) {

    const [open, setOpen] = useState(false);

    function abrirModal() {
        setOpen(!open)
    }

    return (
        <>
            <NewReservationModal maxGuests={props.maxGuests} id={props.id} date={props.date} type={props.type} isOpen={open} setOpen={setOpen} />
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

    return (
        <>
            <SmallButtonComponent onClick={() => click(id)} >
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
            toast.success("Reserva cancelada com sucesso!", {autoClose: 1500, position: "top-center"});
        } catch (error) {
            toast.error("Ocorreu um erro ao tentar cancelar a reserva.", {autoClose: 1500, position: "top-center"});
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
            toast.error("Erro ao deletar: " + error, {autoClose: 1500, position: "top-center"});
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

export function BlockButton(props) {

    const handleBlockConfirmation = (id, urlBlock, stationStatus) => {
        toast.info(
            <div>
                { stationStatus === 'Ativo' ?
                <span id="text">Tem certeza que deseja BLOQUEAR este item?</span>
                : 
                <span id="text">Tem certeza que deseja DESBLOQUEAR este item?</span>
                }
                <div id="buttons">
                    <button id="red-button-confirmation"
                        onClick={async () => {
                            await blockStations(id, urlBlock, stationStatus);
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

    const blockStations = async (id, urlBlock, stationStatus) => {
        let status;
        if (stationStatus === 'Ativo') {
            status = 'locked'
        }
        else {
            status = 'active'
        }        
        try {
            const response = await axios.put(urlBlock, { id: id, stationStatus: status });            
            window.location.reload();
            return response.data;
        } catch (error) {
            toast.error("Erro ao bloquear:", error);
        }
    };

    return (
        <>
            <SmallButtonComponent onClick={() => handleBlockConfirmation(props.id, props.urlBlock, props.stationStatus)}>
                <img src={props.img} alt="Bloquear / Desbloquear" />
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
        localStorage.clear();
    };

    return (
        <div>
            <UserButtonComponent onClick={toggleMenu}>
                <div>
                    <FaUserCircle style={{ background: 'none', padding: 0, borderRadius: 0, fontSize: 16 }} />
                    <p>{props.text}</p>
                </div>
                <IoMdArrowRoundDown style={{ background: 'none', padding: 0, borderRadius: 0, fontSize: 16 }} />
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
    const handleSubmitConfirmation = () => {
        return new Promise((resolve, reject) => {
            toast.info(
                <div>
                    { 
                    props.id ?
                        <span id="text">Tem certeza que deseja alterar?</span> 
                    : props.book ?
                        <span id="text">Tem certeza que deseja agendar?</span>
                    :
                        <span id="text">Tem certeza que deseja criar?</span>
                    }
                    
                    <div id="buttons">
                        <button 
                            id="green-button-confirmation"
                            onClick={() => {
                                toast.dismiss();
                                resolve(true);
                            }}
                        >
                            Sim
                        </button>
                        <button 
                            id="red-button-confirmation"
                            onClick={() => {
                                toast.dismiss();
                                resolve(false); 
                            }}
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
                }
            );
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const isConfirmed = await handleSubmitConfirmation();

        if (isConfirmed) {
            props.onSubmit();
        } else {
            toast.error("Ação cancelada.", {autoClose: 1500, position: "top-center"});
        }
    };

    return (
        <SubmitButtonComponent
            type="submit"
            onClick={handleSubmit}
            className="submit-button"
        >
            {props.text}
        </SubmitButtonComponent>
    );
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
