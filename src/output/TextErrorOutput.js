import React from 'react';
import PropTypes from 'prop-types';
import OutputContainer from 'output/OutputContainer';
import TextErrorWrapper from 'output/TextErrorWrapper';

const TextErrorOutput = ({ content }) => (
  <TextErrorWrapper>
    <OutputContainer>{content}</OutputContainer>
  </TextErrorWrapper>
);

TextErrorOutput.propTypes = {
  content: PropTypes.string.isRequired
};

export default TextErrorOutput;
