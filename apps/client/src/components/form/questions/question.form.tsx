import React from 'react';
import { Box, Button, TextInput } from 'grommet';
import { AddCircle } from 'grommet-icons';

import { QuestionCard } from './../../card';
import { OptionFormProps, OptionForm } from './option.form';

export interface QuestionFormProps {
  qIndex: number;
  q: string;
  qOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: OptionFormProps[];
  addOption: () => void;
  maxNumOptions: number;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  q,
  qOnChange,
  qIndex,
  options,
  addOption,
  maxNumOptions,
}: QuestionFormProps) => {
  return (
    <QuestionCard elevation={true}>
      <TextInput placeholder={`Question ${qIndex + 1}`} value={q} onChange={qOnChange} />
      <Box gap="small" margin="small">
        {options.map((o) => (
          <OptionForm key={`question-option-form-${o.currentIndex}`} {...o} />
        ))}
        {options.length < maxNumOptions && <Button icon={<AddCircle />} onClick={addOption} />}
      </Box>
    </QuestionCard>
  );
};
