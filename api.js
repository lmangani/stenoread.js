#!/usr/bin/env node

const fastify = require('fastify')()
const path = require('path')
const exec = require('child_process').exec;

fastify.register(require('fastify-formbody'))

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/', // optional: default '/'
})

fastify.get('/', function (req, reply) {
  console.log('got req!')
  reply.sendFile('index.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
})

fastify.post('/query', (req, reply) => {
   if(!req.body || !req.body.query) { reply.send('missing query!'); return; }
   console.log('Running query:',req.body.query)
   const child = exec('node stenoread.js '+req.body.query,
   (error, stdout, stderr) => {
	console.log();
	if (stdout) { reply.send(stdout) }
	else { reply.send(error) }
   }
  );
})

fastify.listen(3000, '0.0.0.0', err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
