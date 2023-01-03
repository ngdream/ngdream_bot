const { Telegraf } = require("telegraf")


const bot = new Telegraf("5853131511:AAGkSPGXdb-E1bhEWoKf5AuiDQFdcSrCDZw");

bot.start(ctx => ctx.reply(`Deep link payload: ${ctx.startPayload}`));

bot.launch();