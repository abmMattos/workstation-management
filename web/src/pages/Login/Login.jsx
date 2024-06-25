import { NavMenu } from "../../components/Nav/Nav";
import { Container, Form, Main, Title, Input, ButtonArea, Select, Label } from "./LoginStyle";
import { LoginButton } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


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
                    `https://workstation-management.onrender.com/admin/login`,
                    {
                        params: {
                            email: data.email,
                            password: data.password
                        }
                    }
                );
                console.log(response.data);
                localStorage.setItem('userType', userType);
                navigate('/usuarios');
            }

            if (userType === 'USER') {
                const response = await axios.get(
                    `https://workstation-management.onrender.com/user/login`, {
                    params: {
                        email: data.email,
                        password: data.password
                    }
                }
                );
                console.log(response.data);
                localStorage.setItem('userType', userType);
                navigate('/salas');
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