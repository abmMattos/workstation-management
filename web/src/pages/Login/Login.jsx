import { NavMenu } from "../../components/Nav/Nav";
import { Container, Form, Main, Title, Input, ButtonArea, Select, Label } from "./LoginStyle";
import { LoginButton } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../../axios/axiosConfig.js";
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
            const response = await axios.get(routes.USER.LOGIN, {
                params: {
                    email: data.email,
                    password: data.password,
                },
            });
    
            configureLogin('USER', response.data.user, response.data.token);
            navigate('/reservar');
        } catch (errorUser) {
            try {
                const response = await axios.get(routes.ADMIN.LOGIN, {
                    params: {
                        email: data.email,
                        password: data.password,
                    },
                });
    
                configureLogin('ADMIN', response.data.admin, response.data.token);
                navigate('/usuarios');
            } catch (errorAdmin) {
                console.error(errorAdmin);
                toast.error('Erro ao fazer login. Verifique suas credenciais.');
            }
        }
    };
    
    const configureLogin = (userType, user, token) => {
        localStorage.setItem('userType', userType);
        localStorage.setItem('token', token);
        localStorage.setItem('idUser', user.id);
        localStorage.setItem('nameUser', user.name);
        localStorage.setItem('userEmail', user.email)
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
