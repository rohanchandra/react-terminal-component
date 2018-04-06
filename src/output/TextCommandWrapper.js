import styled from 'styled-components';
import defaultTheme from 'themes/default';

const TextCommandWrapper = styled.span`
  color: ${({ theme }) => theme.commandColor};
`;

TextCommandWrapper.defaultProps = {
  theme: defaultTheme
};

export default TextCommandWrapper;
