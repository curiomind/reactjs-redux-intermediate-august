import React from 'react';
import renderer from 'react-test-renderer';
import CatagoryMenu from './CatagoryMenu';

const selected = 'mobile';
const onCatagoryClick = jest.fn();

describe('Catagory Menu', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CatagoryMenu selected={selected} onCatagoryClick={onCatagoryClick} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
