import React from 'react';
import renderer from 'react-test-renderer';

import { Logo } from '../../../components/logo';

describe('<Logo />', () => {
  test('should display default logo', async () => {
    const tree = renderer.create(<Logo />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
