import { HomeButton } from "../../components/Button/Button"
import { Main, Title, Paragraph, Line } from "./homeStyle"
export function Home() {
    return(
        <>
            <Main>
                <Title>Meeting & Work</Title>
                <Paragraph>Gerencie suas estações de trabalho e salas de reunião de forma eficiente e flexível.</Paragraph>
                <Line />
                <HomeButton>
                    Fazer Login
                </HomeButton>
            </Main>
        </>
    )
}