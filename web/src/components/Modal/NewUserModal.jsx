import { BackgroundModal, Form } from "./NewRoomModalStyle"
import axios from "axios"
import { HeaderModal } from "./HeaderModal";
import { SubmitButton } from "../Button/Button";
import { CardModal } from "./CardModal";
import { useState } from "react";
import { Label, Select } from "./NewUserModalStyle";

export function NewUserModal({ isOpen, setOpen }) {

    const [userType, setUserType] = useState('ADMIN');

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
      };

    const [data, setData] = useState({
        name: "",
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

    const fecharModal = (e) => {
        e.preventDefault();
        setOpen(!isOpen);
    }

    const add = async (e) => {
        e.preventDefault();
        if (data.name.trim().length <= 3 || data.email.trim().length <= 3 || data.password.trim().length <= 3) {
            alert("Preencha todos os dados corretamente!");
            return;
        }
        try{
            if (userType === 'ADMIN') {
                const response = await axios.post(
                  `https://workstation-management.onrender.com/admin/create`,
                  data,
                );
                console.log(response.data);
                setOpen(!isOpen)
              }
        
              if (userType === 'USER') {
                const response = await axios.post(
                    `https://workstation-management.onrender.com/user/create`,
                    data,
                );
                console.log(response.data);
                setOpen(!isOpen)
              }
        } catch (error) {
          console.error(error);
          alert('Erro criar usuário!');
        }
    };

    if (isOpen) {
        return (
            <BackgroundModal onClick={fecharModal}>
                <Form onSubmit={add} onClick={e => e.stopPropagation()}>
                    <HeaderModal click={fecharModal} titulo="Cadastrar Usuário" />
                    <CardModal text="Nome:" type="text" name="name" change={handleChange} required={true} />
                    <CardModal text="Email:" type="email" name="email" change={handleChange} required={true} />
                    <CardModal text="Senha:" type="password" name="password" change={handleChange} required={true} />
                    <Label htmlFor="selectUser">Tipo de Usuário</Label>
                    <Select name="selectUser" value={userType} onChange={handleUserTypeChange}>
                            <option value="ADMIN">ADMIN</option>
                            <option value="USER">USUÁRIO</option>
                        </Select>
                    <SubmitButton text="CADASTRAR" />
                </Form>
            </BackgroundModal>
        )
    }
}