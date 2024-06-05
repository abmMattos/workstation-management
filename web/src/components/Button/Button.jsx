import { HomeButtonComponent, LoginButtonComponent, RegisterButtonComponent, SmallButtonComponent, UserButtonComponent } from "./ButtonStyle"
import arrow from "../../img/arrow-down.png"
import user from "../../img/userGray.png"


export function HomeButton(props) {
    return(
        <HomeButtonComponent>
            {props.text}
        </HomeButtonComponent>
    )
}

export function LoginButton(props) {
    return(
        <LoginButtonComponent>
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
        <SmallButtonComponent>
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