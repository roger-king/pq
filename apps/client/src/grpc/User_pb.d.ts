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

