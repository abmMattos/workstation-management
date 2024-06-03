import { HomeButtonComponent, LoginButtonComponent, RegisterButtonComponent } from "./ButtonStyle"

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