import { NavMenu } from "../../components/Nav/Nav";
import { Container, Form, Main, Title, Input, ButtonArea, Select, Label } from "./LoginStyle";
import { LoginButton } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import routes from "../../endpoints/routes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Login() {

    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };

    const login = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(
                routes.USER.LOGIN,
                {
                    params: {
                        email: data.email,
                        password: data.password
                    }
                }
            );
            localStorage.setItem('userType', 'USER');
            localStorage.setItem('idUser', response.data.id);
            localStorage.setItem('nameUser', response.data.name);
            navigate('/reservar');
        } catch (error) {
            try {
                const response = await axios.get(
                    routes.ADMIN.LOGIN,
                    {
                        params: {
                            email: data.email,
                            password: data.password
                        }
                    }
                );
                localStorage.setItem('userType', 'ADMIN');
                localStorage.setItem('idUser', response.data.id);
                localStorage.setItem('nameUser', response.data.name);
                navigate('/usuarios');
            } catch (error) {
                console.error(error);
                toast.error('Erro ao fazer login. Verifique suas credenciais.');
            }
        }
    };

    return (
        <>
            <NavMenu text="Meeting & Work" />
            <Main>
                <Container>
                    <Title>ENTRE NA SUA CONTA</Title>
                    <Form onSubmit={login}>
                        <Input name="email" type="email" placeholder="Email" required onChange={handleChange} />
                        <Input name="password" type="password" placeholder="Senha" required onChange={handleChange} />
                        <ButtonArea>
                            <LoginButton text="LOGIN" />
                        </ButtonArea>
                    </Form>
                </Container>
            </Main>
            <ToastContainer />
        </>
    );
}
