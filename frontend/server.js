// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        createServer((req, res) => {

            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            const parsedUrl = parse(req.url, true)
            const { pathname, query } = parsedUrl

            res.setHeader("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

            handle(req, res, parsedUrl)
        })
        .listen(process.env.PORT, err => {
            if (err) throw err

            console.log('> Loglevel : ' + process.env.LOGLEVEL || 'info')
            console.log('> Ready on http://localhost:' + process.env.PORT)
        })
    })