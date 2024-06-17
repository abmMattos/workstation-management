import styled from "styled-components";
import theme from "../../style/theme";

export const Main = styled.div`
    background-color: ${theme.COLORS.WHITE};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 25px;
`

export const BackButton = styled.button`
    color: black;
    background-color: ${theme.COLORS.WHITE};
    border: 2px solid ${theme.COLORS.GRAY};
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    width: 40px;
    height: 40px;
`

export const Titulo = styled.p`
    color: black;
    font-weight: bold;
`