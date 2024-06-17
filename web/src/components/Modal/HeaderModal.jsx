import { BackButton, Main, Titulo } from "./HeaderModalStyle";
import leftArrow from '../../img/arrow-left.png';

export function HeaderModal(props) {

    return (
        <Main>
            <BackButton onClick={props.click}> <img src={leftArrow} alt="seta para a esquerda" /></BackButton>
            <Titulo>{props.titulo}</Titulo>
        </Main>
    )
}