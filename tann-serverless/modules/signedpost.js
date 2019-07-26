var signer = require('nacl-signature');
var md5 =require('md5');

module.exports = function (options) {
    return function (req, res, next) {
        // Implement the middleware function based on the options object
        console.log('check signature...');
        
        //do we even have a signature
        if (!req.body.hasOwnProperty('data')) {
            res.status(403).json('Unknown sender');
            console.log('error: no data');
            return;
        }

        if (!req.body.hasOwnProperty('signature')) {
            res.status(403).json('Unknown sender');
            console.log('error: no signature');
            return;
        }
        
        const content = req.body.data;
        const signature = req.body.signature;
        const check = md5(JSON.stringify(content));
    
        try {
            // verifying a message, given its signature and the sender public key
            if (!signer.verify(check, signature, process.env.CLIENT_PUBLICKEY)){
                res.status(403).json('Invalid sender');
                console.log('error: invalid signature');
                return;
            }
          }
          catch(err) {
            res.status(500).json(err.message);
            return;
          }
        next()
      }    
}