import type { ScheduledEvent } from "aws-lambda";
import axios from "axios";

import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { users } from "@data/users";

const birthday = async (input: ScheduledEvent<{ name: string }>) => {
  console.log("INPUT", { event: JSON.stringify(input) });

  const { DISCORD_ID, DISCORD_TOKEN, DISCORD_BASE_URL } = process.env;

  const user = users.find((u) => u.name === "Dummy");

  const content = `@everyone Hoje tem aniversário ! Parabenize <@${user.id}>`;

  axios.post(`${DISCORD_BASE_URL}/${DISCORD_ID}/${DISCORD_TOKEN}`, { content });

  return formatJSONResponse({
    message: "",
  });
};

export const main = middyfy(birthday);
