import React, { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { Box, Button, TextInput } from 'grommet';
import { AddCircle } from 'grommet-icons';
import { useRouter } from 'next/router';
import { API_URL } from '../../constants';
import { QuestionForm } from '../../components/form/questions';

export const CreateGameContainer: React.FC = () => {
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
    // TODO: add error handling and messaging both API and Client
    // TODO: separate creating game and questions.
    // TODO: add validation on options (no blank fields)
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

    await axios.post(`${API_URL}/games/${gameData.id}/questions`, qPayload);
    router.push(`/pq/${gameData.host_code}`);
    return qPayload;
  });

  return (
    <Box margin={{ left: '200px', right: '200px', top: '20px', bottom: '20px' }} gap="small" flex={false}>
      <Button
        alignSelf="end"
        label="Create"
        primary
        onClick={() => {
          createGame({ name, createdBy: hostName });
        }}
      />
      <Box elevation="medium" pad="medium" border="all" height="250px" gap="small" align="center" justify="center">
        <TextInput placeholder="New PQ" value={name} onChange={(e) => setName(e.target.value)} />
        <TextInput placeholder="Hosted By..." value={hostName} onChange={(e) => setHostName(e.target.value)} />
      </Box>
      {questions.map((q, i) => (
        <QuestionForm
          key={`question-form-${i}`}
          q={q.q}
          qOnChange={(e) => {
            const newQuestions = questions;
            newQuestions[i].q = e.target.value;
            setQuestions([...newQuestions]);
          }}
          options={q.options.map((o, oi) => ({
            isAnswer: o.answer,
            title: o.title,
            titleOnChange: (e) => {
              const newQuestions = questions;
              newQuestions[i].options[oi].title = e.target.value;
              setQuestions([...newQuestions]);
            },
            currentIndex: oi,
            answerOnChange: (e) => {
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
            },
            showRemove: q.options.length > 2,
            remove: () => {
              const newQuestions = questions;
              if (newQuestions[i].options.length > 1) {
                newQuestions[i].options.splice(oi, 1);
                setQuestions([...newQuestions]);
              }
            },
          }))}
          addOption={() => {
            const newQuestions = questions;
            if (newQuestions[i].options.length < maxNumOptions) {
              newQuestions[i].options.push(defaultOption);
              setQuestions([...newQuestions]);
            }
          }}
          maxNumOptions={maxNumOptions}
          qIndex={i}
        />
      ))}
      <Button
        label="Question"
        icon={<AddCircle />}
        primary
        onClick={() => {
          setQuestions((q) => [...q, defaultQuestion]);
        }}
      />
    </Box>
  );
};
