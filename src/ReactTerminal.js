import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTerminalStateless from 'ReactTerminalStateless';
import {EmulatorState} from 'javascript-terminal';
import defaultTheme from 'themes/default';
import defaultRenderers from 'output';

class Terminal extends Component {
  constructor({emulatorState, inputStr}) {
    super();

    this.state = {
      emulatorState,
      inputStr
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
  }

  _init(props) {
    const {emulatorState, inputStr} = props;

    this.setState({
      emulatorState,
      inputStr
    });
  }

  componentDidMount() {
    this._init(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this._init(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state || !this.state.emulatorState || !nextState || !nextState.emulatorState) {
      return true;
    }
    const isOutputEqual = this.state.emulatorState.getOutputs() ===
      nextState.emulatorState.getOutputs();
    const isInputStrEqual = this.state.inputStr === nextState.inputStr;

    return !isOutputEqual || !isInputStrEqual;
  }

  onInputChange(inputStr) {
    this.setState({inputStr});
  }

  onStateChange(emulatorState) {
    this.setState({emulatorState, inputStr: ''});
  }

  render() {
    const {acceptInput, theme, promptSymbol, outputRenderers, terminalId} = this.props;
    const {emulatorState, inputStr} = this.state;

    return (
      <ReactTerminalStateless
        acceptInput={acceptInput}
        emulatorState={emulatorState}
        inputStr={inputStr}
        onInputChange={this.onInputChange}
        onStateChange={this.onStateChange}
        outputRenderers={outputRenderers}
        promptSymbol={promptSymbol}
        terminalId={terminalId}
        theme={theme}
      />
    );
  }
};

Terminal.propTypes = {
  acceptInput: PropTypes.bool,
  inputStr: PropTypes.string,
  terminalId: PropTypes.string,
  theme: PropTypes.object,
  promptSymbol: PropTypes.string,
  outputRenderers: PropTypes.object,
  emulatorState: PropTypes.object
};

Terminal.defaultProps = {
  acceptInput: true,
  emulatorState: EmulatorState.createEmpty(),
  theme: defaultTheme,
  promptSymbol: '$',
  outputRenderers: defaultRenderers,
  inputStr: '',
  terminalId: 'terminal01'
};

export default Terminal;
