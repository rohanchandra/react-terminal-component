import styled from 'styled-components';

const StyledInput = styled.input`
  flex: 1;
  border: 0;
  box-sizing: border-box;
  outline: none;
  color: ${({ theme }) => theme.commandColor};
  background: ${({ theme }) => theme.background};
  font-size: 1em;
  font-family: monospace;
  padding: 0;
`;

export default StyledInput;
