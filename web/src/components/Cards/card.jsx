import { ReservationButton } from '../Button/Button';
import { Card, CardContainer, Title, Description, SubTitle } from './cardStyle'

export function Cards(props) {
    const { filteredItems, date } = props
    return (
        <CardContainer>
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <Card key={item.id}>
                  <Title>{item.name}</Title>
                  <SubTitle>{(item.type === 'workstation') ? 'Estação de trabalho' : 'Salas'}</SubTitle>
                  <Description>{(item.status === 'active') ? 'Disponível' : 'Indisponível'}</Description>
                  <Description>{(item.capacity) ? 'Capacidade: ' + item.capacity : null}</Description>
                  <ReservationButton id={item.id} date={date} text="Reservar" />
                </Card>
              ))
            ) : (
              <p>No available houses for the selected date.</p>
            )}
          </CardContainer>
    );
}