#!/usr/bin/env node
// Tshark RTP Parser

   var readline = require('readline');
   const regex = /\s+(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\s+(\d+)\s+ (\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\s+(\d+)\s+([0-9A-Za-z]{0,10})\s+ITU-T\s+([\w\d\.].*)\s+(\d+)\s+(\d+)\s+\((.*)\)\s+(\d+.\d+)\s+(\d+.\d+)\s+(\d+.\d+)\s+(.*)/gm; 
    let lineReader = readline.createInterface({
        input: process.stdin,
        //output: process.stdout
    });

    lineReader.prompt();
    lineReader.on('line', str => {

	while ((m = regex.exec(str)) !== null) {
	    // This is necessary to avoid infinite loops with zero-width matches
	    if (m.index === regex.lastIndex) {
	        regex.lastIndex++;
	    }

	    // Remove full string from Array
	    m.shift();
	    // console.log(JSON.stringify(m));
	    var rtp = {};
	    m.forEach(function(value){
		rtp.srcip = m[0];
		rtp.srcport = m[1];
		rtp.dstip = m[2];
		rtp.dstport = m[3];
		rtp.ssrc = m[4];
		rtp.payload = m[5].trim();
		rtp.pkts = m[6];
		rtp.lost = m[7];
		rtp.lost_perc = m[8];
		rtp.max_delta = m[9];
		rtp.max_jit = m[10];
		rtp.mean_jit = m[11];
		rtp.problems = m[12];
	    })
	    console.log(JSON.stringify(rtp));
	}
    });

    // lineReader.on('close', ()=>resolve(evalCards));


