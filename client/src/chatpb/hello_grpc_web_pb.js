/**
 * @fileoverview gRPC-Web generated client stub for chat
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.chat = require('./hello_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.chat.ChatClient =
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
proto.chat.ChatPromiseClient =
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
 *   !proto.chat.ChatRequest,
 *   !proto.chat.ChatRequest>}
 */
const methodDescriptor_Chat_SendMessage = new grpc.web.MethodDescriptor(
  '/chat.Chat/SendMessage',
  grpc.web.MethodType.UNARY,
  proto.chat.ChatRequest,
  proto.chat.ChatRequest,
  /**
   * @param {!proto.chat.ChatRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.chat.ChatRequest.deserializeBinary
);


/**
 * @param {!proto.chat.ChatRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.chat.ChatRequest)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.chat.ChatRequest>|undefined}
 *     The XHR Node Readable Stream
 */
proto.chat.ChatClient.prototype.sendMessage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/chat.Chat/SendMessage',
      request,
      metadata || {},
      methodDescriptor_Chat_SendMessage,
      callback);
};


/**
 * @param {!proto.chat.ChatRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.chat.ChatRequest>}
 *     Promise that resolves to the response
 */
proto.chat.ChatPromiseClient.prototype.sendMessage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/chat.Chat/SendMessage',
      request,
      metadata || {},
      methodDescriptor_Chat_SendMessage);
};


module.exports = proto.chat;

