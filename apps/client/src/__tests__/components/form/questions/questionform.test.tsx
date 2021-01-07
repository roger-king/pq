import React from 'react';
import renderer from 'react-test-renderer';

import { QuestionForm } from '../../../../components/form/questions';

describe('<QuestionForm />', () => {
  test('should display QuestionForm', async () => {
    const tree = renderer
      .create(
        <QuestionForm
          q="A questions"
          qIndex={1}
          qOnChange={(e) => console.log(e)}
          maxNumOptions={4}
          options={[{ answer: false, title: 'Monday' }].map((o, oi) => ({
            isAnswer: o.answer,
            title: o.title,
            titleOnChange: (e): void => {
              console.log('testing', e);
            },
            currentIndex: oi,
            answerOnChange: (e): void => {
              console.log('testing', e);
            },
            showRemove: false,
            remove: (): void => {
              console.log('testing');
            },
          }))}
          addOption={() => {
            console.log('adding');
          }}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
