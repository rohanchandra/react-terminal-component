import styled from 'styled-components';

const PromptSymbol = styled.span`
  margin-right: 0.25em;
  white-space: pre;
  color: ${({ theme }) => theme.promptSymbolColor};
`;

export default PromptSymbol;
