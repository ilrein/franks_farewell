import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Dashboard from './Dashboard';

configure({ adapter: new Adapter() });

describe('<Dashboard />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper).toBeTruthy();
  });
});
