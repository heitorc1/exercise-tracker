import { createLogger, format, transports } from "winston";
import type { Logger as WinstonLogger } from "winston";

const { combine, timestamp, json } = format;

export const logger = (service: string) => {
  return createLogger({
    level: "info",
    format: combine(timestamp(), json()),
    defaultMeta: { service },
    transports: [new transports.Console()],
  });
};

export type Logger = WinstonLogger;
