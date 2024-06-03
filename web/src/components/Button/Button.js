import styled from "styled-components";
import theme from "../../style/theme";

export const HomeButton = styled.button`
    width: fit-content;
    padding: 17px 40px;
    font-size: 1.25em;
    font-weight: bold;
    background-color: ${theme.COLORS.GREEN};
    color: ${theme.COLORS.BACKGROUND};
    border-radius: 5px;
    border: none;
`