# React Terminal Component
> React component that renders a terminal emulator

[Demo](https://rohanchandra.gitlab.io/react-terminal-component/storybook/)

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

## License

Copyright 2018 Rohan Chandra

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
