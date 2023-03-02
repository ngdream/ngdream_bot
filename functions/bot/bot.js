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

const { session } = require('telegraf-session-mongodb');


const locales = require("./locales")

const Jszip = require('jszip')
const {showuserinfo}=require("./middleware")


const {fetchdata,makezip, createrepo,connecteduserfollowers,connecteduserfollowing,deleterepo,followers,following}=require('./functions')

//create a new bot
const bot = new Telegraf(process.env.BOT_TOKEN,{
  polling: true,
  handlerTimeout: 9_000_000
});


const startmakup = Markup.inlineKeyboard([
    Markup.button.url("contribute to the project", "https://github.com/ngdream/ngdream_bot"),
    Markup.button.url("join ngdream channel", "https://t.me/ngdreamnew"),

]);

const connectmakup = Markup.inlineKeyboard([
  Markup.button.url("login", `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=admin repo user workflow delete_repo project gist codespace&state=19052003`),

]);



var initialize = async () => {
  console.log(process.env.MONGODB_URI)
  const db = (await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })).db("test");
console.log("connection done")
  bot.use(session(db));
  console.log("test")
  bot.use(showuserinfo)
 

  //handle start command
  bot.start(ctx => {
    try {
      if (ctx.startPayload) {
        ctx.session.token = ctx.startPayload;
        return ctx.reply(`thanks for login`)
      }

      return ctx.replyWithMarkdown(locales["start"][ctx.from.language_code], startmakup)
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

  //command to show follower
  bot.command("maintenance", async (ctx) => {

    const [cmd, param1] = (ctx.message.reply_to_message || ctx.message).text.split(' ')

    if (ctx.chat.id == 1623855984) {
      if (!param1) {
        console.log("missing parameter")
        await ctx.reply("missing parameter")
      }
      else {

        let docs = db.collection("sessions").find()

        docs.forEach(async (i) => {
          let time = param1.replace("h", " hrs").replace("m", " min")
          try {
            await ctx.telegram.sendMessage(i.data.id, locales["maintenance"][ctx.from.language_code].replace("/time/", time))
          }
          catch (e) {
            console.log(`cannot send to this user ${e}`)
          }
        })
        
      }

    }
    else {
      ctx.reply(locales["denied"][ctx.from.language_code])
    }
  })

  //connect to your github account
  bot.command("connect", ctx => {
    try {
 
      return ctx.replyWithMarkdown(locales["connect"][ctx.from.language_code], connectmakup)
    } catch (e) {
      console.error("error in connect action:", e)
      return ctx.reply("Error occured")
        
    }
  })

  //handle donate command
  bot.command("donate", ctx => {
    try {
    
      return ctx.replyWithMarkdown(locales["donate"][ctx.from.language_code])
    } catch (e) {
      console.error("error in start action:", e)
      return ctx.reply("Error occured")
        
    }
  })


  //handle share command
  bot.command("share", async (ctx) => {



    const [cmd, param] = (ctx.message.reply_to_message || ctx.message).text.split(' ')

    if (!param) {
      console.log("missing parameter")
      return await ctx.reply('Missing parameter');
        
    }
    try {
      const data = await fetchdata(param)
      await ctx.reply("a file will be send at soon ")
      if (data.type) {
  
        let doc = await ctx.replyWithDocument(
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
        let c = await ctx.replyWithDocument(
          {
            source: content,
            filename: param + ".zip",
          
          },
          {
            reply_to_message_id: ctx.message.message_id
          }).catch(e => console.log(e))
        console.log(c)
      }
            
      console.log("file is sent")
    }
    catch (e) {
      console.log(e)
      await ctx.reply(e)
    }

  })
     


  //handle share command
  bot.command("create", async (ctx) => {

    const [cmd, param1] = (ctx.message.reply_to_message || ctx.message).text.split(' ')
  
    if (!param1) {
      console.log("missing parameter")
    }
    else {
      await createrepo(ctx, param1)
    }

  })
  
  
  //handle share command
  bot.command("delete", async (ctx) => {


    const [cmd, param1, param2] = (ctx.message.reply_to_message || ctx.message).text.split(' ')

    if (!param1 && !param2) {
      console.log("missing parameter")
      await ctx.reply("missing parameter")
    }
    else if (param1) {
      await deleterepo(ctx, param1)
    }
    else {
      //coming soon
    }
  })

  //command to show follower
  bot.command("followers", async (ctx) => {

    const [cmd, param1] = (ctx.message.reply_to_message || ctx.message).text.split(' ')

    if (!param1) {
       await connecteduserfollowers(ctx)

    }
    else {
       await followers(ctx, param1)
    }
  })


  //command to show following
  bot.command("following", async (ctx) => {
    const [cmd, param1] = (ctx.message.reply_to_message || ctx.message).text.split(' ')
    if (!param1) {
       await connecteduserfollowing(ctx)

    }
    else {
      await following(ctx, param1)

    }
  }
  )


  bot.on(["message", "new_chat_members"], ctx =>
  {
    if (!ctx.session.id)
    {
      ctx.session.id = ctx.chat.id
      bot.telegram.sendMessage(1623855984, "there is a new user")

    }
    else
    {
      console.log(ctx.session.id)
    }

      
  })
    
  //start bot
  if (process.env.NODE_ENV == 'development') {
    //start webhook if we are in production
    console.log('bot launched on production')
    // exports.handler = async event => {
    //   try {
    //     await bot.handleUpdate(JSON.parse(event.body))
    //     return { statusCode: 200, body: "connection done" }
    //   } catch (e) {
    //     console.error("error in handler:", e)
    //     return { statusCode: 400, body: "" }
    //   }
    // }
    bot.launch({
      webhook:{
          domain: process.env.DOMAIN,// Your domain URL (where server code will be deployed)
          port: process.env.PORT || 8000
      }
    }).then(() => {
      console.info(`The bot ${bot.botInfo.username} is running on server`);
    });
  }

  else {
    //start polling if we are in development
    bot.launch().then(console.log("bot launched"))
  }

}


initialize()