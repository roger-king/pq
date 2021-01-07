import React from 'react';
import renderer from 'react-test-renderer';

import { Header } from '../../../components/header';

describe('<Header />', () => {
  test('should display Header', async () => {
    const tree = renderer.create(<Header gridArea="header" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
