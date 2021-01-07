import React from 'react';
import renderer from 'react-test-renderer';

import Tile from '../../../components/tile';

describe('<Tile />', () => {
  test('should display Tile without background', async () => {
    const tree = renderer.create(<Tile />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should display Tile with background', async () => {
    const tree = renderer.create(<Tile background="#000" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
