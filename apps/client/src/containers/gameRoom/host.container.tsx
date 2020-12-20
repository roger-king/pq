import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, Text } from 'grommet';
import { Clipboard, Next, Play } from 'grommet-icons';
import { useMutation, useQuery } from 'react-query';
import Axios from 'axios';

import { capitalize } from '../../utils/format';
import { Game, Question } from '../../@types';
import { API_URL } from '../../constants';
import { QuestionList } from '../questions/list.container';

import { BroadcastClient } from '../../grpc/BroadcastServiceClientPb';
import { Connection, TimerRequest, User } from '../../grpc/broadcast_pb';

const client = new BroadcastClient('http://localhost:9001');
export interface HostViewProps {
  game: Game;
}

export const HostLobbyView: React.FC<HostViewProps> = ({ game }: HostViewProps) => {
  const { id, code, is_started, created_by } = game;

  const [start] = useMutation(async ({ hostCode }: { hostCode: string }) => {
    await Axios.put(`${API_URL}/games/${hostCode}/start`);
    // Update OnSuccess here
  });

  return (
    <Box fill>
      <Box gap="small" background="brand" align="center" justify="center" width="100%" height="95%">
        <Heading margin="small">Welcome, {capitalize(created_by)}</Heading>
        <Text size="1.5em">Share this code to have people join:</Text>
        <Box pad="small" direction="row">
          <Box background="light-5" fill pad="small" align="center" justify="center">
            <Text>
              <code>{code}</code>
            </Text>
          </Box>
          <Button icon={<Clipboard />} />
        </Box>
        <Button label="Start PQ" onClick={() => start({ hostCode: code })} primary size="large" />
      </Box>
      <Box align="center" justify="center">
        <Heading>Questions:</Heading>
        <QuestionList gameId={id} />
      </Box>
    </Box>
  );
};

export const HostInGameView: React.FC<HostViewProps> = ({ game }: HostViewProps) => {
  const { id, code, is_started, created_by } = game;
  const [connected, setConnected] = useState(false);
  const [timer, setTimer] = useState(60);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { data: questions, isLoading } = useQuery<{ data: Question[] }>(`game_${id}_questions`, async () => {
    const d = Axios.get(`${API_URL}/games/${id}/questions`);
    return d;
  });

  const connectToBroadcastServer = () => {
    const user = new User();
    user.setDisplayName(created_by);
    user.setId(created_by);
    user.setIsHost(true);

    const connection = new Connection();
    connection.setGameId(code);
    connection.setActive(true);
    connection.setUser(user);

    const stream = client.createStream(connection, {});
    stream.on('data', async function (response: any) {
      setConnected(true);
    });
  };

  const startTimer = () => {
    const timer = new TimerRequest();
    timer.setGameId(code);
    const stream = client.startTimer(timer, {});

    stream.on('data', function (response: any) {
      const { time } = response.toObject();
      setTimer(time);
    });
  };

  useEffect(() => {
    if (!connected) {
      connectToBroadcastServer();
    }
  }, []);

  if (questions) {
    const { q, options } = questions.data[currentQuestion];
    return (
      <Box fill background="brand" align="center" justify="center">
        {connected && 'CONNECTED'}
        <Heading color={timer <= 10 ? 'red' : 'white'}>{timer}</Heading>
        <Box width="80%" gap="medium">
          <Text alignSelf="start">
            Question {currentQuestion + 1}/{questions.data.length}
          </Text>
          <Box key={`${q}`} pad="large" border="all" height={{ min: '275px' }}>
            <Heading level="3">{q}</Heading>
            {options.map((o) => (
              <Box key={o.key} gap="small" direction="row" margin="small">
                <Text size="1.5em">
                  <b>{o.key}:</b>
                </Text>
                <Text size="1.5em">{o.title}</Text>
              </Box>
            ))}
          </Box>
          <Box direction="row" gap="medium" align="center" justify="center">
            {timer === 0 && !isComplete && (
              <Button
                label="Next"
                onClick={() => {
                  if (currentQuestion < questions.data.length - 1) {
                    setTimer(60);
                    setCurrentQuestion(currentQuestion + 1);
                  } else {
                    setIsComplete(true);
                  }
                }}
                primary
              />
            )}
            {timer === 0 && isComplete && <Button label="Finish" onClick={() => console.log('done')} primary />}
            {timer <= 60 && !isComplete && <Button label="Play" icon={<Play />} onClick={() => startTimer()} primary />}
          </Box>
        </Box>
      </Box>
    );
  }
  return <Box fill></Box>;
};
