import styled, { keyframes } from "styled-components";
import theme from "../../style/theme";

export const Main = styled.div`
    background-color: ${theme.COLORS.WHITE};
    display: flex;
`

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    padding: 60px 20px 0px 20px;
    width: 100%;
`
export const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`
export const Spinner = styled.span`
  width: 60px;
  height: 60px;
  border: 5px solid;
  border-color: ${theme.COLORS.GREEN} transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const Card = styled.div`
  background-color: ${theme.COLORS.LIGHT_GRAY};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
`;