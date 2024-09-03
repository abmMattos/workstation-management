import styled from "styled-components";
import theme from "../../style/theme";

export const Main = styled.div`
    background-color: ${theme.COLORS.BACKGROUND};
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 200px;
    align-items: center;
    position: relative;
    left: 0px;

    .link:hover {
        background-color: ${theme.COLORS.BACKGROUND2};
    }
    .active div{
        background-color: ${theme.COLORS.BACKGROUND2}
    }
`

export const Logo = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    margin-bottom: 80px;
    font-size: 1em;
    gap: 15px;

    img {
        width: 131px;
        height: 35px;
    }
`

export const UnitLink = styled.div`
    color: ${theme.COLORS.WHITE};
    display: flex;
    width: 155px;
    height: 40px;
    border-radius: 5px;
    gap: 15px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 10px;
    font-size: 0.75em;
    background-color: ${theme.COLORS.BACKGROUND};

    img {
        width: 16px;
        height: 16px;
    }
`