import { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../../components/Header/Header";
import { Side } from "../../components/Side/side";
import { Center, Spinner, Main, Section, SubTitle } from "./myReservesStyle";
import { Cards } from "../../components/Cards/card";
import { format } from "date-fns";
import routes from "../../endpoints/routes";

export function MyReserves() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stations, setStations] = useState([]);
  const [reservedItems, setReservedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const idUser = localStorage.getItem('idUser');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stations = await axios.get(routes.STATION.GET_ALL_STATIONS);
        const reservations = await axios.get(routes.RESERVATION.GET_BY_USER_ID);
        setStations([...stations.data]);
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
    const incrementReserve = reservedItems.map(reserve => {
        const station = stations.find(station => station.id === reserve.station_id);
        return {
            dateReserve: format(reserve.dateReserve, "dd/MM/yyyy"),
            capacity: station.capacity,
            hardwares: station.hardwares,
            id: station.id,
            name: station.name,
            status: 'Reserved',
            type: station.type,
            reservation_id: reserve.id,
            user_id: reserve.user_id,
        }
    });    
    const filteredByUser = incrementReserve.filter(item => item.user_id === idUser)
    setFilteredItems(filteredByUser);
  }, [stations, reservedItems]);

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
        <Header title="Minhas Reservas" />
        <Section>
          {filteredItems.length > 0 ? (
            <Cards filteredItems={filteredItems} type='my-reserves' />
          ) : (
            <SubTitle>Não há opções de reservas disponíveis para esta data.</SubTitle>
          )}
        </Section>
      </Section>
    </Main>
  );
}
