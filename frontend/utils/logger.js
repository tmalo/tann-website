const pino = require('pino')

module.exports =pino({
    level: process.env.LOGLEVEL || 'info',
    prettyPrint: true
  })