#!/usr/bin/env node

const fs = require('fs');
const http2 = require('http2');
const Fastify = require('fastify');
const path = require('path')
const exec = require('child_process').execSync;

const args = require('minimist')(process.argv.slice(2));
const debug = args.debug || false;

const fastify = Fastify({
  logger: true,
  http2: false,
  ...( args.certPath && { https: {
    key: fs.readFileSync(`${args.certPath}/privkey.pem`),
    cert: fs.readFileSync(`${args.certPath}/fullchain.pem`)
  }})
});

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/'
})

fastify.register(require('fastify-formbody'))
fastify.register(require('fastify-cors'), {
  origin: '*'
})

fastify.get('/:query/pcap', function (req, reply) {
  if(req.params.query){
   if (debug) console.log('Running GET query:',req.params.query)
   const cmd = './stenoread.js "'+req.params.query+'"';
   // await Query completion and return full response
	const stdout = exec(cmd, {maxBuffer: 50 * 1024 * 1024});
	var ts = new Date().getTime();
	reply.header('Content-disposition', 'attachment; filename="steno_'+ts+".pcap");
        reply.type('application/octet-stream')
	if (stdout) { reply.send( stdout ) }
	else { console.error('failed query',req.params.query); reply.code(500) }
  } else {
    reply.sendFile('index.html')
  }
})

fastify.post('/query', (req, reply) => {
   if(!req.body) { reply.send('missing query!',req.body); return; }
   if (debug) console.log('Running POST query:',req.body)
   var query = parseQuery(req.body);
   console.log('Resolved query:',query)
   if(!query) return;
   const cmd = './stenoread.js "'+query+'"';
   // await Query completion and return full response
	const stdout = exec(cmd, {maxBuffer: 50 * 1024 * 1024});
	var ts = new Date().getTime();
	reply.header('Content-disposition', 'attachment; filename= steno_'+ts+".pcap");
        reply.type('application/octet-stream')
	if (stdout) { reply.send( stdout ) }
	else { console.error('failed query',req.body.query); reply.code(500) }

})

fastify.listen(args.port ||3000, args.host || '0.0.0.0', err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})


const parseQuery = function(q){
  if (!q.params || !q.timestamp) return false;
  var limit = q.limit || false;
  var rules = [];
  q.params.forEach(function(pair){
	var tmp;
	//if(pair.dst_ip) tmp = "((host "+pair.src_ip+" or host "+pair.dst_ip+") and (port "+pair.src_port+" or port "+pair.dst_port+"))";
	//else tmp = "(host "+pair.src_ip+" and port "+pair.src_port+")";
	if(pair.hash) tmp = "(hash "+pair.hash+")";
	else if(pair.dst_ip) tmp = "("+pair.proto+" and ((host "+pair.src_ip+" and port "+pair.src_port+") and (host "+pair.dst_ip+" and port "+pair.dst_port+")))";
	else tmp = "("+pair.proto+" and host "+pair.src_ip+" and port "+pair.src_port+")";

	rules.push(tmp);
  });
  var query = rules.join(" or ") + " and (after "+new Date(q.timestamp.from).toISOString()+" and before "+ new Date(q.timestamp.to).toISOString() +")";
  return query;
}
