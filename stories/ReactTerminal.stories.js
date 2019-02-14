import React from 'react';
import {
  EmulatorState, OutputFactory, Outputs
} from 'javascript-terminal';
import { storiesOf } from '@storybook/react';
import ReactTerminal from 'ReactTerminal';

storiesOf('ReactTerminal', module)
  .add('with default config', () => (
    <ReactTerminal/>
  ))
  .add('with clickToFocus', () => (
    <ReactTerminal clickToFocus/>
  ))
  .add('with acceptInput=false', () => {
    const defaultState = EmulatorState.createEmpty();
    const defaultOutputs = defaultState.getOutputs();

    const newOutputs = Outputs.addRecord(
      defaultOutputs, OutputFactory.makeTextOutput('This terminal is read-only.')
    );
    const emulatorState = defaultState.setOutputs(newOutputs);

    return <ReactTerminal emulatorState={emulatorState} acceptInput={false} />;
  })
  .add('with autoFocus=false', () => (
    <ReactTerminal autoFocus={false} />
  ));

