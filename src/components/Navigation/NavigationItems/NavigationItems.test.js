import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem))
            .toHaveLength(2);
    });

    it('should render three <NavigationItem /> elements if is authenticated', () => {
        wrapper.setProps({ isLoggedIn: true });
        expect(wrapper.find(NavigationItem))
            .toHaveLength(3);
    });

    it('should render logout navigation link if is authenticated', () => {
        wrapper.setProps({ isLoggedIn: true });
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>))
            .toEqual(true);
    });

    it('should render orders navigation link if authenticated', () => {
        wrapper.setProps({ isLoggedIn: true });
        expect(wrapper.contains(<NavigationItem link="/orders">Orders</NavigationItem>))
            .toEqual(true);
    });
});
