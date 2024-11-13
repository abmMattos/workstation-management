import { CancelReservationButton, ReservationButton } from '../Button/Button';
import { Card, CardContainer, Title, Description, SubTitle, Row, Date } from './cardStyle'
import route from '../../endpoints/routes';

export function Cards(props) {
    const { filteredItems, date } = props
    return (
        <CardContainer>
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <Card key={item.id}>
                  {(props.type === "my-reserves") ?
                    <Row>
                        <Title>{item.name}</Title>
                        <Date>{item.dateReserve}</Date>
                    </Row>
                    : <Title>{item.name}</Title>
                  }
                  <SubTitle>{(item.type === 'workstation') ? 'Estação de trabalho' : 'Salas'}</SubTitle>
                  <Description>{(item.status === 'active') ? 'Disponível' : 'Reservada'}</Description>
                  <Description>{(item.capacity) ? 'Capacidade: ' + item.capacity : null}</Description>
                  {(props.type === 'my-reserves') ? 
                  <CancelReservationButton id={item.reservation_id} url={route.RESERVATION.DELETE_RESERVATION} text="Cancelar" />
                  :
                  <ReservationButton maxGuests={item.capacity} type={item.type} id={item.id} date={date} text="Reservar" />
                  }
                </Card>
              ))
            ) : (
              <p>No available houses for the selected date.</p>
            )}
          </CardContainer>
    );
}