import { Button } from "../../components/Button/Button"
import { NavMenu } from "../../components/Nav/Nav"
import { Main, Title, Paragraph, Line } from "./homeStyle"

export function Home() {
    return(
        <>
            <NavMenu />
            <Main>
                <Title>Meeting & Work</Title>
                <Paragraph>Gerencie suas estações de trabalho e salas de reunião de forma eficiente e flexível.</Paragraph>
                <Line />
                <Button text="FAZER LOGIN" />
            </Main>
        </>
    )
}