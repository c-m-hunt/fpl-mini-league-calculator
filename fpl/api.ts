import { HistoryApiResponse, ManagerApiResponse } from "./types.ts";
import logger from "../logger.ts";

// Details on the APIs can be found https://www.oliverlooney.com/blogs/FPL-APIs-Explained

export const getHistoryApiResource = async (
  managerId: number,
): Promise<HistoryApiResponse> => {
  logger.debug(`Fetching history for manager ${managerId}`);
  const response = await fetch(
    `https://fantasy.premierleague.com/api/entry/${managerId}/history/`,
  );
  logger.debug(`Response: ${response.status}`);
  return response.json();
};

export const getManagerApiResponse = async (
  managerId: number,
): Promise<ManagerApiResponse> => {
  logger.debug(`Fetching manager ${managerId}`);
  const response = await fetch(
    `https://fantasy.premierleague.com/api/entry/${managerId}/`,
  );
  logger.debug(`Response: ${response.status}`);
  return response.json();
};
