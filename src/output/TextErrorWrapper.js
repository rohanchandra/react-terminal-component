import styled from 'styled-components';
import defaultTheme from 'themes/default';

const TextErrorWrapper = styled.div`
  color: ${({ theme }) => theme.errorOutputColor};
`;

TextErrorWrapper.defaultProps = {
  theme: defaultTheme
};

export default TextErrorWrapper;
