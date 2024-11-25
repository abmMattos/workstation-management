import styled from "styled-components";
import theme from "../../style/theme";

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 40px;
  color: ${theme.COLORS.BLACK};
`;

export const Card = styled.div`
  background-color: rgb(199, 220, 255);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 1, 1, 0.3);
  width: 30%;
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

`

export const Title = styled.h3`
  font-size: 1.5em;
  margin-bottom: 15px;
`;

export const SubTitle = styled.h4`
  font-size: 1.1em;
  margin-bottom: 10px;
  color: ${theme.COLORS.RED};
`

export const ReserveDate = styled.h4`
  font-size: 1.5em;
  margin-bottom: 10px;
  color: ${theme.COLORS.RED};
`

export const Description = styled.p`
font-size: 1em;
margin-bottom: 20px;
`