import {
  Config,
  HistoryApiResponse,
  LeagueTable,
  ManagerApiResponse,
} from "./types.ts";
import logger from "../logger.ts";

const getHistoryApiResource = async (
  managerId: number,
): Promise<HistoryApiResponse> => {
  logger.debug(`Fetching history for manager ${managerId}`);
  const response = await fetch(
    `https://fantasy.premierleague.com/api/entry/${managerId}/history/`,
  );
  logger.debug(`Response: ${response.status}`);
  return response.json();
};

const getManagerApiResponse = async (
  managerId: number,
): Promise<ManagerApiResponse> => {
  logger.debug(`Fetching manager ${managerId}`);
  const response = await fetch(
    `https://fantasy.premierleague.com/api/entry/${managerId}/`,
  );
  logger.debug(`Response: ${response.status}`);
  return response.json();
};

export const calculateLeagueTable = async (
  config: Config,
): Promise<LeagueTable> => {
  const leagueTable: LeagueTable = {
    weeks: config.weekNumbers,
    managers: [],
  };

  for (const managerId of config.managerIds) {
    const manager = await getManagerApiResponse(managerId);
    const history = await getHistoryApiResource(managerId);
    leagueTable.managers.push({
      id: manager.id,
      name: `${manager.player_first_name} ${manager.player_last_name}`,
      teamName: manager.name,
      totalPoints: 0,
      totalRank: manager.summary_overall_rank,
      weeklyPoints: history.current.filter((week) =>
        config.weekNumbers.includes(week.event)
      )
        .map((week) => week.points),
      weeklyRank: history.current.filter((week) =>
        config.weekNumbers.includes(week.event)
      )
        .map((week) => week.rank),
    });
  }

  for (const manager of leagueTable.managers) {
    manager.totalPoints = manager.weeklyPoints.reduce((acc, points) =>
      acc + points
    );
  }

  // Sort the managers by total points
  leagueTable.managers.sort((a, b) => b.totalPoints - a.totalPoints);

  return leagueTable;
};

export const printLeagueTable = (leagueTable: LeagueTable) => {
  console.log(
    `Rank,Manager,Team,${
      leagueTable.weeks.map((wkNo) => `Week ${wkNo}`).join(",")
    },Total`,
  );
  leagueTable.managers.forEach((manager, index) => {
    console.log(
      `${index + 1},${manager.name},${manager.teamName},${
        manager.weeklyPoints.join(",")
      },${manager.totalPoints}`,
    );
  });
};
