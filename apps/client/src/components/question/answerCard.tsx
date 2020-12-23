import React from 'react';
import { Heading, RadioButtonGroup } from 'grommet';

import { QuestionCard } from './../card';
import { Question } from '../../@types';

interface AnswerCardProps extends Partial<Question> {}

export const AnswerCard: React.FC<AnswerCardProps> = ({ q, options }: AnswerCardProps) => {
  return (
    <QuestionCard>
      <Heading level="2">{q}</Heading>
      <RadioButtonGroup id="example2-id" name="question-option" options={options!.map((o) => `${o.key}. ${o.title}`)} />
    </QuestionCard>
  );
};
