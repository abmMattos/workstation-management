import { HomeButtonComponent, LoginButtonComponent, RegisterButtonComponent, SmallButtonComponent, UserButtonComponent, AddButtonComponent, SubmitButtonComponent } from "./ButtonStyle"
import arrow from "../../img/arrow-down.png"
import user from "../../img/userGray.png"
import axios from "axios"


export function HomeButton(props) {
    return(
        <HomeButtonComponent>
            {props.text}
        </HomeButtonComponent>
    )
}

export function LoginButton(props) {
    return(
        <LoginButtonComponent type="submit">
            {props.text}
        </LoginButtonComponent>
    )
}

export function RegisterButton(props) {
    return(
        <RegisterButtonComponent> 
            {props.text}
        </RegisterButtonComponent>
    )
}

export function SmallButton(props) {
    return(
        <SmallButtonComponent onClick={props.event} >
            <img src={props.img} alt="" />
        </SmallButtonComponent>
    )
}

export function DeleteButton(props) {    

    async function deleteData(id, url) {
        const response = await axios.delete("" + url + "", {data: {id: id}});
        return response.data;
    }
    return(
        <SmallButtonComponent onClick={() => deleteData(props.id, props.url)} >
            <img src={props.img} alt="" />
        </SmallButtonComponent>
    )
}

export function UserButton(props) {
    return(
        <UserButtonComponent>
            <div>
                <img src={user} alt="" />
                <p>{props.text}</p>
            </div>
            <img src={arrow} alt="" />

        </UserButtonComponent>
    )
}

export function AddButton(props) {
    return(
        <AddButtonComponent onClick={props.click}>
            <img src={props.img} alt="" />
            {props.text}
        </AddButtonComponent>
    )
}

export function SubmitButton(props) {
    return(
        <SubmitButtonComponent type="submit">
            {props.text}
        </SubmitButtonComponent>
    )
}