import { Telegraf } from "telegraf";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);
console.log(bot);

bot.start(async (ctx) => {
  bot.start((ctx) => ctx.reply("Welcome"));
  const userId = ctx.from.id.toString();
  if (!userId) {
    ctx.reply("Could not retrieve your user ID.");
    return;
  }
  const frontendUrl = `${process.env.FRONTEND_URL}?userId=${userId}`;
  try {
    await axios.post(`${process.env.BACKEND_URL}/graphql`, {
      query: `
          mutation registerOrUpdateUser($userId: String!) {
            registerOrUpdateUser(userId: $userId) {
              id
              coins
            }
          }
        `,
      variables: { userId: userId },
    });
    ctx.reply("Welcome to TapMe! Use the web app to tap and earn coins.");
    await ctx.replyWithHTML(
      `Welcome to TapMe! <a href="${frontendUrl}">Start Tapping!</a>`
    );
  } catch (error) {
    console.error("Error during registration:", error);
    ctx.reply("An error occurred. Please try again later.");
  }
});

bot
  .launch()
  .then(() => {
    console.log("Bot is up and running!");
  })
  .catch((error) => {
    console.error("Error launching bot:", error);
  });
