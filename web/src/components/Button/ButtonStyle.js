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