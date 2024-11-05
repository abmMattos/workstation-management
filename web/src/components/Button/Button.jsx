import { Menu, MenuItem, HomeButtonComponent, LoginButtonComponent, RegisterButtonComponent, SmallButtonComponent, UserButtonComponent, AddButtonComponent, SubmitButtonComponent, DeleteButtonComponent, StationPickerButton } from "./ButtonStyle"
import arrow from "../../img/arrow-down.png"
import user from "../../img/userGray.png"
import axios from "axios"
import { useState } from "react"
import { NewReservationModal } from "../Modal/NewReservationModal"
import { NavLink } from "react-router-dom"


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

export function SmallButton({img, click, id}) {
    return (
        <SmallButtonComponent onClick={() => click(id)} >
            <img src={img} alt="" />
        </SmallButtonComponent>
    )
}

export function CancelReservationButton(props) {

    async function deleteData(id, url) {
        const response = await axios.delete("" + url + "", { data: { id: id } });
        window.location.reload();
        return response.data;
    }

    return (
        <DeleteButtonComponent onClick={() => deleteData(props.id, props.url)} >
            {props.text}
        </DeleteButtonComponent>
    )
}

export function DeleteButton(props) {

    async function deleteData(id, url) {
        const response = await axios.delete("" + url + "", { data: { id: id } });
        window.location.reload();
        return response.data;
    }
    return (
        <SmallButtonComponent onClick={() => deleteData(props.id, props.url)} >
            <img src={props.img} alt="" />
        </SmallButtonComponent>
    )
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
  