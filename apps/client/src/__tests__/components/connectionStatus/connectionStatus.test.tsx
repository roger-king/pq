import React from 'react';
import renderer from 'react-test-renderer';

import { ConnectionStatus } from '../../../components/connectionStatus';

describe('<ConnectionStatus />', () => {
  test('should display connected ConnectionStatus', async () => {
    const tree = renderer.create(<ConnectionStatus connected />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should display disconnected ConnectionStatus', async () => {
    const tree = renderer.create(<ConnectionStatus connected={false} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should display ConnectionStatus with Children', async () => {
    const tree = renderer
      .create(
        <ConnectionStatus connected={false}>
          <div>Hello</div>
        </ConnectionStatus>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
