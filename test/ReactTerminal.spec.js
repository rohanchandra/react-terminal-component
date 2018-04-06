import chai from 'chai';
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactTerminal from 'ReactTerminal';

describe('ReactTerminal', () => {
  configure({
    adapter: new Adapter() // React adapter for enzyme
  });

  it('should render', () => {
    const container = shallow(<ReactTerminal/>);

    chai.assert.isDefined(container);
  });

  it('should have .terminalContainer CSS class', () => {
    const container = shallow(<ReactTerminal/>);

    chai.expect(container.find('.terminalContainer').length).to.equal(1);
  });
});
