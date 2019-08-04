const express = require('express');
const cors = require('cors')
var Mailchimp = require('mailchimp-api-v3-next');
var check_nonce = require('./checknonce');
const dateformat = require('dateformat');

var nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');
var Logger = require( './Logger');

const router = express.Router();

router.get('/', (request, response) => {
    Logger.info('GET /');
    response.send('Hello');
});


router.post('/validate', function (req, res){
    Logger.info('POST /validate');

    Logger.info(req.body);
    var data = req.body.data;
    Logger.debug(data);

    let box = nacl.util.decodeBase64(data);
    let nonce = nacl.util.decodeBase64(process.env.BOX_NONCE);
    
    let clpbk = nacl.util.decodeBase64(process.env.BOX_PUBLICKEY);
    let svsck = nacl.util.decodeBase64(process.env.BOX_SECRETKEY);

    var value = nacl.util.encodeUTF8(nacl.box.open(box, nonce, clpbk, svsck));
    Logger.info(value);
    var nonceDate = new Date();
    nonceDate.setTime(value);

    var str = dateformat(nonceDate, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
    Logger.info(str);

    var now = new Date();
    var minus10 = new Date();
    minus10.setMinutes(now.getMinutes()-10);

    if (nonceDate > Date.now() || nonceDate < minus10) {
        res.status(403).json({
            result: 'bad request'
        });
        return;
    } 
    
    res.status(200).json({
        result: 'success'
    });
    
});

router.get('/secret', (request, response) => {
    Logger.info('GET /secret');
    var nonceDate = new Date();
    //nonceDate.setMinutes(nonceDate.getMinutes()+10);
    var str = dateformat(nonceDate, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
    Logger.debug(str);

    let message = nonceDate.getTime().toString();
    Logger.info(message);

    let nonce = nacl.util.decodeBase64(process.env.BOX_NONCE);
    
    let clpbk = nacl.util.decodeBase64(process.env.BOX_PUBLICKEY);
    let svsck = nacl.util.decodeBase64(process.env.BOX_SECRETKEY);

    var uMessage = nacl.util.decodeUTF8(message);

    var data = nacl.util.encodeBase64(nacl.box(uMessage, nonce, clpbk, svsck));
    Logger.info(data);

    response.status(200).json({
        result: 'success',
        results: {nonce: data}
    });
});

var mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);
router.post('/nl/user', cors(), check_nonce(), async function (req, res){
    Logger.info('received data');

    Logger.info(req.body);

    Logger.info('received data is valid');

    var data = req.body.data;
    res.status(200).json({
        result: 'success',
        status: 'subscribed',
        results: {}
    });

    // var path = `/lists/${process.env.MAILCHIMP_LIST_ID}/members/`;

    // mailchimp.post(path, data)
    //     .then(results => {
    //        res.json({
    //            result: 'success',
    //            status: results.status,
    //            results: results
    //         });
    //     })
    //     .catch( err=> {
    //         res.status(500).json(err)
    //     });
});

module.exports = router;