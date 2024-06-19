import { Checkbox, Input, Main } from "./CardModalStyle";

export function CardModal(props) {
    if (props.type == "checkbox") {
        return (
            <Main>
                <label htmlFor={props.name}>{props.text}</label>
                <Checkbox onChange={props.change} type={props.type} name={props.name} value={true} />
            </Main>
        )
    } else {
        return (
            <Main>
                <label htmlFor={props.name}>{props.text}</label>
                <Input onChange={props.change} type={props.type} name={props.name} />
            </Main>
        )
    }
}