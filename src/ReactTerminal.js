import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import {
  Emulator, HistoryKeyboardPlugin, EmulatorState
} from 'javascript-terminal';
import defaultTheme from 'themes/default';
import CommandInput from 'input/CommandInput';
import OutputList from 'OutputList';
import TerminalContainer from 'TerminalContainer';
import defaultRenderers from 'output';

class Terminal extends Component {
  constructor({emulatorState, inputStr}) {
    super();

    this.emulator = new Emulator();
    this.historyKeyboardPlugin = new HistoryKeyboardPlugin(emulatorState);
    this.plugins = [this.historyKeyboardPlugin];
    this.state = {
      emulatorState,
      inputStr
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onInputSubmit = this.onInputSubmit.bind(this);
    this.onInputKeyDownEvent = this.onInputKeyDownEvent.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isOutputEqual = this.state.emulatorState.getOutputs() ===
      nextState.emulatorState.getOutputs();
    const isInputStrEqual = this.state.inputStr === nextState.inputStr;

    return !isOutputEqual || !isInputStrEqual;
  }

  componentDidUpdate() {
    if (this.inputRef) {
      this.inputRef.scrollIntoView();
    }
  }

  onInputSubmit(commandStr) {
    const newState = this.emulator.execute(
      this.state.emulatorState, commandStr, this.plugins
    );

    this.setState(({emulatorState, ...rest}) => ({
      ...rest,
      inputStr: '',
      emulatorState: newState
    }));
  }

  onInputChange(e) {
    this.setState(({inputStr, ...rest}) => ({
      ...rest,
      inputStr: e.target.value
    }));
  }

  onInputKeyDownEvent(e) {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();

        this.setState(({inputStr, ...rest}) => ({
          ...rest,
          inputStr: this.historyKeyboardPlugin.completeUp()
        }));

        break;
      case 'ArrowDown':
        e.preventDefault();

        this.setState(({inputStr, ...rest}) => ({
          ...rest,
          inputStr: this.historyKeyboardPlugin.completeDown()
        }));

        break;
      case 'Tab':
        e.preventDefault();

        const autoCompletedStr = this.emulator.autocomplete(
          this.state.emulatorState, this.state.inputStr
        );

        this.setState(({inputStr, ...rest}) => ({
          ...rest,
          inputStr: autoCompletedStr
        }));

        break;
    }
  }

  render() {
    const { theme, promptSymbol, outputRenderers } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <TerminalContainer className={'terminalContainer'}>
          <OutputList
            promptSymbol={promptSymbol}
            outputRenderers={outputRenderers}
            outputs={this.state.emulatorState.getOutputs()} />

          <CommandInput
            ref={inputRef => { this.inputRef = inputRef; }}
            promptSymbol={promptSymbol}
            value={this.state.inputStr}
            onSubmit={this.onInputSubmit}
            onKeyDown={this.onInputKeyDownEvent}
            onChange={this.onInputChange}
          />
        </TerminalContainer>
      </ThemeProvider>
    );
  }
};

Terminal.propTypes = {
  theme: PropTypes.object,
  promptSymbol: PropTypes.string,
  outputRenderers: PropTypes.object,
  emulatorState: PropTypes.object
};

Terminal.defaultProps = {
  emulatorState: EmulatorState.createEmpty(),
  theme: defaultTheme,
  promptSymbol: '$',
  outputRenderers: defaultRenderers,
  inputStr: ''
};

export default Terminal;
