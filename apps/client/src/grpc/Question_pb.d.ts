import * as jspb from 'google-protobuf'

import * as QuestionOption_pb from './QuestionOption_pb';


export class Question extends jspb.Message {
  getId(): number;
  setId(value: number): Question;

  getQ(): string;
  setQ(value: string): Question;

  getOptionsList(): Array<QuestionOption_pb.QuestionOption>;
  setOptionsList(value: Array<QuestionOption_pb.QuestionOption>): Question;
  clearOptionsList(): Question;
  addOptions(value?: QuestionOption_pb.QuestionOption, index?: number): QuestionOption_pb.QuestionOption;

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
    optionsList: Array<QuestionOption_pb.QuestionOption.AsObject>,
  }
}

