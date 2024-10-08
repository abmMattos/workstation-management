import styled from 'styled-components';
import theme from '../../style/theme';

export const FAQContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: ${theme.COLORS.BACKGROUND2};
`;

export const Question = styled.div`
  cursor: pointer;
  padding: 15px;
  background-color: ${theme.COLORS.GRAY};
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${theme.COLORS.WHITE};
    color: ${theme.COLORS.BLACK};
  }
`;

export const Answer = styled.div`
  padding: 10px;
  border-left: 3px solid ${theme.COLORS.RED};
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;