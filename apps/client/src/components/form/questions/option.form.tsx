import { Box, Button, CheckBox, TextInput } from 'grommet';
import { SubtractCircle } from 'grommet-icons';
import React from 'react';

export interface OptionFormProps {
  showRemove: boolean;
  currentIndex: number;
  isAnswer: boolean;
  answerOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  titleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  remove: () => void;
}

export const OptionForm: React.FC<OptionFormProps> = ({
  isAnswer,
  title,
  answerOnChange,
  titleOnChange,
  currentIndex,
  showRemove,
  remove,
}: OptionFormProps) => {
  return (
    <Box direction="row" gap="small" align="center">
      <CheckBox value={currentIndex} label="answer" reverse checked={isAnswer} onChange={answerOnChange} />
      <TextInput placeholder={`Option ${currentIndex + 1}`} value={title} onChange={titleOnChange} />
      {showRemove && <Button icon={<SubtractCircle />} onClick={remove} />}
    </Box>
  );
};
