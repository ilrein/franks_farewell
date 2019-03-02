import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Company from './Company';

configure({ adapter: new Adapter() });

describe('<Company />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Company />);
    expect(wrapper).toBeTruthy();
  });
});
