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

export class TimerRequest extends jspb.Message {
  getGameId(): string;
  setGameId(value: string): TimerRequest;

  getIsHost(): boolean;
  setIsHost(value: boolean): TimerRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TimerRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TimerRequest): TimerRequest.AsObject;
  static serializeBinaryToWriter(message: TimerRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TimerRequest;
  static deserializeBinaryFromReader(message: TimerRequest, reader: jspb.BinaryReader): TimerRequest;
}

export namespace TimerRequest {
  export type AsObject = {
    gameId: string,
    isHost: boolean,
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

export class Message extends jspb.Message {
  getTime(): number;
  setTime(value: number): Message;

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
  }
}

