import { HomeButton } from "../../components/Button/Button"
import { NavMenu } from "../../components/Nav/Nav"
import { Main, Title, Paragraph, Line } from "./homeStyle"
import { Link } from "react-router-dom"

export function Home() {
    return(
        <>
            <NavMenu />
            <Main>
                <Title>Meeting & Work</Title>
                <Paragraph>Gerencie suas estações de trabalho e salas de reunião de forma eficiente e flexível.</Paragraph>
                <Line />
                <Link to="/login" ><HomeButton text="FAZER LOGIN" /></Link>
            </Main>
        </>
    )
}