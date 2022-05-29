const fs = require('fs').promises;
const path = require('path');

const {format} = require('date-fns');

const fileName = path.join('log.info');
const logEvents = async (uuid, msg) => {
  try {
    const time = format(new Date(), 'yyyy-MM-dd\tss:mm:hh');
    const newMgs = `${time} :: ${uuid} :: ${msg}\n`;
    fs.appendFile(fileName, newMgs);
  } catch (error) {
    console.error(error);
  }
};

module.exports = logEvents;