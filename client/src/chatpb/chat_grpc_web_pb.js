/**
 * @fileoverview gRPC-Web generated client stub for kaiwa
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var message_pb = require('./message_pb.js')
const proto = {};
proto.kaiwa = require('./chat_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.kaiwa.ChatServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.kaiwa.ChatServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.kaiwa.ChatRequest,
 *   !proto.kaiwa.ChatResponse>}
 */
const methodDescriptor_ChatService_SendMessage = new grpc.web.MethodDescriptor(
  '/kaiwa.ChatService/SendMessage',
  grpc.web.MethodType.UNARY,
  proto.kaiwa.ChatRequest,
  proto.kaiwa.ChatResponse,
  /**
   * @param {!proto.kaiwa.ChatRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.kaiwa.ChatResponse.deserializeBinary
);


/**
 * @param {!proto.kaiwa.ChatRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.kaiwa.ChatResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.kaiwa.ChatResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.kaiwa.ChatServiceClient.prototype.sendMessage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/kaiwa.ChatService/SendMessage',
      request,
      metadata || {},
      methodDescriptor_ChatService_SendMessage,
      callback);
};


/**
 * @param {!proto.kaiwa.ChatRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.kaiwa.ChatResponse>}
 *     Promise that resolves to the response
 */
proto.kaiwa.ChatServicePromiseClient.prototype.sendMessage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/kaiwa.ChatService/SendMessage',
      request,
      metadata || {},
      methodDescriptor_ChatService_SendMessage);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.kaiwa.User,
 *   !proto.kaiwa.GetChatResponse>}
 */
const methodDescriptor_ChatService_GetMessage = new grpc.web.MethodDescriptor(
  '/kaiwa.ChatService/GetMessage',
  grpc.web.MethodType.UNARY,
  message_pb.User,
  proto.kaiwa.GetChatResponse,
  /**
   * @param {!proto.kaiwa.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.kaiwa.GetChatResponse.deserializeBinary
);


/**
 * @param {!proto.kaiwa.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.kaiwa.GetChatResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.kaiwa.GetChatResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.kaiwa.ChatServiceClient.prototype.getMessage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/kaiwa.ChatService/GetMessage',
      request,
      metadata || {},
      methodDescriptor_ChatService_GetMessage,
      callback);
};


/**
 * @param {!proto.kaiwa.User} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.kaiwa.GetChatResponse>}
 *     Promise that resolves to the response
 */
proto.kaiwa.ChatServicePromiseClient.prototype.getMessage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/kaiwa.ChatService/GetMessage',
      request,
      metadata || {},
      methodDescriptor_ChatService_GetMessage);
};


module.exports = proto.kaiwa;

