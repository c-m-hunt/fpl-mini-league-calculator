import { calculateLeagueTable, printLeagueTable } from "./fpl/main.ts";
import { Config } from "./fpl/types.ts";

import Denomander from "https://deno.land/x/denomander/mod.ts";
import logger from "./logger.ts";

const defaultConfigFileName = "fpl-config.json";

const program = new Denomander({
  app_name: "Fantasy Premier League - Mini League Calculator",
  app_version: "1.0.0",
});

program
  .command("calc", "Calculate the league table")
  .option("-f --file-path", "Define the file path")
  .action(async ({ file }: { file: string }) => {
    logger.debug("Reading configuration file");
    const fileName = file || defaultConfigFileName;
    const config: Config = JSON.parse(Deno.readTextFileSync(fileName));
    logger.debug(`Configuration: ${JSON.stringify(config)}`);
    const leagueTable = await calculateLeagueTable(config);
    printLeagueTable(leagueTable);
  });

program
  .command("genconfig", "Generate a configuration file")
  .option("-f --file", "Define the file path")
  .action(({ file }: { file: string }) => {
    const config: Config = {
      weekNumbers: [21, 22, 23, 24],
      managerIds: [123, 456, 789],
    };

    const fileName = file || defaultConfigFileName;

    logger.debug(`Writing configuration file to  ${fileName}`);

    Deno.writeTextFileSync(fileName, JSON.stringify(config, null, 2));
  });

program.parse(Deno.args);
