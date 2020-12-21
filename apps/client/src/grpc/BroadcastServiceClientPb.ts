/**
 * @fileoverview gRPC-Web generated client stub for pq.streaming.games.timer
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as broadcast_pb from './broadcast_pb';


export class BroadcastClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoCreateStream = new grpcWeb.AbstractClientBase.MethodInfo(
    broadcast_pb.Message,
    (request: broadcast_pb.Connection) => {
      return request.serializeBinary();
    },
    broadcast_pb.Message.deserializeBinary
  );

  createStream(
    request: broadcast_pb.Connection,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/pq.streaming.games.timer.Broadcast/CreateStream',
      request,
      metadata || {},
      this.methodInfoCreateStream);
  }

  methodInfoDisconnect = new grpcWeb.AbstractClientBase.MethodInfo(
    broadcast_pb.DisconnectResponse,
    (request: broadcast_pb.Connection) => {
      return request.serializeBinary();
    },
    broadcast_pb.DisconnectResponse.deserializeBinary
  );

  disconnect(
    request: broadcast_pb.Connection,
    metadata: grpcWeb.Metadata | null): Promise<broadcast_pb.DisconnectResponse>;

  disconnect(
    request: broadcast_pb.Connection,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: broadcast_pb.DisconnectResponse) => void): grpcWeb.ClientReadableStream<broadcast_pb.DisconnectResponse>;

  disconnect(
    request: broadcast_pb.Connection,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: broadcast_pb.DisconnectResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pq.streaming.games.timer.Broadcast/Disconnect',
        request,
        metadata || {},
        this.methodInfoDisconnect,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pq.streaming.games.timer.Broadcast/Disconnect',
    request,
    metadata || {},
    this.methodInfoDisconnect);
  }

  methodInfoStartTimer = new grpcWeb.AbstractClientBase.MethodInfo(
    broadcast_pb.Countdown,
    (request: broadcast_pb.TimerRequest) => {
      return request.serializeBinary();
    },
    broadcast_pb.Countdown.deserializeBinary
  );

  startTimer(
    request: broadcast_pb.TimerRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/pq.streaming.games.timer.Broadcast/StartTimer',
      request,
      metadata || {},
      this.methodInfoStartTimer);
  }

  methodInfoNextQuestion = new grpcWeb.AbstractClientBase.MethodInfo(
    broadcast_pb.NextQuestionResponse,
    (request: broadcast_pb.Question) => {
      return request.serializeBinary();
    },
    broadcast_pb.NextQuestionResponse.deserializeBinary
  );

  nextQuestion(
    request: broadcast_pb.Question,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/pq.streaming.games.timer.Broadcast/NextQuestion',
      request,
      metadata || {},
      this.methodInfoNextQuestion);
  }

}

