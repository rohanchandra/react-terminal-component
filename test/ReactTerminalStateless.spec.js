import chai from 'chai';
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {EmulatorState} from 'javascript-terminal';
import ReactTerminalStateless from 'ReactTerminalStateless';

describe('ReactTerminalStateless', () => {
  const props = {
    inputStr: '',
    emulatorState: EmulatorState.createEmpty(),
    onInputChange: () => {},
    onStateChange: () => {}
  };

  configure({
    adapter: new Adapter() // React adapter for enzyme
  });

  it('should render', () => {
    const container = shallow(<ReactTerminalStateless {...props} />);

    chai.assert.isDefined(container);
  });

  it('should have .terminalContainer CSS class', () => {
    const container = shallow(<ReactTerminalStateless {...props} />);

    chai.expect(container.find('.terminalContainer').length).to.equal(1);
  });
});
