import axios from "axios";
import {
  differenceInYears,
  getDate,
  getMonth,
  startOfDay,
  parseISO,
} from "date-fns";

import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { users } from "@data/users";
import { Webhook } from "@t/webhook.types";
import { UserModel } from "@t/user.types";

const today = startOfDay(new Date());

const checkBirthday = (user: UserModel) => {
  const birthday = parseISO(user.birthday);

  console.log("DATE", { birthday });

  const isBirthday =
    getDate(today) === getDate(birthday) &&
    getMonth(today) === getMonth(birthday);

  return isBirthday;
};

const filterBirthdays = (user: UserModel) => {
  return checkBirthday(user);
};

const mapBirthdays = ({ id, birthday }: UserModel) => ({
  id,
  birthday: parseISO(birthday),
});

const sendWebhook = (url: string, content: string) => {
  return axios.post(url, { content });
};

const handler = async (input: Webhook) => {
  try {
    const birthdays = users.filter(filterBirthdays).map(mapBirthdays);

    console.log({ birthdays, users, input });

    for (const { id, birthday } of birthdays) {
      const age = differenceInYears(today, birthday);
      const content = `@everyone Hoje tem aniversário ! Parabenize <@${id}> pelo seus ${age} anos`;

      const { discord } = input;
      const {
        id: DISCORD_ID,
        token: DISCORD_TOKEN,
        baseUrl: DISCORD_BASE_URL,
      } = discord;

      const webhookUrl = `${DISCORD_BASE_URL}/${DISCORD_ID}/${DISCORD_TOKEN}`;

      console.log({ input, webhookUrl });

      await sendWebhook(webhookUrl, content);
    }

    return formatJSONResponse({
      message: "successfull",
    });
  } catch (e) {
    console.error({ error: JSON.stringify(e) });

    return formatJSONResponse({
      message: "error",
    });
  }
};

export const main = middyfy(handler);
