import styled from "styled-components";
import theme from "../../style/theme";

export const NavItem = styled.div`
    padding: 25px 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0px;
`

export const DivItem = styled.div`
    font-size: 1.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 45px;
    li {
        list-style: none;
        display: inline;
        margin-left: 45px;
        font-size: 16px;
    }
`

export const RegisterButton = styled.button`
    width: fit-content;
    padding: 10px 25px;
    font-size: 16px;
    font-weight: bold;
    background-color: ${theme.COLORS.WHITE};
    color: ${theme.COLORS.BACKGROUND};
    border-radius: 5px;
    border: none;
`