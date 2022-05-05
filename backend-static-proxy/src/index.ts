require("dotenv").config();
const path = require("path");
const fs = require("fs");
import cors from "cors";
const express = require("express");
const process = require('process');
const bodyParser = require('body-parser');
import serverless from "serverless-http";
const { createProxyMiddleware,responseInterceptor } = require('http-proxy-middleware');
const { spawn } = require('child_process');

const NODE_ENV = process.env.NODE_ENV;

let appReady : boolean = NODE_ENV === "production" ? false : true;
console.log("ENV " + NODE_ENV)

if(NODE_ENV === "production"){
  const innerServerEnv = { ...process.env, NEXT_TELEMETRY_DISABLED: 1 };
  //console.log(JSON.stringify(innerServerEnv));
  const child = spawn('node', ['server.js'], { 
  env: innerServerEnv,
  cwd: "/var/task/standalone" //path.join(process.cwd(), "standalone" )
  });

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
}



const cxt: any = {};
const SERVER_NEXTJS = NODE_ENV === "production" ? "http://127.0.0.1:3000" : "http://172.19.0.1:4400";

function requestHandler(req: any, event: any, context: any) {
  context.callbackWaitsForEmptyEventLoop = false;
  req.gateway = { context, event };
}

const app: any = express();

//"http-proxy-middleware": "^2.0.6",
//"http-proxy-middleware": "3.0.0-beta.0",
app.get('*', createProxyMiddleware({
  target: SERVER_NEXTJS,
  selfHandleResponse: true,
  onProxyRes: responseInterceptor(async (responseBuffer: any, proxyRes: any, req: any, res: any) => {
      if(proxyRes.headers['content-type'] && proxyRes.headers['content-type'].startsWith("image/") ){
        return responseBuffer.toString('base64');
      }else{
        return responseBuffer;
      }
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

  const result :any = await serverHandler(event, context);
  if(result.headers['content-type'] && result.headers['content-type'].startsWith("image/") ){
    result.isBase64Encoded = true;
  }
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