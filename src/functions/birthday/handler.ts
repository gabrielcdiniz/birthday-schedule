import type { ScheduledEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import axios from "axios";

const birthday = async (input: ScheduledEvent<{ name: string }>) => {
  console.log("INPUT", { event: JSON.stringify(input) });

  const { DISCORD_ID, DISCORD_TOKEN, DISCORD_BASE_URL } = process.env;

  const content = "test";

  const { status } = await axios.post(
    `${DISCORD_BASE_URL}/${DISCORD_ID}/${DISCORD_TOKEN}`,
    { content }
  );

  console.log("STATUS", { status });

  return formatJSONResponse({
    message: "SUCCESSFULLY",
  });
};

export const main = middyfy(birthday);
