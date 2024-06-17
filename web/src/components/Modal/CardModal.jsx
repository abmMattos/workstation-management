import { Input, Main } from "./CardModalStyle";

export function CardModal(props) {

    return (
        <Main>
            <label htmlFor={props.name}>{props.text}</label>
            <Input onChange={props.change} type={props.type} name={props.name} />
        </Main>
    )
}