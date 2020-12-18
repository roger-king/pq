import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Box, Button, CheckBox, TextInput } from 'grommet';
import { AddCircle, SubtractCircle } from 'grommet-icons';
import { useMutation } from 'react-query';

import { withMainLayout } from '../layouts/main';
import { API_URL } from '../constants';

const CreatePage: React.FC = () => {
  const router = useRouter();
  const maxNumOptions = 4;
  const defaultOption = { title: '', answer: false };
  const defaultQuestion = { q: '', options: [defaultOption] };
  const [questions, setQuestions] = useState([defaultQuestion]);
  const [name, setName] = useState('');
  const [hostName, setHostName] = useState('');
  const abcd: { [key: number]: string } = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
  };

  const [createGame] = useMutation(async (vars: { name: string; createdBy: string }) => {
    // TODO: separate creating game and questions.
    const { data: gameData } = await axios.post(`${API_URL}/games`, { name: vars.name, created_by: vars.createdBy });

    const qPayload = questions.map((q) => {
      let answer;
      for (let i = 0; i < q.options.length; i++) {
        if (q.options[i].answer) {
          answer = abcd[i];
        }
      }

      return {
        game_id: gameData.id,
        q: q.q,
        created_by: hostName,
        answer,
        options: q.options.map((o, i) => ({ key: abcd[i], title: o.title })),
      };
    });

    const { data } = await axios.post(`${API_URL}/games/${gameData.id}/questions`, qPayload);
    return data;
  });

  return (
    <Box fill margin={{ top: '30px', bottom: '30px' }}>
      <Box margin={{ left: '200px', right: '200px', top: '20px', bottom: '20px' }} gap="small" flex={false}>
        <Button
          alignSelf="end"
          label="Create"
          primary
          onClick={() => {
            createGame({ name: name, createdBy: hostName });
          }}
        />
        <Box elevation="medium" pad="medium" border="all" height="250px" gap="small" align="center" justify="center">
          <TextInput placeholder="New PQ" value={name} onChange={(e) => setName(e.target.value)} />
          <TextInput placeholder="Hosted By..." value={hostName} onChange={(e) => setHostName(e.target.value)} />
        </Box>
        <Box height="100%" gap="medium" overflow="auto">
          {questions.map((q, i) => (
            <Box
              key={`question-${i + 1}`}
              elevation="medium"
              pad="medium"
              border="all"
              height={{ min: '278px', max: '400px' }}
            >
              <TextInput
                placeholder={`Question ${i + 1}`}
                value={q.q}
                onChange={(e) => {
                  const newQuestions = questions;
                  newQuestions[i].q = e.target.value;
                  setQuestions([...newQuestions]);
                }}
              />
              <Box margin="medium" gap="small" height={{ min: 'min-height: 100%!important', max: '205px' }} flex="grow">
                {q.options.map((o, oi) => (
                  <Box key={`option-${oi}`} direction="row" gap="small" align="center">
                    <CheckBox
                      value={oi}
                      label="answer"
                      reverse
                      checked={o.answer}
                      onChange={(e) => {
                        const index = Number(e.target.value);
                        const newQuestions = questions;
                        newQuestions[i].options.map((no, noi) => {
                          if (noi === index) {
                            no.answer = e.target.checked;
                          } else {
                            no.answer = false;
                          }
                        });
                        setQuestions([...newQuestions]);
                      }}
                    />
                    <TextInput
                      placeholder={`Option ${oi + 1}`}
                      value={o.title}
                      onChange={(e) => {
                        const newQuestions = questions;
                        newQuestions[i].options[oi].title = e.target.value;
                        setQuestions([...newQuestions]);
                      }}
                    />
                    {q.options.length > 1 && (
                      <Button
                        value={oi}
                        icon={<SubtractCircle />}
                        onClick={(e) => {
                          const newQuestions = questions;
                          if (newQuestions[i].options.length > 1) {
                            newQuestions[i].options.splice(oi, 1);
                            setQuestions([...newQuestions]);
                          }
                        }}
                      />
                    )}
                  </Box>
                ))}
                {q.options.length < maxNumOptions && (
                  <Button
                    icon={<AddCircle />}
                    onClick={() => {
                      const newQuestions = questions;
                      if (newQuestions[i].options.length < maxNumOptions) {
                        newQuestions[i].options.push(defaultOption);
                        setQuestions([...newQuestions]);
                      }
                    }}
                  />
                )}
              </Box>
            </Box>
          ))}
        </Box>
        <Button
          label="Question"
          icon={<AddCircle />}
          primary
          onClick={() => {
            setQuestions((q) => [...q, defaultQuestion]);
          }}
        />
      </Box>
    </Box>
  );
};

export default withMainLayout(CreatePage);
