/**
 * @fileoverview gRPC-Web generated client stub for pq.streaming.games.timer
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as Broadcast_pb from './Broadcast_pb';


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
    Broadcast_pb.Message,
    (request: Broadcast_pb.Connection) => {
      return request.serializeBinary();
    },
    Broadcast_pb.Message.deserializeBinary
  );

  createStream(
    request: Broadcast_pb.Connection,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/pq.streaming.games.timer.Broadcast/CreateStream',
      request,
      metadata || {},
      this.methodInfoCreateStream);
  }

  methodInfoDisconnect = new grpcWeb.AbstractClientBase.MethodInfo(
    Broadcast_pb.DisconnectResponse,
    (request: Broadcast_pb.Connection) => {
      return request.serializeBinary();
    },
    Broadcast_pb.DisconnectResponse.deserializeBinary
  );

  disconnect(
    request: Broadcast_pb.Connection,
    metadata: grpcWeb.Metadata | null): Promise<Broadcast_pb.DisconnectResponse>;

  disconnect(
    request: Broadcast_pb.Connection,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Broadcast_pb.DisconnectResponse) => void): grpcWeb.ClientReadableStream<Broadcast_pb.DisconnectResponse>;

  disconnect(
    request: Broadcast_pb.Connection,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: Broadcast_pb.DisconnectResponse) => void) {
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

  methodInfoHeartbeat = new grpcWeb.AbstractClientBase.MethodInfo(
    Broadcast_pb.HeartbeatResponse,
    (request: Broadcast_pb.Connection) => {
      return request.serializeBinary();
    },
    Broadcast_pb.HeartbeatResponse.deserializeBinary
  );

  heartbeat(
    request: Broadcast_pb.Connection,
    metadata: grpcWeb.Metadata | null): Promise<Broadcast_pb.HeartbeatResponse>;

  heartbeat(
    request: Broadcast_pb.Connection,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Broadcast_pb.HeartbeatResponse) => void): grpcWeb.ClientReadableStream<Broadcast_pb.HeartbeatResponse>;

  heartbeat(
    request: Broadcast_pb.Connection,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: Broadcast_pb.HeartbeatResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pq.streaming.games.timer.Broadcast/Heartbeat',
        request,
        metadata || {},
        this.methodInfoHeartbeat,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pq.streaming.games.timer.Broadcast/Heartbeat',
    request,
    metadata || {},
    this.methodInfoHeartbeat);
  }

  methodInfoStart = new grpcWeb.AbstractClientBase.MethodInfo(
    Broadcast_pb.Message,
    (request: Broadcast_pb.StartQuestion) => {
      return request.serializeBinary();
    },
    Broadcast_pb.Message.deserializeBinary
  );

  start(
    request: Broadcast_pb.StartQuestion,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/pq.streaming.games.timer.Broadcast/Start',
      request,
      metadata || {},
      this.methodInfoStart);
  }

  methodInfoEnd = new grpcWeb.AbstractClientBase.MethodInfo(
    Broadcast_pb.Message,
    (request: Broadcast_pb.EndGame) => {
      return request.serializeBinary();
    },
    Broadcast_pb.Message.deserializeBinary
  );

  end(
    request: Broadcast_pb.EndGame,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/pq.streaming.games.timer.Broadcast/End',
      request,
      metadata || {},
      this.methodInfoEnd);
  }

  methodInfoGetPlayerList = new grpcWeb.AbstractClientBase.MethodInfo(
    Broadcast_pb.PlayerListResponse,
    (request: Broadcast_pb.PlayerlistRequest) => {
      return request.serializeBinary();
    },
    Broadcast_pb.PlayerListResponse.deserializeBinary
  );

  getPlayerList(
    request: Broadcast_pb.PlayerlistRequest,
    metadata: grpcWeb.Metadata | null): Promise<Broadcast_pb.PlayerListResponse>;

  getPlayerList(
    request: Broadcast_pb.PlayerlistRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Broadcast_pb.PlayerListResponse) => void): grpcWeb.ClientReadableStream<Broadcast_pb.PlayerListResponse>;

  getPlayerList(
    request: Broadcast_pb.PlayerlistRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: Broadcast_pb.PlayerListResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pq.streaming.games.timer.Broadcast/GetPlayerList',
        request,
        metadata || {},
        this.methodInfoGetPlayerList,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pq.streaming.games.timer.Broadcast/GetPlayerList',
    request,
    metadata || {},
    this.methodInfoGetPlayerList);
  }

}

