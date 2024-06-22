import { Container, Form, Main, Title, Input, ButtonArea } from "./LoginStyle";
import { LoginButton } from "../../components/Button/Button";

export function Register() {
    return (
        <Main>
            <Container>
                <Title>CRIE SUA CONTA</Title>
                <Form action="">
                    <Input id="login" type="text" placeholder="Usuário" />
                    <Input id="email" type="email" placeholder="Email" />
                    <Input id="password" type="password" placeholder="Senha" />
                </Form>
                <ButtonArea>
                    <LoginButton text="CADASTRAR" />
                </ButtonArea>
            </Container>
        </Main>
    )
}