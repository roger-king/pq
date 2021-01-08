import * as jspb from 'google-protobuf'



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

export enum OptionKey { 
  A = 0,
  B = 1,
  C = 2,
  D = 3,
}
