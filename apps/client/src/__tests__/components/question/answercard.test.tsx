import React from 'react';
import renderer from 'react-test-renderer';

import { AnswerCard } from '../../../components/question';

describe('<AnswerCard />', () => {
  test('should display AnswerCard none selected', async () => {
    const tree = renderer
      .create(
        <AnswerCard
          q="What day is it?"
          options={[
            { key: 'A', title: 'Monday' },
            { key: 'B', title: 'Tuesday' },
          ]}
          selectedAnswer={null}
          setSelectedAnswer={() => console.log('Setting')}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should display AnswerCard with selected Answer', async () => {
    const tree = renderer
      .create(
        <AnswerCard
          q="What day is it?"
          options={[
            { key: 'A', title: 'Monday' },
            { key: 'B', title: 'Tuesday' },
          ]}
          selectedAnswer="Monday"
          setSelectedAnswer={() => console.log('Setting')}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
