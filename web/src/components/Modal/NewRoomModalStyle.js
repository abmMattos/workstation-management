import styled from "styled-components";
import theme from "../../style/theme";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 2px solid ${theme.COLORS.GRAY};
    border-radius: 16px;
    height: 335px;
    width: 564px;
    padding: 20px;
    align-self: center;
    gap: 25px;
`