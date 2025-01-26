import { Config, LeagueTable } from "./types.ts";
import logger from "../logger.ts";
import { getHistoryApiResource, getManagerApiResponse } from "./api.ts";

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
    logger.debug(
      `Got details for manager ${manager.player_first_name} ${manager.player_last_name}`,
    );
    leagueTable.managers.push({
      id: manager.id,
      name: `${manager.player_first_name} ${manager.player_last_name}`,
      teamName: manager.name,
      seasonPoints: manager.summary_overall_points,
      miniLeaguePoints: 0,
      seasonRank: manager.summary_overall_rank,
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
    manager.miniLeaguePoints = manager.weeklyPoints.reduce((acc, points) =>
      acc + points
    );
  }

  // Sort the managers by total points
  leagueTable.managers.sort((a, b) => b.miniLeaguePoints - a.miniLeaguePoints);

  return leagueTable;
};

export const printLeagueTable = (leagueTable: LeagueTable) => {
  console.log(
    `Rank,Manager,Team,${
      leagueTable.weeks.map((wkNo) => `Week ${wkNo}`).join(",")
    },Mini League Total,Season Total,Season Rank`,
  );
  leagueTable.managers.forEach((manager, index) => {
    console.log(
      `${index + 1},"${manager.name}","${manager.teamName}",${
        manager.weeklyPoints.join(",")
      },${manager.miniLeaguePoints},${manager.seasonPoints},${manager.seasonRank}`,
    );
  });
};
