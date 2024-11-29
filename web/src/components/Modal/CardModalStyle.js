import styled from "styled-components";
import theme from "../../style/theme";

export const Main = styled.div`
    background-color: #E5E3E3;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 8px;
    color: black;
    border-radius: 4px;
    gap: 5px;
    width: 100%; 
    box-sizing: border-box;
`

export const Input = styled.input` 
    background-color: #E5E3E3;
    width: 100%; 
    border: 0px solid ${theme.COLORS.GRAY};
    padding: 5px;
    border: 1px solid ${theme.COLORS.BLACK};
`
