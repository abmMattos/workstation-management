import { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../../components/Header/Header";
import { Side } from "../../components/Side/side";
import { Center, Spinner, Main, Section, SubTitle } from "./logStyle";
import { Cards } from "../../components/Cards/card";
import routes from "../../endpoints/routes";

export function Log() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stations, setStations] = useState([]);
  const [users, setUsers] = useState([]);
  const [reservedItems, setReservedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

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
    setFilteredItems(incrementReserve);
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
        <Header title="Todas as reservas" />
        <Section>
          {filteredItems.length > 0 ? (
            <Cards filteredItems={filteredItems} type='my-reserves' />
          ) : (
            <SubTitle>Não há reservas cadastradas.</SubTitle>
          )}
        </Section>
      </Section>
    </Main>
  );
}
