import styled from "styled-components";
import theme from "../../style/theme";

export const HomeButtonComponent = styled.button`
    width: fit-content;
    padding: 17px 40px;
    font-size: 1.25em;
    font-weight: bold;
    background-color: ${theme.COLORS.GREEN};
    color: ${theme.COLORS.BACKGROUND};
    border-radius: 5px;
    border: none;
`

export const LoginButtonComponent = styled.button`
width: 205px;
padding: 15px 0px;
font-size: 1.5em;
font-weight: bold;
background-color: ${theme.COLORS.GREEN};
color: ${theme.COLORS.BACKGROUND};
border-radius: 5px;
border: none;
`

export const RegisterButtonComponent = styled.button`
width: 205px;
padding: 15px 0px;
font-size: 1.5em;
font-weight: bold;
background-color: ${theme.COLORS.WHITE};
color: ${theme.COLORS.BACKGROUND};
border-radius: 5px;
border: 2px solid ${theme.COLORS.GRAY};
`

export const SmallButtonComponent = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.COLORS.WHITE};

    width: 40px;
    height: 40px;

    border: 1px solid ${theme.COLORS.GRAY};
    border-radius: 4px;
`

export const UserButtonComponent = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    background-color: ${theme.COLORS.WHITE};
    width: fit-content;
    height: 40px;
    color: ${theme.COLORS.BACKGROUND};

    border: 1px solid ${theme.COLORS.GRAY};
    border-radius: 4px;
    gap: 40px;
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        gap: 10px;

    }
`

export const AddButtonComponent = styled.button`
display: flex;
justify-content: flex-start;
align-items: center;
width: fit-content;
padding: 15px 15px;
font-size: 1.5em;
font-weight: bold;
background-color: ${theme.COLORS.WHITE};
color: ${theme.COLORS.BACKGROUND};
border-radius: 5px;
border: 2px solid ${theme.COLORS.GRAY};
gap: 15px;
`

export const SubmitButtonComponent = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 109px;
height: 32px;
padding: 15px;
font-weight: bold;
background-color: ${theme.COLORS.GREEN};
color: black;
border-radius: 8px;
align-self: center;
`