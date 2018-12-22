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

class TerminalStateless extends Component {
  constructor({emulatorState}) {
    super();

    this.emulator = new Emulator();
    this.historyKeyboardPlugin = new HistoryKeyboardPlugin(emulatorState);
    this.plugins = [this.historyKeyboardPlugin];
    this.inputRef = null;
  }

  shouldComponentUpdate(nextProps) {
    if (!this.props || !this.props.emulatorState || !nextProps || !nextProps.emulatorState) {
      return true;
    }
    const isOutputEqual = this.props.emulatorState.getOutputs() ===
      nextProps.emulatorState.getOutputs();
    const isInputStrEqual = this.props.inputStr === nextProps.inputStr;

    return !isOutputEqual || !isInputStrEqual;
  }

  componentDidUpdate() {
    if (this.inputRef) {
      this.inputRef.scrollIntoView();
    }
  }

  _submitInput(commandStr) {
    const {onStateChange, emulatorState} = this.props;
    const newState = this.emulator.execute(
      emulatorState, commandStr, this.plugins
    );

    onStateChange(newState);
  }

  _setInput(inputStr) {
    const {onInputChange} = this.props;

    onInputChange(inputStr);
  }

  _onInputKeyDownEvent(e) {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        this._setInput(this.historyKeyboardPlugin.completeUp());
        break;

      case 'ArrowDown':
        e.preventDefault();
        this._setInput(this.historyKeyboardPlugin.completeDown());
        break;

      case 'Tab':
        e.preventDefault();

        const autoCompletedStr = this.emulator.autocomplete(
          this.props.emulatorState, this.props.inputStr
        );

        this._setInput(autoCompletedStr);
        break;
    }
  }

  render() {
    const {acceptInput, emulatorState, inputStr, theme, promptSymbol, outputRenderers, terminalId} = this.props;
    let inputControl;

    if (!emulatorState) {
      return null;
    }

    if (acceptInput) {
      inputControl = (
        <CommandInput
          ref={(ref) => { this.inputRef = ref; }}
          promptSymbol={promptSymbol}
          value={inputStr}
          onSubmit={(cmd) => this._submitInput(cmd)}
          onKeyDown={(e) => this._onInputKeyDownEvent(e)}
          onChange={(e) => this._setInput(e.target.value)}
        />
      );
    }

    return (
      <ThemeProvider theme={theme}>
        <TerminalContainer className={'terminalContainer'}>
          <OutputList
            terminalId={terminalId}
            promptSymbol={promptSymbol}
            outputRenderers={outputRenderers}
            outputs={emulatorState.getOutputs()} />

          {inputControl}
        </TerminalContainer>
      </ThemeProvider>
    );
  }
};

TerminalStateless.propTypes = {
  acceptInput: PropTypes.bool,
  inputStr: PropTypes.string.isRequired,
  terminalId: PropTypes.string,
  theme: PropTypes.object,
  promptSymbol: PropTypes.string,
  outputRenderers: PropTypes.object,
  emulatorState: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onStateChange: PropTypes.func.isRequired
};

TerminalStateless.defaultProps = {
  acceptInput: true,
  emulatorState: EmulatorState.createEmpty(),
  theme: defaultTheme,
  promptSymbol: '$',
  outputRenderers: defaultRenderers,
  inputStr: '',
  terminalId: 'terminal01'
};

export default TerminalStateless;
