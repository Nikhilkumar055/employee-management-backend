

import express from "express";
import { App } from "./app";
import { handleExceptions } from "exception-handler";
import { logger } from "./config/logger.config";
import * as http from 'http';

// import * as dotenv from "dotenv";
// dotenv.config({ path: ".env" });

const appInstance: App = new App();

// Setting up the port for the server
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 7000;
// Firing up the server
appInstance
  .setupDatabase()
  .then((_) => {
    const app: express.Application = appInstance.app;
    app.use(handleExceptions); // Exception Handling middleware
    app.listen(port, async () => {
      logger.debug(`Server is running ❤️ at localhost :${port}`);
 
    });
  })
  .catch((error) => {
    logger.error({ error });
    process.exit(1);
  });
  var WebSocketServer = require('websocket').server;
  // var http = require('http');
  
  var server = http.createServer(function(request, response) {
      console.log((new Date()) + ' Received request for ' + request.url);
      response.writeHead(404);
      response.end();
  });
  server.listen(9797, function() {
      console.log((new Date()) + ' Server is listening on 8787');
  });
  
  const wsServer = new WebSocketServer({
      httpServer: server,
      // You should not use autoAcceptConnections for production
      // applications, as it defeats all standard cross-origin protection
      // facilities built into the protocol and the browser.  You should
      // *always* verify the connection's origin and decide whether or not
      // to accept it.
      // autoAcceptConnections: false
  });
  
  // function originIsAllowed(origin) {
  //   // put logic here to detect whether the specified origin is allowed.
  //   return true;
  // }
  console.log(wsServer);
  wsServer.on('request', function(request) {
      // if (!originIsAllowed(request.origin)) {
      //   // Make sure we only accept requests from an allowed origin
      //   request.reject();
      //   console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      //   return;
      // }
      var connection = request.accept(null, request.origin);
      connection['client'] = request.resource.toString().replace('/', '');
      connection['origin'] = request.origin;
      console.log((new Date()) + ' Connection accepted.');
      connection.on('message', function(message) {
          if (message.type === 'utf8') {
              console.log('Received Message: ' + message.utf8Data);
              connection.sendUTF(message.utf8Data);
          }
          else if (message.type === 'binary') {
              console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
              connection.sendBytes(message.binaryData);
          }
      });
      connection.on('close', function(reasonCode, description) {
          console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
      });
  });
// const WebSocketServer = require('websocket').server;
// const SocketServer = http.createServer(function(request, response) {
//   console.log((new Date()) + ' Received request for ' + request.url);
//   response.writeHead(404);
//   response.end();
// });
// SocketServer.listen(9797 , function() {
//     console.log((new Date()) + ' Server is listening on port 9797');
//   });
// const wsServer = new WebSocketServer({
//   httpServer: SocketServer,
// });
// GatewayDeviceController.syncDashboard();
//   wsServer.on('request', function(request) {
//     let connection = request.accept(null, request.origin);
//   connection['client'] = request.resource.toString().replace('/', '');
//   connection['origin'] = request.origin;
//   if (WebHooks.WebSocketDashboardList.has(request.origin)) {
//     let businessName = WebHooks.WebSocketDashboardList.get(request.origin);
//     if (WebHooks.WebSocketConnectMap.has(businessName)) {
//       let listOfConnections = WebHooks.WebSocketConnectMap.get(businessName);
//       listOfConnections.push(connection);
//       WebHooks.WebSocketConnectMap.set(businessName, listOfConnections);
//     } else {
//       let listOfConnections = [];
//       listOfConnections.push(connection);
//       WebHooks.WebSocketConnectMap.set(businessName, listOfConnections);
//     }
//     let businessName2 = WebHooks.WebSocketPlantList.get(request.origin);
//     if (WebHooks.WebSocketConnectMap.has(businessName2)) {
//       let listOfConnections = WebHooks.WebSocketConnectMap.get(businessName2);
//       listOfConnections.push(connection);
//       WebHooks.WebSocketConnectMap.set(businessName2, listOfConnections);
//     } else {
//       let listOfConnections = [];
//       listOfConnections.push(connection);
//       WebHooks.WebSocketConnectMap.set(businessName2, listOfConnections);
//     }
//     if (!WebHooks.WebSocketClientConnections.has(connection.client)) {
//       WebHooks.WebSocketClientConnections.set(connection.client, connection);
//     }
//   }
//     if (!GatewayDeviceController.syncDashboard(request.origin)) {
//       // Make sure we only accept requests from an allowed origin
//       request.reject();
//       console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
//       return;
//     }
//   connection = request.accept('echo-protocol', request.origin);
//   console.log((new Date()) + ' Connection accepted.');
//   connection.on('message', function(message) {
//       if (message.type === 'utf8') {
//           console.log('Received Message: ' + message.utf8Data);
//           connection.sendUTF(message.utf8Data);
//       }
//       else if (message.type === 'binary') {
//           console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
//           connection.sendBytes(message.binaryData);
//       }
//   });
//   connection.on('close', function(reasonCode, description) {
//       console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
//   });
// });


// var WebSocketServer = require('websocket').server;
// var WebSocketClient = require('websocket').client;
// var WebSocketFrame  = require('websocket').frame;
// var WebSocketRouter = require('websocket').router;
// var W3CWebSocket = require('websocket').w3cwebsocket;
// var http = require('http');
// var server = http.createServer(function(request, response) {
//   console.log((new Date()) + ' Received request for ' + request.url);
//   response.writeHead(404);
//   response.end();
// });
// server.listen(9797, function() {
//   console.log((new Date()) + ' Server is listening on port 9797');
// });

// var wsServer = new WebSocketServer({
//   httpServer: server,
//   // You should not use autoAcceptConnections for production
//   // applications, as it defeats all standard cross-origin protection
//   // facilities built into the protocol and the browser.  You should
//   // *always* verify the connection's origin and decide whether or not
//   // to accept it.
//   autoAcceptConnections: false
// });

// function originIsAllowed(origin) {
// // put logic here to detect whether the specified origin is allowed.
// return true;
// }

// wsServer.on('request', function(request) {
//   if (!originIsAllowed(request.origin)) {
//     // Make sure we only accept requests from an allowed origin
//     request.reject();
//     console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
//     return;
//   }

  // // if (WebHooks.WebSocketTenantList.has(request.origin)) {
  // //   let businessName = WebHooks.WebSocketTenantList.get(request.origin);
  // //   if (WebHooks.WebSocketConnectMap.has(businessName)) {
  // //     let listOfConnections = WebHooks.WebSocketConnectMap.get(businessName);
  // //     listOfConnections.push(connection);
  // //     WebHooks.WebSocketConnectMap.set(businessName, listOfConnections);
  // //   } else {
  // //     let listOfConnections = [];
  // //     listOfConnections.push(connection);
  // //     WebHooks.WebSocketConnectMap.set(businessName, listOfConnections);
  // //   }
  // //   if (!WebHooks.WebSocketClientConnections.has(connection.client)) {
  // //     WebHooks.WebSocketClientConnections.set(connection.client, connection);
  // //   }
  // // }
  
  // var connection = request.accept('echo-protocol', request.origin);
  // console.log((new Date()) + ' Connection accepted.');
  // connection.on('message', function(message) {
  //     if (message.type === 'utf8') {
  //         console.log('Received Message: ' + message.utf8Data);
  //         connection.sendUTF(message.utf8Data);
  //     }
  //     else if (message.type === 'binary') {
  //         console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
  //         connection.sendBytes(message.binaryData);
  //     }
  // });
  // connection.on('close', function(reasonCode, description) {
  //     console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  // });
  // //  connection.on('message', function (message) {
  // //   console.log('Received Message:', message.utf8Data);
  // //   WebHooks.notifyClients(message.utf8Data, connection);
  // //   //connection.sendUTF('Hi this is WebSocket server!');
  // // });
  // // connection.on('close', function (reasonCode, description) {
  // //   WebHooks.findAndRemove(connection);
  // //   console.log('Client has disconnected.' + reasonCode + description);
  // // });
// });
