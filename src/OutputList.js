import React from 'react';
import PropTypes from 'prop-types';

let uniqueKey = 0; // unique number for an output given an instance of emulator

const OutputList = ({ outputRenderers, outputs, ...outputRendererProps }) => (
  <div className={'terminalOutput'}>
    {outputs.map(output => {
      const type = output.get('type');
      const content = output.get('content');

      if (!outputRenderers.hasOwnProperty(type)) {
        throw new Error(`No output renderer set for ${type} in outputRenderers`);
      }

      const OutputComponent = outputRenderers[type];

      return (
        <OutputComponent
          key={uniqueKey++}
          {...outputRendererProps}
          content={content}/>
      );
    })}
  </div>
);

OutputList.propTypes = {
  outputRenderers: PropTypes.object.isRequired,
  outputs: PropTypes.object.isRequired
};

export default OutputList;
