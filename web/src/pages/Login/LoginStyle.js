import styled from "styled-components";
import theme from "../../style/theme";

export const Main = styled.div`
    display: flex;
    height: 100vh;
    text-align: center;
    align-items: center;
    justify-content: center;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${theme.COLORS.WHITE};
    width: 590px;
    padding: 40px 60px;
    border-radius: 15px;
    gap: 30px;
`

export const Title = styled.h1`
    font-size: 2em;
    font-weight: bold;
    color: ${theme.COLORS.BACKGROUND};
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
`
export const Input = styled.input`
    padding: 15px;
    border: 2px solid ${theme.COLORS.GRAY};
    border-radius: 10px;
    font-size: 1.25em;
    width: 350px;    
`

export const ButtonArea = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`