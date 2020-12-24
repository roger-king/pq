import * as jspb from 'google-protobuf'



export class User extends jspb.Message {
  getId(): string;
  setId(value: string): User;

  getDisplayName(): string;
  setDisplayName(value: string): User;

  getIsHost(): boolean;
  setIsHost(value: boolean): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    id: string,
    displayName: string,
    isHost: boolean,
  }
}

export class Countdown extends jspb.Message {
  getTime(): number;
  setTime(value: number): Countdown;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Countdown.AsObject;
  static toObject(includeInstance: boolean, msg: Countdown): Countdown.AsObject;
  static serializeBinaryToWriter(message: Countdown, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Countdown;
  static deserializeBinaryFromReader(message: Countdown, reader: jspb.BinaryReader): Countdown;
}

export namespace Countdown {
  export type AsObject = {
    time: number,
  }
}

export class Connection extends jspb.Message {
  getGameId(): string;
  setGameId(value: string): Connection;

  getUser(): User | undefined;
  setUser(value?: User): Connection;
  hasUser(): boolean;
  clearUser(): Connection;

  getActive(): boolean;
  setActive(value: boolean): Connection;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Connection.AsObject;
  static toObject(includeInstance: boolean, msg: Connection): Connection.AsObject;
  static serializeBinaryToWriter(message: Connection, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Connection;
  static deserializeBinaryFromReader(message: Connection, reader: jspb.BinaryReader): Connection;
}

export namespace Connection {
  export type AsObject = {
    gameId: string,
    user?: User.AsObject,
    active: boolean,
  }
}

export class QuestionOption extends jspb.Message {
  getKey(): OptionKey;
  setKey(value: OptionKey): QuestionOption;

  getTitle(): string;
  setTitle(value: string): QuestionOption;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QuestionOption.AsObject;
  static toObject(includeInstance: boolean, msg: QuestionOption): QuestionOption.AsObject;
  static serializeBinaryToWriter(message: QuestionOption, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QuestionOption;
  static deserializeBinaryFromReader(message: QuestionOption, reader: jspb.BinaryReader): QuestionOption;
}

export namespace QuestionOption {
  export type AsObject = {
    key: OptionKey,
    title: string,
  }
}

export class Question extends jspb.Message {
  getId(): number;
  setId(value: number): Question;

  getQ(): string;
  setQ(value: string): Question;

  getOptionsList(): Array<QuestionOption>;
  setOptionsList(value: Array<QuestionOption>): Question;
  clearOptionsList(): Question;
  addOptions(value?: QuestionOption, index?: number): QuestionOption;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Question.AsObject;
  static toObject(includeInstance: boolean, msg: Question): Question.AsObject;
  static serializeBinaryToWriter(message: Question, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Question;
  static deserializeBinaryFromReader(message: Question, reader: jspb.BinaryReader): Question;
}

export namespace Question {
  export type AsObject = {
    id: number,
    q: string,
    optionsList: Array<QuestionOption.AsObject>,
  }
}

export class Message extends jspb.Message {
  getTime(): number;
  setTime(value: number): Message;

  getQuestion(): Question | undefined;
  setQuestion(value?: Question): Message;
  hasQuestion(): boolean;
  clearQuestion(): Message;

  getNewplayer(): User | undefined;
  setNewplayer(value?: User): Message;
  hasNewplayer(): boolean;
  clearNewplayer(): Message;

  getRemovedplayer(): User | undefined;
  setRemovedplayer(value?: User): Message;
  hasRemovedplayer(): boolean;
  clearRemovedplayer(): Message;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    time: number,
    question?: Question.AsObject,
    newplayer?: User.AsObject,
    removedplayer?: User.AsObject,
  }
}

export class StartQuestion extends jspb.Message {
  getQuestion(): Question | undefined;
  setQuestion(value?: Question): StartQuestion;
  hasQuestion(): boolean;
  clearQuestion(): StartQuestion;

  getIsHost(): boolean;
  setIsHost(value: boolean): StartQuestion;

  getGameId(): string;
  setGameId(value: string): StartQuestion;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartQuestion.AsObject;
  static toObject(includeInstance: boolean, msg: StartQuestion): StartQuestion.AsObject;
  static serializeBinaryToWriter(message: StartQuestion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartQuestion;
  static deserializeBinaryFromReader(message: StartQuestion, reader: jspb.BinaryReader): StartQuestion;
}

export namespace StartQuestion {
  export type AsObject = {
    question?: Question.AsObject,
    isHost: boolean,
    gameId: string,
  }
}

export class DisconnectResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DisconnectResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DisconnectResponse): DisconnectResponse.AsObject;
  static serializeBinaryToWriter(message: DisconnectResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DisconnectResponse;
  static deserializeBinaryFromReader(message: DisconnectResponse, reader: jspb.BinaryReader): DisconnectResponse;
}

export namespace DisconnectResponse {
  export type AsObject = {
  }
}

export class HeartbeatResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HeartbeatResponse.AsObject;
  static toObject(includeInstance: boolean, msg: HeartbeatResponse): HeartbeatResponse.AsObject;
  static serializeBinaryToWriter(message: HeartbeatResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HeartbeatResponse;
  static deserializeBinaryFromReader(message: HeartbeatResponse, reader: jspb.BinaryReader): HeartbeatResponse;
}

export namespace HeartbeatResponse {
  export type AsObject = {
  }
}

export class PlayerlistRequest extends jspb.Message {
  getGameId(): string;
  setGameId(value: string): PlayerlistRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PlayerlistRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PlayerlistRequest): PlayerlistRequest.AsObject;
  static serializeBinaryToWriter(message: PlayerlistRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PlayerlistRequest;
  static deserializeBinaryFromReader(message: PlayerlistRequest, reader: jspb.BinaryReader): PlayerlistRequest;
}

export namespace PlayerlistRequest {
  export type AsObject = {
    gameId: string,
  }
}

export class PlayerListResponse extends jspb.Message {
  getPlayersList(): Array<User>;
  setPlayersList(value: Array<User>): PlayerListResponse;
  clearPlayersList(): PlayerListResponse;
  addPlayers(value?: User, index?: number): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PlayerListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PlayerListResponse): PlayerListResponse.AsObject;
  static serializeBinaryToWriter(message: PlayerListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PlayerListResponse;
  static deserializeBinaryFromReader(message: PlayerListResponse, reader: jspb.BinaryReader): PlayerListResponse;
}

export namespace PlayerListResponse {
  export type AsObject = {
    playersList: Array<User.AsObject>,
  }
}

export enum OptionKey { 
  A = 0,
  B = 1,
  C = 2,
  D = 3,
}
