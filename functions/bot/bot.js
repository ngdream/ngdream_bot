// MIT License

// Copyright (c) 2023 ngdream

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

//the main file of kiki



require('dotenv').config()

const { Telegraf, Markup } = require("telegraf")
const { MongoClient, ServerApiVersion } = require('mongodb');

const locales = require("./locales")


const Jszip = require('jszip')
const {fetchdata,makezip}=require('./functions')

//create a new bot
const bot = new Telegraf(process.env.BOT_TOKEN,{
  polling: true,
  handlerTimeout: 9_000_000
});



const startmakup = Markup.inlineKeyboard([
    Markup.button.url("contribute to the project", "https://github.com/ngdream/ngdream_bot"),
    Markup.button.url("join ngcodex community", "https://t.me/ngcodex"),

]);


//handle start command
bot.start(ctx => {
    try {
    
      return ctx.replyWithMarkdown(locales["start"][ctx.from.language_code],startmakup)
    } catch (e) {
      console.error("error in start action:", e)
        return ctx.reply("Error occured")
        
    }
})



// handle help command
bot.help(ctx => {

    try {
    
        return ctx.replyWithMarkdown(locales["help"][ctx.from.language_code])
    } catch (e) {
      console.error("error in start action:", e)
        return ctx.reply("Error occured")
        
    }
});

//handle donate command
bot.command("donate", ctx =>
{
    try {
    
        return ctx.replyWithMarkdown(locales["donate"][ctx.from.language_code])
    } catch (e) {
      console.error("error in start action:", e)
        return ctx.reply("Error occured")
        
    }
})


//handle share command
bot.command("share", async (ctx) => {
  if (process.env.NODE_ENV == 'development')
    console.log(`${ctx.from.first_name} ${ctx.from.last_name} ${ctx.from.language_code}`)
  else
  console.log(ctx)

  await bot.telegram.sendMessage(1623855984, "there is a new user")

  const [cmd, param] = (ctx.message.reply_to_message || ctx.message).text.split(' ')

  if (!param) {
    console.log("missing parameter")
    return await ctx.reply('Missing parameter');
        
  }
  try
  {
    const data = await fetchdata(param)
    await ctx.reply("a file will be send at soon ")
    if (data.type) {
  
       await ctx.replyWithDocument(
        {
          source: Buffer.from(data.content, "base64"),
          filename: data.name
                
        },
        {
          reply_to_message_id: ctx.message.message_id
        }
      ).catch(e => console.log(e))
    }
    else {
  
      zip = new Jszip()
      await makezip(zip, data)
      content = await zip.generateAsync({ type: "nodebuffer" })
      await ctx.replyWithDocument(
        {
          source: content,
          filename: param + ".zip",
          
        },
        {
        reply_to_message_id:ctx.message.message_id
      }).catch(e => console.log(e))
    }
            
    console.log("file is sent")
  }
  catch (e)
  {
    console.log(e)
     await ctx.reply(e)
  }

})          
     
    
//start bot
if (process.env.NODE_ENV == 'development')
{
  //start webhook if we are in production
  console.log('bot launched on production')
  exports.handler = async event => {
    try {
      await bot.handleUpdate(JSON.parse(event.body))
      return { statusCode: 200, body: "connection done" }
    } catch (e) {
      console.error("error in handler:", e)
      return { statusCode: 400, body: "" }
    }
  }
    }

else
{
    //start polling if we are in development
   bot.launch().then(console.log("bot launched"))
}