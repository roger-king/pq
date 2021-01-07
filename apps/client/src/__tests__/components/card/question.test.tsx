import React from 'react';
import renderer from 'react-test-renderer';

import { QuestionCard } from '../../../components/card';

describe('<QuestionCard />', () => {
  test('should display QuestionCard', async () => {
    const tree = renderer
      .create(
        <QuestionCard>
          <div>testing</div>
        </QuestionCard>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
