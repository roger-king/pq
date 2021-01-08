import React, { useEffect, useState } from 'react';
import { Box, Button, Text, Form, FormField } from 'grommet';
import { useMutation } from 'react-query';
import Axios from 'axios';

import { Game } from '../../@types';
import { Connection } from '../../grpc/Broadcast_pb';
import { User } from '../../grpc/User_pb';
import { AnswerCard } from '../../components/question/answerCard';
import { randomId } from '../../utils/random';
import Modal from '../../components/modal';
import { API_URL } from '../../constants';
import { useBroadcastStream } from '../../hooks/useBroadcastStream';
import { GameCard } from '../../components/card';

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
  const { time, connected, question } = useBroadcastStream(connection);
  const [display, setDisplay] = useState<string>('');
  const [answer, setAnswer] = useState<string | null>(null);
  // eslint-disable-next-line
  const { id, code, is_started } = game;

  const setupConnection = (userId: string) => {
    const user = new User();
    const userConnection = new Connection();

    user.setDisplayName(display);
    user.setId(userId);
    user.setIsHost(false);
    userConnection.setGameId(code);
    userConnection.setActive(true);
    userConnection.setUser(user);
    setConnection(userConnection);
  };

  useEffect(() => {
    const storedId = sessionStorage.getItem('pq_user_id');
    const displayName = sessionStorage.getItem('pq_display_name');
    if (displayName) {
      setDisplay(displayName);
    }

    if (display.length > 0 && !connected) {
      const rando = storedId || randomId();
      sessionStorage.setItem('pq_user_id', rando);
      setupConnection(rando);
    }

    if (!Number.isNaN(time) && time === 0) {
      const userId = sessionStorage.getItem('pq_user_id');
      if (userId && display.length > 0 && answer && question) {
        const k = answer.split('.')[0].trim();
        const abcd = AnswerKeyCard[Number(k)];
        submitAnswer({ gameId: id, questionId: question.id, userId, answer: abcd, displayName: display });
        setAnswer(null);
      } else {
        console.error('Failed to submit answer');
      }
    }
  }, [display, answer, time, question]);

  // TODO: adding is_started check for participants
  return (
    <Box fill align="center" justify="center">
      <GameCard time={time} connected={connected}>
        {question && time > 0 ? (
          <AnswerCard
            q={question.q}
            options={question.optionsList}
            selectedAnswer={answer}
            setSelectedAnswer={setAnswer}
          />
        ) : (
          <Text size="1.3em">
            {is_started ? `Waiting for your host to start the next question.` : `Host hasn't joined yet. Hang tight.`}
          </Text>
        )}
      </GameCard>
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
