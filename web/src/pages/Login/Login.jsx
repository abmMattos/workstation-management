import { NavMenu } from "../../components/Nav/Nav";
import { Container, Form, Main, Title, Input, ButtonArea, Select, Label } from "./LoginStyle";
import { LoginButton } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import routes from "../../endpoints/routes";


export function Login() {

    const navigate = useNavigate();

    const [userType, setUserType] = useState('ADMIN');

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

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

    const add = async (e) => {
        e.preventDefault();
        if (data.email.trim().length <= 3 || data.password.trim().length <= 3) {
            alert("Preencha todos os dados corretamente!");
            return;
        }
        try {
            if (userType === 'ADMIN') {
                const response = await axios.get(
                    routes.ADMIN.LOGIN,
                    {
                        params: {
                            email: data.email,
                            password: data.password
                        }
                    }
                );
                localStorage.setItem('userType', userType);
                localStorage.setItem('idUser', response.data.id);
                localStorage.setItem('nameUser', response.data.name);
                navigate('/usuarios');
            }

            if (userType === 'USER') {
                const response = await axios.get(
                    routes.USER.LOGIN, {
                    params: {
                        email: data.email,
                        password: data.password
                    }
                }
                );
                localStorage.setItem('userType', userType);
                localStorage.setItem('idUser', response.data.id);
                localStorage.setItem('nameUser', response.data.name);
                navigate('/reservar');
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao fazer login. Verifique suas credenciais.');
        }
    };

    return (
        <>
            <NavMenu text="Meeting & Work" />
            <Main>
                <Container>
                    <Title>ENTRE NA SUA CONTA</Title>
                    <Form onSubmit={add}>
                        <Input name="email" type="email" placeholder="Email" required onChange={handleChange} />
                        <Input name="password" type="password" placeholder="Senha" required onChange={handleChange} />
                        <Label htmlFor="selectUser">Tipo de Usuário</Label>
                        <Select name="selectUser" value={userType} onChange={handleUserTypeChange}>
                            <option value="ADMIN">ADMIN</option>
                            <option value="USER">USUÁRIO</option>
                        </Select>
                        <ButtonArea>
                            <LoginButton text="LOGIN" />
                        </ButtonArea>
                    </Form>
                </Container>
            </Main>
        </>

    )
}