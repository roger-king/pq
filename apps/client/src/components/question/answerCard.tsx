import React from 'react';
import { Box, Heading, RadioButtonGroup } from 'grommet';

import { QuestionCard } from '../card';
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
  return (
    <Box fill align="center" justify="center">
      <QuestionCard border={false}>
        <Heading level="4" margin="small">
          {q}
        </Heading>
        <RadioButtonGroup
          margin="medium"
          id="example2-id"
          name="question-option"
          options={options ? options.map((o) => `${o.key}. ${o.title}`) : []}
          value={selectedAnswer || undefined}
          onChange={(e: any) => {
            setSelectedAnswer(e.target.value);
          }}
        />
      </QuestionCard>
    </Box>
  );
};
