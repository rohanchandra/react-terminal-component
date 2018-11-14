import React from 'react';
import PropTypes from 'prop-types';

const OutputList = ({ outputRenderers, outputs, terminalId, ...outputRendererProps }) => (
  <div className={'terminalOutput'}>
    {outputs.map((output, index) => {
      const type = output.get('type');
      const content = output.get('content');

      if (!outputRenderers.hasOwnProperty(type)) {
        throw new Error(`No output renderer set for ${type} in outputRenderers`);
      }

      const OutputComponent = outputRenderers[type];

      return (
        <OutputComponent
          key={`${terminalId}-${index}`}
          {...outputRendererProps}
          content={content}/>
      );
    })}
  </div>
);

OutputList.propTypes = {
  outputRenderers: PropTypes.object.isRequired,
  outputs: PropTypes.object.isRequired,
  terminalId: PropTypes.number,
};

export default OutputList;
