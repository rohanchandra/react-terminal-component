import styled from 'styled-components';
import defaultTheme from 'themes/default';

const TerminalContainer = styled.div`
  & > :last-child {
    padding-bottom: ${({ theme }) => theme.spacing};
  }
  height: 50vh;
  line-height: 1.2em;
  padding: ${({ theme }) => theme.spacing};
  overflow-y: scroll;
  color: ${({ theme }) => theme.outputColor};
  background: ${({ theme }) => theme.background};
  font-family: monospace;
  font-size: ${({ theme }) => theme.fontSize};
`;

TerminalContainer.defaultProps = {
  theme: defaultTheme
};

export default TerminalContainer;
