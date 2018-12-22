import chai from 'chai';
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactTerminal from 'ReactTerminal';
import ReactTerminalStateless from 'ReactTerminalStateless';

describe('ReactTerminal', () => {
  configure({
    adapter: new Adapter() // React adapter for enzyme
  });

  it('should render', () => {
    const container = shallow(<ReactTerminal/>);

    chai.assert.isDefined(container);
  });

  it('should have ReactTerminalStateless component', () => {
    const container = shallow(<ReactTerminal/>);

    chai.expect(container.find(ReactTerminalStateless).length).to.equal(1);
  });
});
