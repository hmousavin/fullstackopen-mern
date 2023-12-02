const logger = require('./utils/logger');
const config = require('./utils/config');
const mongoose = require('mongoose');

const connect = () => {
  mongoose
    .connect(config.MONGODB_URI, {})
    .then(() => {
      logger.info(`connected to db: ${config.WORKING_MODE} configuration`);
    })
    .catch((error) => {
      logger.error(`${config.WORKING_MODE} configuration failed:`, error);
    });
};

const disconnect = () => {
  mongoose
    .disconnect()
    .then(() => {
      logger.info(`disconnected`);
    })
    .catch((error) => {
      logger.error(`${config.WORKING_MODE} configuration failed:`, error);
    });
};

module.exports = { connect, disconnect };
