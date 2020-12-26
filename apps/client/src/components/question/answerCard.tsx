import React from 'react';
import { Heading, RadioButtonGroup } from 'grommet';

import { QuestionCard } from './../card';
import { Question } from '../../@types';

interface AnswerCardProps extends Partial<Question> {
  selectedAnswer: string | null;
  setSelectedAnswer: (a: string) => void;
}

export const AnswerCard: React.FC<AnswerCardProps> = ({
  q,
  options,
  setSelectedAnswer,
  selectedAnswer,
}: AnswerCardProps) => {
  const findOptionValue = (a: string | null): string => {
    const selectedAns = '';

    if (options) {
      for (let o of options!) {
        console.log(o);
      }
    }

    return selectedAns;
  };
  return (
    <QuestionCard>
      <Heading level="2">{q}</Heading>
      <RadioButtonGroup
        id="example2-id"
        name="question-option"
        options={options!.map((o) => `${o.key}. ${o.title}`)}
        value={selectedAnswer ? selectedAnswer : undefined}
        onChange={(e: any) => {
          setSelectedAnswer(e.target.value);
        }}
      />
    </QuestionCard>
  );
};
