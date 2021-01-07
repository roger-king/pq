import React from 'react';
import renderer from 'react-test-renderer';

import Modal from '../../../components/modal';

describe('<Modal />', () => {
  test('should display Base Modal', async () => {
    const tree = renderer
      .create(
        <Modal title="Testing Modal" onClose={() => console.log('testing')}>
          {' '}
          <div>Some content for the base model</div>
        </Modal>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
