import React from 'react';
import { storiesOf } from '@storybook/react';
import ReactTerminal from 'ReactTerminal';

storiesOf('ReactTerminal', module)
  .add('with default config', () => (
    <ReactTerminal/>
  ));
