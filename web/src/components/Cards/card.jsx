import { ReservationButton } from '../Button/Button';
import { Main } from '../Modal/HeaderModalStyle';
import { Card, CardContainer, Title, Description } from './cardStyle'
import { Header } from "../../components/Header/Header";

export function Cards(props) {
    const { filteredItems } = props
    return (
        <CardContainer>
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <Card key={item.id}>
                  <Title>{item.name}</Title>
                  <Description>{item.description}</Description>
                  <ReservationButton type={props.type} text="Reservar" />
                </Card>
              ))
            ) : (
              <p>No available houses for the selected date.</p>
            )}
          </CardContainer>
    );
}