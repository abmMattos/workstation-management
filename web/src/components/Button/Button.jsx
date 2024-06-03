import { HomeButton } from "./ButtonStyle"

export function Button(props) {
    return(
        <HomeButton>
            {props.text}
        </HomeButton>
    )
}