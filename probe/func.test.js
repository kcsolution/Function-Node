describe('Probe', () => {

    beforeEach(() => {
        jest.resetModules() // clears the cache
    });

   // simply require func.js registers the function (input, context) with mock fdk
   const func = require('./func.js');
   const fdk = require('@fnproject/fdk');
   const input = { }
   const context = {
       "headers": {
           "Host": "localhost", "Content-Type": "application/json"
           
       }
       , _config: {'HOSTNAME':"localhost"}
   }
   const theFunction = fdk.functionCache() // get the function that was registered in func.js with the (mock) fdk handler
   jest.setTimeout(30000);
   test(`Test of func.js for number of requests`, async () => {
       const result = await theFunction(input, context)

       expect(result.totalRequestsHandledInInstance).toBeGreaterThan(0)
   })
})