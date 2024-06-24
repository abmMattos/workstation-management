import { Container, Form, Main, Title, Input, ButtonArea } from "./LoginStyle";
import { LoginButton } from "../../components/Button/Button";
import { NavMenu } from "../../components/Nav/Nav";

export function Register() {
    return (
        <>
        <NavMenu text="Meeting & Work" />
        <Main>
            <Container>
                <Title>CRIE SUA CONTA</Title>
                <Form action="">
                    <Input id="nome" type="text" placeholder="Nome" />
                    <Input id="email" type="email" placeholder="Email" />
                    <Input id="password" type="password" placeholder="Senha" />
                </Form>
                <ButtonArea>
                    <LoginButton text="CADASTRAR" />
                </ButtonArea>
            </Container>
        </Main>
        </>
        
    )
}