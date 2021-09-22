import { LogglyTracker } from 'loggly-jslogger';

const logger = new LogglyTracker();

logger.push({ logglyKey: process.env.REACT_APP_LOGGLY_CUSTOM_KEY });

export default logger;
