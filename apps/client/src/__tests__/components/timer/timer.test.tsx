import React from 'react';
import renderer from 'react-test-renderer';

import { Timer } from '../../../components/timer';

describe('<Timer />', () => {
  test('should display Timer with 60 seconds', async () => {
    const tree = renderer.create(<Timer time={60} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
