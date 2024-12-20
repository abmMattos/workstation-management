import { BackgroundModal, Form } from "./NewStationModalStyle";
import axios from "../../axios/axiosConfig.js";
import { HeaderModal } from "./HeaderModal";
import { SubmitButton } from "../Button/Button";
import { CardModal } from "./CardModal";
import { useState, useEffect, useRef } from "react";
import routes from "../../endpoints/routes";
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../toastify/ReactToastify.css';

export function NewStationModal({ isOpen, setOpen, id, setId, name }) {
    const [data, setData] = useState({
        name: "",
        capacity: 0,
        hardwares: [],
        status: "active",
        type: ""
    });

    const formRef = useRef(null);

    const [hardware, setHardware] = useState([]);
    const [selectedHardwares, setSelectedHardwares] = useState([]);
    const [selectedType, setType] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };

    const fetchData = async () => {
        try {
            const hardwareResponse = await axios.get(routes.HARDWARE.GET_ALL_HARDWARES);
            hardwareResponse.data.sort((a, b) => a.name.localeCompare(b.name));
            setHardware(hardwareResponse.data);
        } catch (error) {
            toast.error("Erro ao buscar equipamentos:", error);
        }
    };

    const fetchHardware = async () => {
        if (!id) return;
        try {
            const stationResponse = await axios.get(routes.STATION.GET_FIND_UNIQUE, {
                params: { id }
            });
            const stationData = stationResponse.data;
            setData(stationData);
            setSelectedHardwares(stationData.hardwares.map(h => ({ label: h.name, value: h.id })));
            setType({ label: stationData.type === "workstation" ? "Estação de trabalho" : "Sala de reunião", value: stationData.type });
        } catch (error) {
            toast.error("Erro ao buscar Estação: " + error, {autoClose: 1500, position: "top-center"});
        }
    };

    const add = async () => {
        const isFilled = formRef.current.reportValidity();
        if(!isFilled){
            return;
        }
        const capacidade = Number(data.capacity)
        if (data.name.trim().length <= 3 || (isNaN(capacidade) || !Number.isFinite(capacidade) || capacidade < 0 || capacidade == 0)) {
            toast.error("Preencha todos os dados corretamente!", {autoClose: 1500, position: "top-center"});
            return;
        }

        const station = {
            name: data.name,
            capacity: parseInt(data.capacity),
            hardwares: selectedHardwares.map(h => ({ id: h.value })),
            type: selectedType.value,
            status: data.status,
            id: id
        };

        try {
            await axios.post(id ? routes.STATION.UPDATE_STATION : routes.STATION.CREATE_STATION, station);
            setOpen(false);
            setId(null);
            window.location.reload();
        } catch (err) {
            toast.error("Erro ao salvar estação: " + err, {autoClose: 1500, position: "top-center"});
        }
    };

    const addNewHardware = async (valor) => {
        if (valor.trim().length <= 3) {
            toast.error("O nome do equipamento deve ter pelo menos 3 caracteres!", {autoClose: 1500, position: "top-center"});
            return;
        }

        try {
            const hardware = await axios.post(routes.HARDWARE.CREATE_HARDWARE, { name: valor });
            toast.success("Novo equipamento criado", {autoClose: 1500, position: "top-center"})
            fetchData();
            setSelectedHardwares(oldSelectedHardwares => [...oldSelectedHardwares,{ label: hardware.data["name"] , value: hardware.data["id"], }])
        } catch (err) {
            toast.error("Erro ao criar novo equipamento: " + err, {autoClose: 1500, position: "top-center"});
        }
    };

    const fecharModal = (e) => {
        e.preventDefault();
        toast.info(
            <div>
                <span id="text">Tem certeza que deseja fechar?</span>
                <div id="buttons">
                    <button id="green-button-confirmation" onClick={() => {
                        setOpen(false);
                        setId(null);
                        setData({
                            name: "",
                            capacity: 0,
                            hardwares: [],
                            status: "active",
                            type: ""
                        });
                        setSelectedHardwares([]);
                        setType([]);
                        toast.dismiss();
                    }}>Sim</button>
                    <button id="grey-button-confirmation" onClick={() => toast.dismiss()}>Não</button>
                </div>
            </div>, {
                position: "top-center",
                autoClose: false,
                closeButton: false,
                draggable: false,
                pauseOnHover: false,
                className: 'toast-confirmation',
            });
        toast.clearWaitingQueue();
    };

    useEffect(() => {
        fetchData();
        if (id) {
            fetchHardware();
        }
    }, [id]);

    if (isOpen) {
        return (
            <>
                <BackgroundModal onClick={fecharModal}>
                    <Form onSubmit={(e) => e.preventDefault()} onClick={e => e.stopPropagation()} ref={formRef}>
                        <HeaderModal click={fecharModal} titulo={id ? "Atualizar Estação" : "Criar Estação"} />
                        <label htmlFor="type">Tipo:</label>
                        <Select
                            options={[
                                { label: "Estação de trabalho", value: "workstation" },
                                { label: "Sala de reunião", value: "room" }
                            ]}
                            value={selectedType}
                            placeholder="Selecione o tipo"
                            isSearchable={false}
                            onChange={setType}
                            required
                        />
                        <CardModal text="Nome:" type="text" name="name" change={handleChange} value={data.name} required />
                        <CardModal text="Capacidade:" type="number" name="capacity" change={handleChange} value={data.capacity} required />
                        <label>Equipamentos:</label>
                        <Creatable
                            styles={{control: (baseStyles) => ({...baseStyles,width:"500px"}),}}
                            options={hardware.map(h => ({ label: h.name, value: h.id }))}
                            isMulti
                            formatCreateLabel={(valor) => `Crie o equipamento: ${valor}`}
                            value={selectedHardwares}
                            placeholder="Selecione os equipamentos"
                            onCreateOption={addNewHardware}
                            onChange={setSelectedHardwares}
                            required
                        />
                        <SubmitButton id={id} text={id ? "ATUALIZAR" : "CRIAR"} onSubmit={add} name={name} />
                    </Form>
                </BackgroundModal>
                <ToastContainer limit={1} />
            </>
        );
    }

    return null;
}
