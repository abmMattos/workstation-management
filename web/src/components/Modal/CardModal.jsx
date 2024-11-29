import { Checkbox, Input, Main } from "./CardModalStyle";

export function CardModal(props) {
        return (
            <Main>
                <label htmlFor={props.name}>{props.hasGuests === true ? "Escreva o motivo e horário de início:" :  props.text}</label>
                <Input onChange={props.change} type={props.type} name={props.name} required={props.required ?? false}  value={props.value ? props.value : ""}/>
            </Main>
        )
}