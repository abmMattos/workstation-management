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

export function Reservation() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [reservedItems, setReservedItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredItems, setFilteredItems] = useState([]);
  const [filterTypes, setFilterTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stations = await axios.get(routes.STATION.GET_ALL_STATIONS);
        const reservations = await axios.get(routes.RESERVATION.GET_ALL_RESERVATIONS);
        setItems([...stations.data]);
        setReservedItems([...reservations.data]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const dateString = format(selectedDate, "yyyy-MM-dd");
    const filtered = items.filter(item => {
      const isReserved = reservedItems.some(reserved => {
        return reserved.station_id === item.id && reserved.dateReserve.slice(0, 10) === dateString;
      });
      const matchesFilter = filterTypes.length === 0 || filterTypes.includes(item.type);
      return !isReserved && matchesFilter;
    });
    setFilteredItems(filtered);
  }, [selectedDate, items, reservedItems, filterTypes]);

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