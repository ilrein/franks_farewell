import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Home from './Home';

configure({ adapter: new Adapter() });

describe('<Home />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toBeTruthy();
  });
});
