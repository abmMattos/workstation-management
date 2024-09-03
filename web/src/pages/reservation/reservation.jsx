import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Header } from "../../components/Header/Header";
import { Side } from "../../components/Side/side";
import { Center, Spinner, Main, Section, Card, CardContainer } from "./reservationStyle";
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
        const reservedRooms = await axios.get("https://workstation-management.onrender.com/reservation/findReservedMeetingRoom");
        const reservedWorkStation = await axios.get("https://workstation-management.onrender.com/reservation/findReservedWorkstation");
        
        setItems([...rooms.data, ...workstations.data]);
        setReservedItems([...reservedRooms.data, ...reservedWorkStation.data]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const dateString = format(selectedDate, "yyyy-MM-dd"); // Formata a data para YYYY-MM-DD
    const filtered = items.filter(item => {
      const isReserved = reservedItems.some(reserved => {
        return reserved.itemId === item.id && reserved.dateReserve.slice(0, 10) === dateString;
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
          <CardContainer>
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <Card key={item.id}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </Card>
              ))
            ) : (
              <p>No available houses for the selected date.</p>
            )}
          </CardContainer>
        </Section>
      </Section>
    </Main>
  );
}
