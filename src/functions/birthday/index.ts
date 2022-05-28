import { handlerPath } from "@libs/handler-resolver";
import type { SettingsFunctions } from "@t/serverless.types";

const settings: SettingsFunctions = {
  memorySize: 1024,
  timeout: 10,
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      schedule: {
        rate: ["cron(0 9 * * ? *)"],
        input: {
          discord: {
            id: "${env:DISCORD_ID}",
            token: "${env:DISCORD_TOKEN}",
            baseUrl: "${self:custom.webhooks.discord.baseUrl}"
          },
        },
      },
    },
  ],
};

export default settings;
