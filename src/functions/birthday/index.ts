import { handlerPath } from "@libs/handler-resolver";
import type { SettingsFunctions } from "@t/serverless.types";

const settings: SettingsFunctions = {
  name: "${self:service}-${self:provider.stage}",
  logRetentionInDays: 7,
  memorySize: 128,
  description: "Birthday Notification for: Discord",
  timeout: 10,
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      schedule: {
        rate: ["cron(0 12 * * ? *)"], // every day, 9:00 AM (UTC-03:00)
        input: {
          discord: {
            id: "${env:DISCORD_ID}",
            token: "${env:DISCORD_TOKEN}",
            baseUrl: "${self:custom.webhooks.discord.baseUrl}",
          },
        },
      },
    },
  ],
};

export default settings;
