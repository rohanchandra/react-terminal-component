import React from 'react';
import { storiesOf } from '@storybook/react';

import ReactTerminal from 'ReactTerminal';
import {
  EmulatorState, OutputFactory, CommandMapping,
  EnvironmentVariables, FileSystem, History,
  Outputs, defaultCommandMapping
} from 'javascript-terminal';

storiesOf('ReactTerminal - Emulator State', module)
  .add('with custom file system', () => {
    const customState = EmulatorState.create({
      'fs': FileSystem.create({
        '/home': { },
        '/home/README': {content: 'This is a text file'},
        '/home/nested/directory': {},
        '/home/nested/directory/file': {content: 'End of nested directory!'}
      })
    });

    return (
      <ReactTerminal
        inputStr='ls'
        emulatorState={customState}/>
    );
  })
  .add('with existing outputs', () => {
    const defaultState = EmulatorState.createEmpty();
    const defaultOutputs = defaultState.getOutputs();

    const newOutputs = Outputs.addRecord(
      defaultOutputs, OutputFactory.makeTextOutput(
        `This is an example of using output to display a message
to the user before any commands are run.`
      )
    );
    const emulatorState = defaultState.setOutputs(newOutputs);

    return (
      <ReactTerminal
        inputStr=''
        emulatorState={emulatorState}/>
    );
  })
  .add('with history', () => {
    const defaultState = EmulatorState.createEmpty();
    const defaultHistory = defaultState.getHistory();

    const newHistory = History.recordCommand(defaultHistory, 'history');
    const emulatorState = defaultState.setHistory(newHistory);

    return (
      <ReactTerminal
        inputStr='Press up arrow to view history'
        emulatorState={emulatorState}/>
    );
  })
  .add('with new environment variable', () => {
    const defaultState = EmulatorState.createEmpty();
    const defaultEnvVariables = defaultState.getEnvVariables();

    const newEnvVariables = EnvironmentVariables.setEnvironmentVariable(
      defaultEnvVariables, 'CUSTOM_ENV_VARIABLE', 'this is the value'
    );
    const emulatorState = defaultState.setEnvVariables(newEnvVariables);

    return (
      <ReactTerminal
        inputStr='echo $CUSTOM_ENV_VARIABLE'
        emulatorState={emulatorState}/>
    );
  })
  .add('with new command', () => {
    const customState = EmulatorState.create({
      'commandMapping': CommandMapping.create({
        ...defaultCommandMapping,
        'print': {
          'function': (state, opts) => {
            const input = opts.join(' ');

            return {
              output: OutputFactory.makeTextOutput(input)
            };
          },
          'optDef': {}
        }
      })
    });

    return (
      <ReactTerminal
        inputStr='print hello world!'
        emulatorState={customState}/>
    );
  });
