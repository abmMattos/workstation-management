import { NavMenu } from "../../components/Nav/Nav";
import { Container, Form, Main, Title, Input, ButtonArea } from "./LoginStyle";
import { LoginButton, RegisterButton } from "../../components/Button/Button";

export function Login() {
    return (
        <>
            <NavMenu text="Meeting & Work" />
            <Main>
                <Container>
                    <Title>ENTRE NA SUA CONTA</Title>
                    <Form action="">
                        <Input id="login" type="text" placeholder="Usuário" />
                        <Input id="password" type="password" placeholder="Senha" />
                    </Form>
                    <ButtonArea>
                        <RegisterButton text="CADASTRAR" />
                        <LoginButton text="LOGIN" />
                    </ButtonArea>
                </Container>
            </Main>
        </>

    )
}