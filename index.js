require( "dotenv").config();

const { createServer} = require( "http");
const express = require( "express");
const limiter = require( "./handlers/limiter");
const authMiddleware = require( "./handlers/auth");
const homeController = require( "./handlers/home");
const notifySmsController = require( "./handlers/notifySms");
const { notFound, errorHandler} = require( "./handlers/error");

const app = express();

app.use( "/static", express.static( "./public"));

app.use( authMiddleware);

app.get( "/", homeController);
app.get( "/notify-sms", limiter, notifySmsController);

app.use( notFound, errorHandler);

const server = createServer( app);

const port = process.env[ "PORT"] || 2020;

server.listen( port, () => {
	console.log( `Server Running @ ${ port}`);
});