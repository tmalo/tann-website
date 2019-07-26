const express = require('express');
const cors = require('cors')
var Mailchimp = require('mailchimp-api-v3-next');
var check_signature = require('./signedpost.js');

const router = express.Router();

router.get('/', (request, response) => {
    console.log('GET /');
    response.send('Hello');
});

var mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);
router.post('/nl/user', cors(), check_signature(), async function (req, res){
    console.log('received data');

    console.log(req.body);

    console.log('received data is valid');

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