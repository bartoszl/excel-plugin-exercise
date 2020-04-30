import styled from 'styled-components';
import { darken } from 'polished';

export default styled.button`
  color: white;
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 3px;
  padding: 0.5rem 1.5rem;
  cursor: pointer;

  transition: background-color 1.5s, box-shadow 1.5s;

  &:hover {
    background-color: ${({ theme }) => darken(0.1, theme.colors.primary)};
    box-shadow: 0 0 5px 0px #CCC;
  }

  &:active {
    outline: none;
  }
`;
