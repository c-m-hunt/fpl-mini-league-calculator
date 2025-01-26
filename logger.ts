import { createLogger, format, transports } from "winston";

const logLevel = "debug";

const logger = createLogger({
  level: logLevel,
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf((info: any) =>
      `${info.timestamp} ${info.level}: ${info.message}`
    ),
  ),
  transports: [new transports.Console()],
});

export default logger;
