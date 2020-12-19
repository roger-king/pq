/**
 * @fileoverview gRPC-Web generated client stub for pq.streaming.games.timer
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as timer_pb from './timer_pb';


export class TimerClient {
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

  methodInfoStart = new grpcWeb.AbstractClientBase.MethodInfo(
    timer_pb.Countdown,
    (request: timer_pb.TimerRequest) => {
      return request.serializeBinary();
    },
    timer_pb.Countdown.deserializeBinary
  );

  start(
    request: timer_pb.TimerRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/pq.streaming.games.timer.Timer/Start',
      request,
      metadata || {},
      this.methodInfoStart);
  }

}

