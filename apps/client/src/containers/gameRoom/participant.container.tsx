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

export interface ParticipantViewProps {
  game: Game;
}

export const ParticipantView: React.FC<ParticipantViewProps> = ({ game }: ParticipantViewProps) => {
  const client = useBroadcastClient();
  const [connected, setConnected] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const [display, setDisplay] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<any | null>(null);

  const { created_by, code, is_started } = game; // eslint-disable
  const user = new User();
  const connection = new Connection();

  const connectToBroadcastServer = () => {
    const stream = client.createStream(connection, {});
    stream.on('data', async function (response: any) {
      console.log(response.toObject());
      const { time, question } = response.toObject();
      if ((timer <= 60 && time > 0) || (timer === 1 && time === 0)) {
        setTimer(time);
      }

      if (question) {
        setCurrentQuestion(question);
        console.log(question);
      }
      setConnected(true);
    });
  };

  const heartBeat = () => {
    setInterval(() => {
      console.log('sending heartbeat');
      client.heartbeat(connection, {});
    }, 3000);
  };

  useEffect(() => {
    const storedId = sessionStorage.getItem('pq_user_id');
    const rando = storedId ? storedId : randomId();
    const displayName = sessionStorage.getItem('pq_display_name');
    if (displayName) {
      setDisplay(displayName);
    }

    if (display.length > 0) {
      user.setDisplayName(display);
      user.setId(rando);
      user.setIsHost(false);
      connection.setGameId(code);
      connection.setActive(true);
      connection.setUser(user);
      if (!connected) {
        connectToBroadcastServer();
        heartBeat();
      }
    }

    return () => {
      console.log('disconnecting');
      client.disconnect(connection, {});

      if (!storedId) {
        sessionStorage.setItem('pq_user_id', rando);
      }
    };
  }, [display]);

  // TODO: adding is_started check for participants
  return (
    <Box fill background="brand" align="center" justify="center">
      <ConnectionStatus connected={connected} />
      <Text>{timer}</Text>
      {currentQuestion ? (
        <AnswerCard q={currentQuestion.q} options={currentQuestion.optionsList} />
      ) : (
        <Text> Waiting for your host to start the next question.</Text>
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
