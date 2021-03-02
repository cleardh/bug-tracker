import Root from '../../../Root';
import Dashboard from './dashboard';

it('renders bug cards', () => {
    const wrapper = shallow(
        <Root>
            <Dashboard />
        </Root>
    );
    expect(wrapper).toMatchSnapshot();
});

it('formats bug card components', () => {
    const wrapper = mount(
        <Root>
            <Dashboard />
        </Root>
    );
    const totalText = wrapper.find('h2').length;
    const countText = wrapper.find('p').length;
    expect(totalText).toEqual(3);
    expect(countText).toEqual(3);
});

// it('redirects to viewBugs', () => {
//     const wrapper = mount(
//         <Root>
//             <Dashboard />
//         </Root>
//     );
//     wrapper.find('Card').first().simulate('click');
//     wrapper.update();
// });