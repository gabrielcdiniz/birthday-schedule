import type { ScheduledEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

const birthday = async (input: ScheduledEvent<{ name: string }>) => {
  console.log("INPUT", { event: JSON.stringify(input) });

  return formatJSONResponse({
    message: "SUCCESSFULLY",
  });
};

export const main = middyfy(birthday);
