import { User } from '../grpc/broadcast_pb';

export interface Game {
  id: number;
  name: string;
  created_by: string;
  is_started: boolean;
  is_over: boolean;
  code: string;
  host_code: string;
  created_at?: any;
  updated_at?: any;
}

export interface JoinedGame extends Game {
  is_host: boolean;
}

export interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D';
  title: string;
}
export interface Question {
  created_by: string;
  q: string;
  answer: string;
  options: QuestionOption[];
}

export interface Player {
  id: string;
  displayName: string;
  isHost: boolean;
}

export interface BroadcastMessage {
  time: number;
  newplayer: Player | null;
  removedplayer: Player | null;
  question: { id: number; q: string; optionsList: QuestionOption[] } | null;
  connected: boolean;
}
