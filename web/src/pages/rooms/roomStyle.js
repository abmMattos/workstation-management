import styled from "styled-components";
import theme from "../../style/theme";

export const Main = styled.div`
    background-color: ${theme.COLORS.WHITE};
    display: flex;
`

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    padding: 60px 20px;
`

export const LineDiv = styled.header`
    display: flex;
    justify-content: space-between;
    font-size: 1.5em;
    padding: 0px 60px;
`

export const Title = styled.h1`
    color: ${theme.COLORS.BACKGROUND};
`