
import React from 'react';
import { storiesOf } from '@storybook/react';
import ReactTerminal from 'ReactTerminal';

storiesOf('ReactTerminal - Prompt symbol', module)
  .add('with text symbol', () => (
    <ReactTerminal promptSymbol='>‍' />
  ))
  .add('with emoji symbol', () => (
    <ReactTerminal promptSymbol='🔥' />
  ));
