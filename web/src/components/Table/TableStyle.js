import styled from "styled-components";
import theme from "../../style/theme";

export const Container = styled.div`
  color: ${theme.COLORS.BACKGROUND};
  padding: 16px;
  margin-top: 60px;
  margin-bottom: 60px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const HeaderRow = styled.tr`
  background-color: ${theme.COLORS.WHITE};
`;

export const HeaderCell = styled.th`
  padding: 8px;
  border: 1px solid #dee2e6;
`;

export const BodyRow = styled.tr`
  background-color: ${({ index }) => (index % 2 === 0 ? "#F8F9FA" : `${theme.COLORS.WHITE}`)};
`;

export const BodyCell = styled.td`
  padding: 8px;
  border: 1px solid #dee2e6;
`;

export const Actions = styled.div`
  display: flex;
  gap: 20px;
  padding: 0px 20px;
`

