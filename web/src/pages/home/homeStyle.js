import styled from "styled-components";
import theme from "../../style/theme";

export const Main = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100vh;
    text-align: center;
    align-items: center;
    justify-content: center;
    gap: 25px;
`

export const Title = styled.h1`
    font-size: 4em;
    color: ${theme.COLORS.WHITE}
`

export const Paragraph = styled.p`
    font-size: 1.5em;
    width: 652px;
    color: ${theme.COLORS.WHITE}
` 

export const Line = styled.div`
    height: 1px;
    width: 32px;
    background-color: ${theme.COLORS.GREEN};
`