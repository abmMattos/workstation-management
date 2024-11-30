import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"; import { ptBR } from "date-fns/locale";
import { Header } from "../../components/Header/Header";
import { Side } from "../../components/Side/side";
import { Center, Spinner, Main, Section, SubTitle } from "./logStyle";
import { Cards } from "../../components/Cards/card";
import routes from "../../endpoints/routes";
import { Label } from "../reservation/reservationStyle";

export function Log() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stations, setStations] = useState([]);
  const [users, setUsers] = useState([]);
  const [reservedItems, setReservedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); 

  const idUser = localStorage.getItem('idUser');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stations = await axios.get(routes.STATION.GET_ALL_STATIONS);
        const reservations = await axios.get(routes.RESERVATION.GET_RESERVATIONS);
        const user = await axios.get(routes.USER.GET_ALL_USERS);
        setStations([...stations.data]);
        setUsers([...user.data]);
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

    const incrementReserve = reservedItems.map(reserve  => {
      const station = stations.find(station => station.id === reserve.station_id);
      const user = users.find(user => user.id === reserve.user_id);

      return {
        dateReserve: reserve.dateReserve,
        capacity: station.capacity,
        hardwares: station.hardwares,
        id: reserve.id,
        id_station: station.id,
        name: station.name,
        status: 'Reserved',
        type: station.type,
        reservation_id: reserve.id,
        user_id: reserve.user_id,
        user_name: user.name,
      }
    });

    const filtered = incrementReserve.filter(item => {
      return item.dateReserve.slice(0, 10) === dateString; 
    });

    setFilteredItems(filtered);
  }, [stations, reservedItems, selectedDate]);

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
        <Header title="Todas as reservas" />
        <Section>
          <div>
            <Label>Selecione a data:</Label>
            <DatePicker
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              locale={ptBR}
              todayButton="Hoje"
            />
          </div>
          {filteredItems.length > 0 ? (
            <Cards filteredItems={filteredItems} type='my-reserves' />
          ) : (
            <SubTitle>Não há reservas cadastradas para esta data.</SubTitle>
          )}
        </Section>
      </Section>
    </Main>
  );
}
