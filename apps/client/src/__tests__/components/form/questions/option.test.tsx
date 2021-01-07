import React from 'react';
import renderer from 'react-test-renderer';

import { OptionForm } from '../../../../components/form/questions';

describe('<OptionForm />', () => {
  test('should display basic Options Form: not answer or remove not shown', async () => {
    const tree = renderer
      .create(
        <OptionForm
          showRemove={false}
          currentIndex={1}
          isAnswer={false}
          answerOnChange={(e) => console.log('testing', e)}
          title="test"
          titleOnChange={(e) => console.log('test', e)}
          remove={() => console.log('remove')}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should display basic Options Form: not answer or remove shown', async () => {
    const tree = renderer
      .create(
        <OptionForm
          showRemove
          currentIndex={1}
          isAnswer={false}
          answerOnChange={(e) => console.log('testing', e)}
          title="test"
          titleOnChange={(e) => console.log('test', e)}
          remove={() => console.log('remove')}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should display basic Options Form is answer or remove shown', async () => {
    const tree = renderer
      .create(
        <OptionForm
          showRemove
          currentIndex={1}
          isAnswer
          answerOnChange={(e) => console.log('testing', e)}
          title="test"
          titleOnChange={(e) => console.log('test', e)}
          remove={() => console.log('remove')}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
