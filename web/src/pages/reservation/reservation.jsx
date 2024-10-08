import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Header } from "../../components/Header/Header";
import { Side } from "../../components/Side/side";
import { Center, Spinner, Main, Section, SubTitle } from "./reservationStyle";
import { Cards } from "../../components/Cards/card";
import './date-picker.css';

export function Reservation() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [reservedItems, setReservedItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stations = await axios.get("https://workstation-management.onrender.com/station/");
        const reservations = await axios.get("https://workstation-management.onrender.com/reservation/");
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
      return !isReserved;
    });
    setFilteredItems(filtered);
  }, [selectedDate, items, reservedItems]);

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
        <Header title="Reservas" />
        <Section>
          <DatePicker
            id="data-picker"
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            locale={ptBR}
          />
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
