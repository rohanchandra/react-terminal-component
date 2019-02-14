import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import {EmulatorState} from 'javascript-terminal';
import ReactTerminalStateless from 'ReactTerminalStateless';

class StatelessTerminalWrapper extends Component {
  constructor() {
    super();
    this.state = {
      emulatorState: EmulatorState.createEmpty(),
      inputStr: 'initial val'
    };
  }

  render() {
    return (
      <ReactTerminalStateless
        emulatorState={this.state.emulatorState}
        inputStr={this.state.inputStr}
        onInputChange={(inputStr) => this.setState({inputStr})}
        onStateChange={(emulatorState) => this.setState({emulatorState, inputStr: ''})}
      />
    );
  }
};

storiesOf('ReactTerminalStateless', module)
  .add('with simple wrapper', () => <StatelessTerminalWrapper />);
