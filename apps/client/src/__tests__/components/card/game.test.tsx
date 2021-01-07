import React from 'react';
import renderer from 'react-test-renderer';

import { GameCard } from '../../../components/card';

describe('<GameCard />', () => {
  test('should display connected GameCard with 60 seconds', async () => {
    const tree = renderer
      .create(
        <GameCard time={60} connected>
          {' '}
          <div>test content</div>{' '}
        </GameCard>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should display disconnected GameCard with 0 seconds', async () => {
    const tree = renderer
      .create(
        <GameCard time={0} connected={false}>
          <div>test content</div>
        </GameCard>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should display connected GameCard with 60 seconds and extended footer', async () => {
    const tree = renderer
      .create(
        <GameCard time={60} connected extendedFooter={<div>Footer</div>}>
          <div>test content</div>
        </GameCard>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
