import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Heading, Text } from 'grommet';
import { Clipboard, Copy, Play } from 'grommet-icons';
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
  EndGame,
} from '../../grpc/broadcast_pb';
import { useBroadcastClient } from '../../hooks/useGrpcClient';
import { randomId } from '../../utils/random';
import { PlayerList } from '../playerList/playerList';
import { useBroadcastStream } from '../../hooks/useBroadcastStream';
import { GameCard } from '../../components/card';

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
  const [connection, setConnection] = useState<Connection | null>(null);
  const { connected, newplayer, removedplayer } = useBroadcastStream(connection);
  const { id, code, created_by, host_code } = game; //eslint-disable-line
  const roomURL = `${window.location.origin}/pq/${code}`;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [timer, setTimer] = useState<number>(60);
  const [didCopy, setDidCopy] = useState<boolean>(false);

  const { data: questions } = useQuery<{ data: Question[] }>(`game_${id}_questions`, async () => {
    const d = Axios.get(`${API_URL}/games/${id}/questions`);
    return d;
  });

  const [endgame] = useMutation(
    async (gameCode: string) => {
      return Axios.put(`${API_URL}/games/${gameCode}/end`);
    },
    {
      onSuccess: () => {
        queryCache.invalidateQueries(`game_${host_code}`);
      },
    },
  );

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
      questionReq.setId(q.id);
      questionReq.setQ(q.q);
      questionReq.setOptionsList(options);
      req.setQuestion(questionReq);
    }
    const stream = client.start(req, {});

    stream.on('data', (response: any) => {
      const { time } = response.toObject();
      setTimer(time);
    });
  };

  const setupConnection = useCallback(() => {
    const storedId = sessionStorage.getItem('pq_user_id');
    const rando = storedId || randomId();
    const user = new User();
    const userConnection = new Connection();

    user.setDisplayName(created_by);
    user.setId(rando);
    user.setIsHost(true);
    userConnection.setGameId(code);
    userConnection.setActive(true);
    userConnection.setUser(user);
    setConnection(userConnection);
  }, [code, created_by]);

  const end = (gameCode: string) => {
    endgame(gameCode);
    const req = new EndGame();
    req.setGameId(gameCode);
    client.end(req, {});
    console.log('Redirect to leaderboard page.');
  };

  const startCopyText = () => {
    setDidCopy(true);

    setTimeout(() => {
      setDidCopy(false);
    }, 3000);
  };

  useEffect(() => {
    if (!connected) {
      setupConnection();
    }
  }, [connected, setupConnection]);

  if (questions) {
    const { q, options } = questions.data[currentQuestion];
    return (
      <Box fill align="center" justify="center" direction="row" gap="small">
        <Box gap="medium" height="50%" background="light-4" align="center" justify="start">
          <Heading level="4" margin="small">
            Players
          </Heading>
          <PlayerList gameId={code} newplayer={newplayer} removedplayer={removedplayer} />
        </Box>
        <GameCard
          time={timer}
          connected={connected}
          extendedFooter={
            <>
              <Text>
                Question {currentQuestion + 1}/{questions.data.length}
              </Text>
              <Box direction="row" align="center" justify="end" width="400px">
                <Text>{didCopy ? 'Copied!' : roomURL}</Text>
                <Button
                  icon={<Copy />}
                  onClick={() => {
                    navigator.clipboard.writeText(roomURL);
                    startCopyText();
                  }}
                />
              </Box>
            </>
          }
        >
          <Box>
            <Heading level="4" margin="small">
              {q}
            </Heading>
            {options.map((o) => (
              <Box key={o.key} gap="small" direction="row" margin="small">
                <Text size="1.2em">
                  <b>{o.key}:</b>
                </Text>
                <Text size="1.2em">{o.title}</Text>
              </Box>
            ))}
          </Box>
          <Box direction="row" gap="medium" align="center" justify="start">
            {timer === 0 && !isComplete && (
              <Button
                label="Next"
                onClick={() => {
                  if (currentQuestion < questions.data.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
                    setTimer(60);
                  } else {
                    setIsComplete(true);
                  }
                }}
                primary
              />
            )}
            {timer === 0 && isComplete && <Button label="Finish" onClick={() => end(code)} primary />}
            {timer <= 60 && !isComplete && <Button label="Play" icon={<Play />} onClick={() => start()} primary />}
          </Box>
        </GameCard>
      </Box>
    );
  }
  return <Box fill />;
};
