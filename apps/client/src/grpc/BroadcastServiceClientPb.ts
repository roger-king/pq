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

  methodInfoHeartbeat = new grpcWeb.AbstractClientBase.MethodInfo(
    broadcast_pb.HeartbeatResponse,
    (request: broadcast_pb.Connection) => {
      return request.serializeBinary();
    },
    broadcast_pb.HeartbeatResponse.deserializeBinary
  );

  heartbeat(
    request: broadcast_pb.Connection,
    metadata: grpcWeb.Metadata | null): Promise<broadcast_pb.HeartbeatResponse>;

  heartbeat(
    request: broadcast_pb.Connection,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: broadcast_pb.HeartbeatResponse) => void): grpcWeb.ClientReadableStream<broadcast_pb.HeartbeatResponse>;

  heartbeat(
    request: broadcast_pb.Connection,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: broadcast_pb.HeartbeatResponse) => void) {
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
    broadcast_pb.Message,
    (request: broadcast_pb.StartQuestion) => {
      return request.serializeBinary();
    },
    broadcast_pb.Message.deserializeBinary
  );

  start(
    request: broadcast_pb.StartQuestion,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/pq.streaming.games.timer.Broadcast/Start',
      request,
      metadata || {},
      this.methodInfoStart);
  }

  methodInfoGetPlayerList = new grpcWeb.AbstractClientBase.MethodInfo(
    broadcast_pb.PlayerListResponse,
    (request: broadcast_pb.PlayerlistRequest) => {
      return request.serializeBinary();
    },
    broadcast_pb.PlayerListResponse.deserializeBinary
  );

  getPlayerList(
    request: broadcast_pb.PlayerlistRequest,
    metadata: grpcWeb.Metadata | null): Promise<broadcast_pb.PlayerListResponse>;

  getPlayerList(
    request: broadcast_pb.PlayerlistRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: broadcast_pb.PlayerListResponse) => void): grpcWeb.ClientReadableStream<broadcast_pb.PlayerListResponse>;

  getPlayerList(
    request: broadcast_pb.PlayerlistRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: broadcast_pb.PlayerListResponse) => void) {
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

