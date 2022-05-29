const {
  createLogger,
  transports,
  format
} = require('winston');

const logger = createLogger({
  transports: [
    // new transports.Console({
    //   level: 'info'
    // }),
    new transports.File({
      filename: 'winston.info.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.json())
    })
  ]
});

module.exports = logger;