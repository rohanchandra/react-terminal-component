import React from 'react';
import PropTypes from 'prop-types';
import OutputContainer from 'output/OutputContainer';

const TextOutput = ({ content }) => (
  <OutputContainer>{content}</OutputContainer>
);

TextOutput.propTypes = {
  content: PropTypes.string.isRequired
};

export default TextOutput;
