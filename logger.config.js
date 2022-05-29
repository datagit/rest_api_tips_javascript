const {
  createLogger,
  transports,
  format
} = require('winston');

require('winston-mongodb');

const logger = createLogger({
  transports: [
    // new transports.Console({
    //   level: 'info'
    // }),
    new transports.File({
      filename: 'winston.info.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.json())
    }),
    new transports.MongoDB({
      level: 'error',
      db: process.env.MONGODB_URI,
      options: { useUnifiedTopology: true },
      collection: 'winston',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ]
});

module.exports = logger;