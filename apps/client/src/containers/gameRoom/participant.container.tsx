import React, { useEffect, useState } from 'react';
import { Box, Button, Text, Form, FormField } from 'grommet';
import { Game } from '../../@types';
import { Connection, User } from '../../grpc/broadcast_pb';
import { useBroadcastClient } from '../../hooks/useGrpcClient';
import { ConnectionStatus } from '../../components/connectionStatus';
import { time } from 'console';
import { AnswerCard } from '../../components/question/answerCard';
import { randomId } from '../../utils/random';
import Modal from '../../components/modal';
import { useMutation } from 'react-query';
import Axios from 'axios';
import { API_URL } from '../../constants';
import { useBroadcastStream } from '../../hooks/useBroadcastStream';

export interface ParticipantViewProps {
  game: Game;
}

enum AnswerKeyCard {
  'A',
  'B',
  'C',
  'D',
}

export const ParticipantView: React.FC<ParticipantViewProps> = ({ game }: ParticipantViewProps) => {
  const [submitAnswer] = useMutation(
    async (vars: {
      gameId: number;
      questionId: number;
      userId: string;
      answer: string | null;
      displayName: string;
    }) => {
      return Axios.post(`${API_URL}/games/submit`, {
        game_id: vars.gameId,
        question_id: vars.questionId,
        answer: vars.answer,
        user_id: vars.userId,
        display_name: vars.displayName,
      });
    },
  );
  const [connection, setConnection] = useState<Connection | null>(null);
  const { time, question, connected } = useBroadcastStream(connection);
  const [display, setDisplay] = useState<string>('');
  const [answer, setAnswer] = useState<string | null>(null);
  const { id, code, is_started } = game; // eslint-disable

  const setupConnection = (id: string) => {
    const user = new User();
    const connection = new Connection();

    user.setDisplayName(display);
    user.setId(id);
    user.setIsHost(false);
    connection.setGameId(code);
    connection.setActive(true);
    connection.setUser(user);
    setConnection(connection);
    return connection;
  };

  useEffect(() => {
    const storedId = sessionStorage.getItem('pq_user_id');
    const displayName = sessionStorage.getItem('pq_display_name');
    if (displayName) {
      setDisplay(displayName);
    }

    if (display.length > 0 && !connected) {
      const rando = storedId ? storedId : randomId();
      sessionStorage.setItem('pq_user_id', rando);
      setupConnection(rando);
    }

    if (!isNaN(time) && time === 0) {
      const userId = sessionStorage.getItem('pq_user_id');
      if (userId && display.length > 0 && answer) {
        const k = answer.split('.')[0].trim();
        const abcd = AnswerKeyCard[Number(k)];
        submitAnswer({ gameId: id, questionId: question.id, userId: userId, answer: abcd, displayName: display });
        setAnswer(null);
      } else {
        console.error('Failed to submit answer');
      }
    }
  }, [display, answer, time, question]);

  // TODO: adding is_started check for participants
  return (
    <Box fill background="brand" align="center" justify="center">
      <ConnectionStatus connected={connected} />
      <Text>{time}</Text>
      {question && time > 0 ? (
        <AnswerCard
          q={question.q}
          options={question.optionsList}
          selectedAnswer={answer}
          setSelectedAnswer={setAnswer}
        />
      ) : (
        <Text>
          {' '}
          {is_started ? `Waiting for your host to start the next question.` : `Host hasn't joined yet. Hang tight.`}
        </Text>
      )}
      {display.length === 0 && (
        <Modal title="What's your team name?" onClose={() => console.log('closing')}>
          <Form
            onSubmit={(e: any) => {
              const { name }: { name: string } = e.value;
              setDisplay(name);
              sessionStorage.setItem('pq_display_name', name);
            }}
          >
            <Box fill gap="small" justify="center" align="center">
              <FormField name="name" placeholder="Team Name" />
              <Button label="Submit" type="submit" />
            </Box>
          </Form>
        </Modal>
      )}
    </Box>
  );
};
