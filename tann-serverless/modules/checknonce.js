var nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');
const dateformat = require('dateformat');
var Logger = require( './Logger');

function check_nonce(options) {
    return function (req, res, next) {
        // Implement the middleware function based on the options object
        Logger.info('check signature...');
        
        //do we even have a signature
        if (!req.body.hasOwnProperty('data')) {
            res.status(403).json('Unknown sender');
            Logger.info('error: no data');
            return;
        }

        if (!req.body.hasOwnProperty('nonce')) {
            res.status(403).json('Unknown sender');
            Logger.info('error: no signature');
            return;
        }
        
        const content = req.body.data;
        const data = req.body.nonce;
    
        let box = nacl.util.decodeBase64(data);
        let nonce = nacl.util.decodeBase64(process.env.BOX_NONCE);
        
        let clpbk = nacl.util.decodeBase64(process.env.BOX_PUBLICKEY);
        let svsck = nacl.util.decodeBase64(process.env.BOX_SECRETKEY);

        try {
            var value = nacl.util.encodeUTF8(nacl.box.open(box, nonce, clpbk, svsck));
            Logger.info(value);
            var nonceDate = new Date();
            nonceDate.setTime(value);
        
            var str = dateformat(nonceDate, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
            Logger.info(str);
        
            var now = new Date();
            var minus10 = new Date();
            minus10.setMinutes(now.getMinutes()-10);

            // verifying a message, given its signature and the sender public key
            if (nonceDate > Date.now() || nonceDate < minus10){
                res.status(403).json('Invalid sender');
                Logger.info('error: invalid signature');
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


module.exports = check_nonce;