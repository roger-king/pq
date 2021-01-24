import React from 'react';
import { Box, Button, TextInput } from 'grommet';
import { AddCircle } from 'grommet-icons';

import { QuestionCard } from '../../card';
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
    <QuestionCard>
      <TextInput placeholder={`Question ${qIndex + 1}`} value={q} onChange={qOnChange} />
      <Box gap="small" margin="small">
        {options.map((o) => (
          <OptionForm key={`question-option-form-${o.currentIndex}`} {...o} />
        ))}
        {options.length < maxNumOptions && (
          /**
           * NOTE: the button is disabled because there is a bug.
           * When the first option field is completely blank (no answer or title) and we add another option
           * the two option field onchange events are bound together. This means, when typing the title or
           * checking the answer checkbox both options will reflect the same changes.
           * The disable check is a quick workaround this bug.
           */
          <Button icon={<AddCircle />} onClick={addOption} disabled={options[options.length - 1].title.length === 0} />
        )}
      </Box>
    </QuestionCard>
  );
};
