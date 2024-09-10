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

export const Title = styled.h3`
  font-size: 1.2em;
  margin-bottom: 15px;
`;

export const Description = styled.p`
font-size: 1em;
margin-bottom: 20px;
`