import express from 'express';

const server = express();

server.get('/', (_req, res) => {
  res.append('Access-Control-Allow-Origin', '*');
  res.json({});
});

server.options('/', (_req, res) => {
  res.append('Access-Control-Allow-Origin', '*');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.json({});
});

module.exports = server;
