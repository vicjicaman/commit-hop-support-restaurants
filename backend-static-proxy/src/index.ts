require("dotenv").config();
const path = require("path");
const express = require("express");
import serverless from "serverless-http";
const { createProxyMiddleware,responseInterceptor } = require('http-proxy-middleware');

let appReady : boolean = false;

const { spawn } = require('child_process');

const child = spawn('node', ['server.js'], { cwd:"./standalone" });

child.stdout.on('data', (data:any) => {

  const str = data.toString()

  if(str.indexOf("Listening on port") !== -1){
    appReady = true;
  }

  console.log(`stdout:\n${data}`);
});

child.stderr.on('data', (data:any) => {
  console.error(`stderr: ${data}`);
});

child.on('error', (error:any) => {
  console.error(`error: ${error.message}`);
});

child.on('close', (code:any) => {
  console.log(`child process exited with code ${code}`);
});

const cxt: any = {};

const SERVER_NEXTJS = "http://127.0.0.1:3000";

function requestHandler(req: any, event: any, context: any) {
  context.callbackWaitsForEmptyEventLoop = false;
  req.gateway = { context, event };
}

const app: any = express();

app.get("/health", function (req: any, res: any) {
  res.send("ok");
});

app.use('*', createProxyMiddleware({
  target: SERVER_NEXTJS,
  selfHandleResponse: true,
  onProxyRes: responseInterceptor(async (responseBuffer: any) => {
     return responseBuffer;
   })
 
}));


const serverHandler = serverless(app, {
  request: requestHandler
});


function wait(timeout:any) {
  return new Promise((resolve:any) => {
      setTimeout(() => {
          resolve();
      }, timeout);
  });
}

export const handler = async (event: any, context: any) => {

  while(!appReady){
    await wait(1)
  }

  const result = await serverHandler(event, context);
  return result;
};




 /*selfHandleResponse: true, // so that the onProxyRes takes care of sending the response
  onProxyRes: function(proxyRes, req, res) {
    var body = new Buffer('');
    proxyRes.on('data', function(data) {
      body = Buffer.concat([body, data]);
    });
    proxyRes.on('end', function() {
      body = body.toString();
      //console.log("res from proxied server:", body);

      res.set({
        'content-type': 'text/html; charset=utf-8',
        //'content-encoding': 'gzip'
      });
      //res.write(body);
      //res.end();

      res.end(body);
      //res.end("my response to cli");
    });
  }*/
  
  
  //onProxyRes: (proxyRes:any, req:any, res:any) => {
  //  console.log("PROXY RESPONSE")
  //  console.log(proxyRes)
  //  res.end()
  //},
  //changeOrigin: true