![logo](https://user-images.githubusercontent.com/816965/38487336-1d193960-3c23-11e8-8da6-9575b0eac3e9.png)

# React Terminal Component
> React component that renders a terminal emulator

[Demo](https://rohanchandra.gitlab.io/react-terminal-component/storybook/)

![screenshot](https://user-images.githubusercontent.com/816965/38465790-8d461534-3b63-11e8-850c-c3cd76ef5048.gif)

React Terminal Component is a customizable React component backed by a [JavaScript terminal emulator](https://github.com/rohanchandra/javascript-terminal).

Some of cool features of this React component are:

* Emulator themes
* In-memory file system
* Built-in commands like `ls`, `cd`, `head`, `cat`, `echo`, `rm` and more
* Autocompletion of terminal commands
* Keyboard navigation of past commands using up and down arrow key

## Installation
Install with `npm` or with `yarn`.

```shell
npm install react-terminal-component javascript-terminal --save
```

```shell
yarn add react-terminal-component javascript-terminal
```

## Usage

### React
```javascript
import React, { Component } from 'react';
import ReactTerminal from 'react-terminal-component';

class App extends Component {
  render() {
    return (
      <div>
        <ReactTerminal/>
      </div>
    );
  }
}
```

### Props

All of these props apply to both `ReactTerminal` and `ReactTerminalStateless`.

#### emulatorState

* [Code examples](https://github.com/rohanchandra/react-terminal-component/blob/master/stories/ReactTerminal_state.js)
* [Demo](https://rohanchandra.gitlab.io/react-terminal-component/storybook/?selectedKind=ReactTerminal%20-%20Emulator%20State)

Emulator state is created using the [JavaScript terminal emulator library](https://github.com/rohanchandra/javascript-terminal) and contains:

* the file system,
* command mapping,
* history,
* command outputs, and
* environment variables

The `emulatorState` prop allows you to provide a custom emulator state.

See the [library documentation](https://github.com/rohanchandra/javascript-terminal#emulator-state) for information on creating the emulator state, or view the [code examples](https://github.com/rohanchandra/react-terminal-component/blob/master/stories/ReactTerminal_state.js) to get started.

#### theme

* [Code examples](https://github.com/rohanchandra/react-terminal-component/blob/master/stories/ReactTerminal_themes.js)
* [Demo](https://rohanchandra.gitlab.io/react-terminal-component/storybook/?selectedKind=ReactTerminal%20-%20Themes)

The `theme` prop accepts an object from `ReactThemes`. The themes current available are:

* `ReactThemes.magpie`
* `ReactThemes.ember`
* `ReactThemes.dye`
* `ReactThemes.forest`
* `ReactThemes.hacker`
* `ReactThemes.sea`
* `ReactThemes.light`

To import `ReactThemes` use the following code:

```
import { ReactThemes } from 'react-terminal-component';
```

Alternatively, you can specify your own theme with an object like this:

```
<ReactTerminal theme={{
  background: '#141313',
  promptSymbolColor: '#6effe6',
  commandColor: '#fcfcfc',
  outputColor: '#fcfcfc',
  errorOutputColor: '#ff89bd',
  fontSize: '1.1rem',
  spacing: '1%',
  fontFamily: 'monospace',
  width: '100%',
  height: '50vh'
}}/>
```

#### promptSymbol

* [Code examples](https://github.com/rohanchandra/react-terminal-component/blob/master/stories/ReactTerminal_prompt.js)
* [Demo](https://rohanchandra.gitlab.io/react-terminal-component/storybook/?selectedKind=ReactTerminal%20-%20Prompt%20symbol)

The `promptSymbol` prop accepts a string to be displayed in command headers and the input field.

#### outputRenderers

* [Code example](https://github.com/rohanchandra/react-terminal-component/blob/master/stories/ReactTerminal_output.js)
* [Demo](https://rohanchandra.gitlab.io/react-terminal-component/storybook/?selectedKind=ReactTerminal%20-%20OutputRenderer)

The `outputRenderers` prop allows you to create new ways of displaying terminal output. See the [code example](https://github.com/rohanchandra/react-terminal-component/blob/master/stories/ReactTerminal_output.js), which creates a new type of output (output with a white background).

The default renderers are accessible in `ReactOutputRenderers`.

```
import { ReactOutputRenderers } from 'react-terminal-component';
```

#### acceptInput

The `acceptInput` prop is a boolean value, defaulting to true. When disabled, the input field is removed. This may be useful in conjunction with `ReactTerminalStateless` if you're managing state externally and simulating long-running commands.

* [Code examples](https://github.com/rohanchandra/react-terminal-component/blob/master/stories/ReactTerminal.js)
* [Demo](https://rohanchandra.gitlab.io/react-terminal-component/storybook/?selectedKind=ReactTerminal&selectedStory=with%20acceptInput%3Dfalse)

#### autoFocus

The `autoFocus` prop defaults to true and causes the input field to gain focus when the component is first mounted and whenever the component is updated i.e. if props change. This prop can work in conjunction with `clickToFocus`.

* [Code examples](https://github.com/rohanchandra/react-terminal-component/blob/master/stories/ReactTerminal.js)
* [Demo](https://rohanchandra.gitlab.io/react-terminal-component/storybook/?selectedKind=ReactTerminal&selectedStory=with%20autoFocus%3Dfalse)

#### clickToFocus

The `clickToFocus` prop is a boolean value, defaulting to false. When enabled, clicking anywhere within the terminal will shift focus to the input field.

* [Code examples](https://github.com/rohanchandra/react-terminal-component/blob/master/stories/ReactTerminal.js)
* [Demo](https://rohanchandra.gitlab.io/react-terminal-component/storybook/?selectedKind=ReactTerminal&selectedStory=with%20clickToFocus)

### Managing state externally

The `ReactTerminal` component allows the initial values of `emulatorState` and `inputStr` to be specified, but thereafter the component handles the state internally. In some cases you may need to manage the state externally from the `react-terminal-component` module. 

You can use `ReactTerminalStateless` to control the state of `emulatorState` and `inputStr`, but you must also supply the `onInputChange` and `onStateChange` props. You'll need to use `javascript-terminal` in order to modify the `emulatorState`.

This is a simple component which handles the terminal state. You could adapt this idea to make the state be handled by Redux and to modify the state asynchronously, not in direct response to a command within the terminal.

```javascript
import React, { Component } from 'react';
import {ReactTerminalStateless} from 'react-terminal-component';

class App extends Component {
  constructor() {
    super();
    this.state = {
      emulatorState: EmulatorState.createEmpty(),
      inputStr: 'initial value'
    };
  }

  render() {
    return (
      <ReactTerminalStateless
        emulatorState={this.state.emulatorState}
        inputStr={this.state.inputStr}
        onInputChange={(inputStr) => this.setState({inputStr})}
        onStateChange={(emulatorState) => this.setState({emulatorState})}
      />
    );
  }
}
```

## Building

### Set-up

First, make sure you have  [Node.js](https://nodejs.org/en/download/), [Yarn](https://yarnpkg.com/en/docs/install) and [Git](https://git-scm.com/downloads) installed.

Now, fork and clone repo and install the dependencies.

```shell
git clone https://github.com/rohanchandra/react-terminal-component.git
cd react-terminal-component/
yarn install
```

### Scripts

#### Build scripts
* `yarn build`  - creates a production build of the library in `lib`
* `yarn dev` - creates a development build of the library and runs a watcher

#### Test scripts
* `yarn test` - run tests
* `yarn test:min` - run tests with summary reports
* `yarn test:coverage` - shows test coverage stats

#### Artifacts
* `yarn artifact:coverage-report` - creates HTML test coverage report in `.nyc_output`
* `yarn artifact:storybook` - emulator demos

## Potential uses

Some ideas for using React Terminal Component in your next project:

* **Games**: Create a command-line based game, playable in the browser
* **Education**: Teach popular *NIX commands sandboxed in the browser (no important files accidentally removed with `rm -r`!)
* **Personal website**: Make your personal website or web resume a command-line interface
* **Demos**: Create mock commands in JavaScript for your CLI app, and let users try out commands in their browser with simulated output

## License

Copyright 2018 Rohan Chandra

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
