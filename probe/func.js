const fdk=require('@fnproject/fdk');

const startTimeOfInstance = new Date()
let   requestCount = 0
let   concurrentRequests = 0
let   hostname 
let   backgroundWorkCount = 0
let   mostRecentCall
let   backgroundJob

async function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); } 

async function backgroundWork() {
  backgroundWorkCount++
  console.log(`*-*-* ${backgroundWorkCount} reporting from the background, host ${hostname}, time since last request ${Math.floor((new Date() - mostRecentCall)/1000)} seconds`)
  backgroundJob = setTimeout( backgroundWork, 1000)
}

async function handleRequest(ctx) {
  console.log(`* processing request`)
  await sleep(3000)
  console.log(`** processing request`)
  await sleep(5000)
  console.log(`*** processing request`)
  await sleep(6000)
  // run background work every - after completing the request 
  backgroundWorkCount = 0
  clearTimeout(backgroundJob) 
  backgroundJob = setTimeout( backgroundWork, 500)
  return "Request Handling Complete, backgroundjob started"
}

fdk.handle(async function(input, ctx){
  requestCount++
  concurrentRequests++
  hostname = ctx._config['HOSTNAME']
  console.log(`Probe function - Host ${hostname}, instance lifetime ${new Date() - startTimeOfInstance}, handling request no ${requestCount} concurrent requests right now ${concurrentRequests}, time since last request ${new Date() - mostRecentCall}, backgroundWork: ${backgroundWorkCount}`)
  mostRecentCall = new Date()
  const result = await handleRequest(ctx)
  concurrentRequests--
  console.log(`**** done processing request`)
  return {'result':result, 'totalRequestsHandledInInstance':requestCount,'ctx': ctx}
})

process.on('exit', (code) => {
  console.log(`########   About to exit with code: ${code}`);
});



function exitHandler(options, exitCode) {
  console.log(`Function instance is closing down, after ${new Date() - startTimeOfInstance} milliseconds and handling ${requestCount} requests; , Hostname ${hostname}`)
  if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
process.on('SIGTERM', exitHandler.bind(null, {exit:true}));