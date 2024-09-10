import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Header } from "../../components/Header/Header";
import { Side } from "../../components/Side/side";
import { Center, Spinner, Main, Section } from "./reservationStyle";
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
        const rooms = await axios.get("https://workstation-management.onrender.com/meetingRoom/");
        const workstations = await axios.get("https://workstation-management.onrender.com/workstation/");
        const reservations = await axios.get("https://workstation-management.onrender.com/reservation/");
        setItems([...rooms.data, ...workstations.data]);
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
        console.log('item', item, 'reserved', reserved);
        return reserved.id === item.id && reserved.dateReserve.slice(0, 10) === dateString; // mudar query de id após atualização do back
      });
      return !isReserved;
    });
    console.log(filtered);
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
            <Cards filteredItems={filteredItems} />
          ) : (
            <Center>No available items for the selected date</Center>
          )}
        </Section>
      </Section>
    </Main>
  );
}
