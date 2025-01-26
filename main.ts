import { calculateLeagueTable, printLeagueTable } from "./fpl/main.ts";
import { Config } from "./fpl/types.ts";

const config: Config = {
  managerIds: [
    7020707,
    1015529,
    5788133,
    60035,
    257376,
    4117527,
    1671335,
    5004064,
    4835371,
    3514125,
    204549,
    2259109,
    1700731,
    3835276,
    7499281,
    7737612,
    1092160,
    3708902,
    3259105,
  ],
  weekNumbers: [21, 22, 23, 24],
};

const leagueTable = await calculateLeagueTable(config);

printLeagueTable(leagueTable);
