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
    width: 100%;
`

export const LineDiv = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5em;
    padding: 0px 60px;
    gap: 30px;
`

export const Title = styled.h1`
    color: ${theme.COLORS.BACKGROUND};
`
