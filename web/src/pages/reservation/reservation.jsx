import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Header } from "../../components/Header/Header";
import { Side } from "../../components/Side/side";
import { Center, Spinner, Main, Section, SubTitle, Row, Label } from "./reservationStyle";
import { Cards } from "../../components/Cards/card";
import './date-picker.css';
import routes from "../../endpoints/routes";
import { StationPicker } from "../../components/Button/Button";
import Creatable from "react-select/creatable";

export function Reservation() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [reservedItems, setReservedItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredItems, setFilteredItems] = useState([]);
  const [filterTypes, setFilterTypes] = useState([]);
  const [hardware, setHardware] = useState([]);
  const [selectedHardwares, setSelectedHardwares] = useState([]);

  const [data, setData] = useState({
    name: "",
    capacity: 0,
    hardwares: [],
    status: "active",
    type: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stations = await axios.get(routes.STATION.GET_ALL_STATIONS);
        const reservations = await axios.get(routes.RESERVATION.GET_ALL_RESERVATIONS);
        setItems([...stations.data]);
        setReservedItems([...reservations.data]);
        setLoading(false);
        const hardware = await axios.get(routes.HARDWARE.GET_ALL_HARDWARES);
        setHardware(hardware.data);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleHardwares = (select) => {
    setSelectedHardwares(select);
  };

  useEffect(() => {
    const dateString = format(selectedDate, "yyyy-MM-dd");
    const filtered = items.filter(item => {
      const isReserved = reservedItems.some(reserved => {
        return reserved.station_id === item.id && reserved.dateReserve.slice(0, 10) === dateString;
      });

      const matchesFilter = filterTypes.length === 0 || filterTypes.includes(item.type);

      const matchesHardware = selectedHardwares.length === 0 || selectedHardwares.every(selected => 
        item.hardwares.some(itemHardware => itemHardware.id === selected.value)
      );

      return !isReserved && matchesFilter && matchesHardware;
    });

    setFilteredItems(filtered);
  }, [selectedDate, items, reservedItems, filterTypes, selectedHardwares]);

  const handleFilterChange = (type) => {
    setFilterTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  if (loading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (error) {
    return <Center>Error fetching data</Center>;
  }

  return (
    <Main>
      <Side />
      <Section>
        <Header title="Fazer Reserva" />
        <Section>
          <Row>
            <DatePicker
              id="data-picker"
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              locale={ptBR}
            />
            <Label>Selecione:</Label>
            <StationPicker text='Salas' onSelect={() => handleFilterChange('room')} />
            <StationPicker text='Estações' onSelect={() => handleFilterChange('workstation')} />
            <Creatable
              options={hardware.map(hardware => ({ label: hardware["name"], value: hardware['id'] }))}
              isMulti
              value={selectedHardwares}
              formatCreateLabel={(valor) => "Crie o equipamento: " + valor}
              placeholder="Selecione os equipamentos"
              onChange={handleHardwares}
            />
          </Row>
          {filteredItems.length > 0 ? (
            <Cards filteredItems={filteredItems} date={selectedDate} />
          ) : (
            <SubTitle>Não há opções de reservas disponíveis para esta data.</SubTitle>
          )}
        </Section>
      </Section>
    </Main>
  );
}
