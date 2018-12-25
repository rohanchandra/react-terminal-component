import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
    this.dragStart = {};
    this.dragging = false;
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

  _submitInput = (commandStr) => {
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

  _onInputKeyDownEvent = (e) => {
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

  _onClick = () => {
    if (this.inputRef && !this.dragging) {
      this.inputRef.scrollIntoView();
      this.inputRef.focus();
    }
  };

  _onMouseDown = (e) => {
    this.dragging = false;
    this.dragStart = {
      x: e.screenX,
      y: e.screenY
    };
  }

  _onMouseUp = (e) => {
    if (this.dragStart.x === e.screenX && this.dragStart.y === e.screenY) {
      this.dragging = false;
    } else {
      // For the next 100ms consider any click event to be part of this drag.
      this.dragging = true;
      setTimeout(() => { this.isDragging = false; }, 100, this);
    }
  }

  render() {
    const {
      acceptInput, clickToFocus, emulatorState, inputStr, theme, promptSymbol, outputRenderers, terminalId
    } = this.props;
    let inputControl, focusProps;

    if (!emulatorState) {
      return null;
    }

    if (clickToFocus) {
      focusProps = {
        onClick: this._onClick,
        onMouseDown: this._onMouseDown,
        onMouseUp: this._onMouseUp
      };
    }

    if (acceptInput) {
      inputControl = (
        <CommandInput
          ref={(ref) => { this.inputRef = ref; }}
          promptSymbol={promptSymbol}
          value={inputStr}
          onSubmit={this._submitInput}
          onKeyDown={this._onInputKeyDownEvent}
          onChange={(e) => this._setInput(e.target.value)}
        />
      );
    }

    return (
      <ThemeProvider theme={theme}>
        <TerminalContainer
          className={'terminalContainer'}
          {...focusProps}
        >
          <OutputList
            terminalId={terminalId}
            promptSymbol={promptSymbol}
            outputRenderers={outputRenderers}
            outputs={emulatorState.getOutputs()}
          />
          {inputControl}
        </TerminalContainer>
      </ThemeProvider>
    );
  }
};

TerminalStateless.propTypes = {
  acceptInput: PropTypes.bool,
  clickToFocus: PropTypes.bool,
  emulatorState: PropTypes.object.isRequired,
  inputStr: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onStateChange: PropTypes.func.isRequired,
  outputRenderers: PropTypes.object,
  promptSymbol: PropTypes.string,
  terminalId: PropTypes.string,
  theme: PropTypes.object
};

TerminalStateless.defaultProps = {
  acceptInput: true,
  clickToFocus: false,
  emulatorState: EmulatorState.createEmpty(),
  inputStr: '',
  outputRenderers: defaultRenderers,
  promptSymbol: '$',
  terminalId: 'terminal01',
  theme: defaultTheme
};

export default TerminalStateless;
