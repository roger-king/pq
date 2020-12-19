import * as jspb from 'google-protobuf'



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
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TimerRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TimerRequest): TimerRequest.AsObject;
  static serializeBinaryToWriter(message: TimerRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TimerRequest;
  static deserializeBinaryFromReader(message: TimerRequest, reader: jspb.BinaryReader): TimerRequest;
}

export namespace TimerRequest {
  export type AsObject = {
  }
}

