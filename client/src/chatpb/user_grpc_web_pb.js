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
proto.kaiwa = require('./user_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.kaiwa.UserServiceClient =
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
proto.kaiwa.UserServicePromiseClient =
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
 *   !proto.kaiwa.UserRequest,
 *   !proto.kaiwa.UserResponse>}
 */
const methodDescriptor_UserService_UserLogin = new grpc.web.MethodDescriptor(
  '/kaiwa.UserService/UserLogin',
  grpc.web.MethodType.UNARY,
  proto.kaiwa.UserRequest,
  proto.kaiwa.UserResponse,
  /**
   * @param {!proto.kaiwa.UserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.kaiwa.UserResponse.deserializeBinary
);


/**
 * @param {!proto.kaiwa.UserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.kaiwa.UserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.kaiwa.UserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.kaiwa.UserServiceClient.prototype.userLogin =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/kaiwa.UserService/UserLogin',
      request,
      metadata || {},
      methodDescriptor_UserService_UserLogin,
      callback);
};


/**
 * @param {!proto.kaiwa.UserRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.kaiwa.UserResponse>}
 *     Promise that resolves to the response
 */
proto.kaiwa.UserServicePromiseClient.prototype.userLogin =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/kaiwa.UserService/UserLogin',
      request,
      metadata || {},
      methodDescriptor_UserService_UserLogin);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.kaiwa.UserRequest,
 *   !proto.kaiwa.UserResponse>}
 */
const methodDescriptor_UserService_UserSignUp = new grpc.web.MethodDescriptor(
  '/kaiwa.UserService/UserSignUp',
  grpc.web.MethodType.UNARY,
  proto.kaiwa.UserRequest,
  proto.kaiwa.UserResponse,
  /**
   * @param {!proto.kaiwa.UserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.kaiwa.UserResponse.deserializeBinary
);


/**
 * @param {!proto.kaiwa.UserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.kaiwa.UserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.kaiwa.UserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.kaiwa.UserServiceClient.prototype.userSignUp =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/kaiwa.UserService/UserSignUp',
      request,
      metadata || {},
      methodDescriptor_UserService_UserSignUp,
      callback);
};


/**
 * @param {!proto.kaiwa.UserRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.kaiwa.UserResponse>}
 *     Promise that resolves to the response
 */
proto.kaiwa.UserServicePromiseClient.prototype.userSignUp =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/kaiwa.UserService/UserSignUp',
      request,
      metadata || {},
      methodDescriptor_UserService_UserSignUp);
};


module.exports = proto.kaiwa;

