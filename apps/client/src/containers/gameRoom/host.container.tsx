import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, Text } from 'grommet';
import { Clipboard, Play } from 'grommet-icons';
import { useMutation, useQuery } from 'react-query';
import Axios from 'axios';

import { capitalize } from '../../utils/format';
import { Game, Question } from '../../@types';
import { queryCache } from '../../layouts';
import { API_URL } from '../../constants';
import { QuestionList } from '../questions/list.container';

import {
  Connection,
  StartQuestion,
  User,
  Question as QuestionRequest,
  QuestionOption,
  OptionKey,
} from '../../grpc/broadcast_pb';
import { useBroadcastClient } from '../../hooks/useGrpcClient';
import { ConnectionStatus } from '../../components/connectionStatus';
import { randomId } from '../../utils/random';

export interface HostViewProps {
  game: Game;
}

export const HostLobbyView: React.FC<HostViewProps> = ({ game }: HostViewProps) => {
  const { id, code, created_by, host_code } = game; // eslint-disable-line
  const [start] = useMutation(
    async ({ hostCode }: { hostCode: string }) => {
      await Axios.put(`${API_URL}/games/${hostCode}/start`);
    },
    {
      onSuccess: () => {
        console.log('Success');
        queryCache.invalidateQueries(`game_${host_code}`);
      },
    },
  );

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
        <Button label="Start PQ" onClick={() => start({ hostCode: host_code })} primary size="large" />
      </Box>
      <Box align="center" justify="center">
        <Heading>Questions:</Heading>
        <QuestionList gameId={id} />
      </Box>
    </Box>
  );
};

export const HostInGameView: React.FC<HostViewProps> = ({ game }: HostViewProps) => {
  const client = useBroadcastClient();
  const { id, code, created_by } = game; //eslint-disable-line
  const [timer, setTimer] = useState(60);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { data: questions } = useQuery<{ data: Question[] }>(`game_${id}_questions`, async () => {
    const d = Axios.get(`${API_URL}/games/${id}/questions`);
    return d;
  });
  const [connected, setConnected] = useState<boolean>(false);
  const user = new User();
  const connection = new Connection();

  const connectToBroadcastServer = () => {
    const stream = client.createStream(connection, {});
    stream.on('data', function () {
      setConnected(true);
    });
  };

  const start = () => {
    const q = questions && questions.data[currentQuestion];
    const req = new StartQuestion();
    if (q) {
      req.setGameId(code);
      req.setIsHost(true);

      const questionReq = new QuestionRequest();
      const options = q.options.map((o) => {
        const questionOptions = new QuestionOption();
        questionOptions.setKey(OptionKey[o.key]);
        questionOptions.setTitle(o.title);
        return questionOptions;
      });
      questionReq.setQ(q.q);
      questionReq.setOptionsList(options);
      req.setQuestion(questionReq);
    }
    const stream = client.start(req, {});

    stream.on('data', function (response: any) {
      const { time } = response.toObject();
      setTimer(time);
    });
  };

  const heartBeat = () => {
    setInterval(() => {
      console.log('sending heartbeat');
      client.heartbeat(connection, {});
    }, 3000);
  };

  useEffect(() => {
    user.setDisplayName(created_by);
    const rando = randomId();
    user.setId(rando);
    user.setIsHost(true);

    connection.setGameId(code);
    connection.setActive(true);
    connection.setUser(user);

    if (!connected) {
      connectToBroadcastServer();
      heartBeat();
    }
  }, []);

  if (questions) {
    const { q, options } = questions.data[currentQuestion];
    return (
      <Box fill background="brand" align="center" justify="center">
        <ConnectionStatus connected={connected} />
        <Heading color={timer <= 10 ? 'red' : 'white'}>{timer}</Heading>
        {code}
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
            {timer <= 60 && !isComplete && <Button label="Play" icon={<Play />} onClick={() => start()} primary />}
          </Box>
        </Box>
      </Box>
    );
  }
  return <Box fill />;
};
