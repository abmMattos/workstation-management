import styled from "styled-components";
import theme from "../../style/theme";

export const Form = styled.form`
    display: flex;
    color: ${theme.COLORS.BLACK};
    flex-direction: column;
    align-items: flex-start;
    background-color: ${theme.COLORS.WHITE};
    border: 2px solid ${theme.COLORS.GRAY};
    border-radius: 16px;
    height: fit-content;
    width: 564px;
    padding: 20px;
    margin-top: 2vh;
    z-index: 99;
    position: absolute;
    gap: 25px;
`

export const BackgroundModal = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .75);
`

export const Select = styled.select`
    padding: 5px;
    border: 2px solid ${theme.COLORS.GRAY};
    border-radius: 10px;
    width: 200px;    
`