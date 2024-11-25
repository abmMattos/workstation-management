import { CancelReservationButton, ReservationButton } from '../Button/Button';
import { Card, CardContainer, Title, Description, SubTitle, Row, ReserveDate } from './cardStyle'
import { format } from "date-fns";
import route from '../../endpoints/routes';

export function Cards(props) {
    const { filteredItems, date } = props
    const userType = localStorage.getItem("userType");

    const isDatePast = (reserveDate) => {
      const currentDate = new Date();
      currentDate.setHours(0,0,0,0);
      const reserveDateObj = new Date(reserveDate); 
      return reserveDateObj < currentDate; 
  };

    return (
        <CardContainer>
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <Card key={item.id}>
                  {(props.type === "my-reserves") ?
                    <Row>
                        <Title>{item.name}</Title>
                        <ReserveDate>{format(item.dateReserve, "dd/MM/yyyy")}</ReserveDate>
                    </Row>
                    : <Title>{item.name}</Title>
                  }
                  <SubTitle>{(item.type === 'workstation') ? 'Estação de trabalho' : 'Salas'}</SubTitle>
                  <Description>{(item.status === 'active') ? 'Disponível' : 'Reservada'}</Description>
                  {(userType == "ADMIN") && (<Description>{(item.user_name) ? 'Usuário: ' + item.user_name : "Usuário não encontrado"}</Description>)}
                  <Description>{(item.capacity) ? 'Capacidade: ' + item.capacity : null}</Description>
                  {!isDatePast(item.dateReserve) && (props.type === 'my-reserves') ?
                    <CancelReservationButton id={item.reservation_id} url={route.RESERVATION.DELETE_RESERVATION} text="Cancelar" />
                  : null}

                  {!isDatePast(item.dateReserve) && (props.type !== 'my-reserves') ?
                    <ReservationButton maxGuests={item.capacity} type={item.type} id={item.id_station} date={date} text="Reservar" />
                  : null}
                </Card>
              ))
            ) : (
              <p>Sem reservas disponíveis!</p>
            )}
          </CardContainer>
    );
}