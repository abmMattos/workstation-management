import styled from "styled-components";
import theme from "../../style/theme";

export const Select = styled.select`
    background-color: #E5E3E3;
    width: 100%; 
    border: 0px solid ${theme.COLORS.GRAY};
    padding: 5px;
    &:focus{
       outline: none;
       border: 1px solid ${theme.COLORS.GRAY};
    }
`

export const Label = styled.label`
    font-weight: bold;
    color: ${theme.COLORS.BACKGROUND};
`