#!/usr/bin/env node

const fastify = require('fastify')()
const path = require('path')
const exec = require('child_process').execSync;

fastify.register(require('fastify-cors'), { 
  "Access-Control-Allow-Origin": "*"
})

fastify.register(require('fastify-formbody'))

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/'
})

fastify.get('/', function (req, reply) {
  if(req.query.query){
   console.log('Running GET query:',req.query.query)
   const cmd = './stenoread.js "'+req.query.query+'"';
   // await Query completion and return full response
	var stdout = exec(cmd);
	var ts = new Date().getTime();
	reply.header('Content-disposition', 'attachment; filename= steno_'+ts+".pcap");
        reply.type('application/octet-stream')
	if (stdout) { reply.send( stdout ) }
	else { console.error('failed query',req.query.query); reply.send(500) }
  } else {  
    reply.sendFile('index.html')
  }
})

fastify.post('/query', (req, reply) => {
   if(!req.body || !req.body.query) { reply.send('missing query!'); return; }
   console.log('Running POST query:',req.body.query)
   const cmd = './stenoread.js "'+req.body.query+'"';
   // await Query completion and return full response
	var stdout = exec(cmd);
	var ts = new Date().getTime();
	reply.header('Content-disposition', 'attachment; filename= steno_'+ts+".pcap");
        reply.type('application/octet-stream')
	if (stdout) { reply.send( stdout ) }
	else { console.error('failed query',req.body.query); reply.send(500) }

})

fastify.listen(3000, '0.0.0.0', err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
