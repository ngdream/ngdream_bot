const { Telegraf, Markup ,Scenes,session} = require("telegraf")
require('dotenv').config()



const Jszip = require('jszip')
const {fetchdata,makezip}=require('./functions')

const bot = new Telegraf(process.env.BOT_TOKEN);



HELPTEXT = `
Hey! My name is ngdream. I am a group management bot, here to help you manage you opensource project and promote it!
I have lots of handy features
*Helpful commands*:
- /start: Starts me! You've probably already used this .
- /help: Sends this message; I'll tell you more about myself!
- /donate: Gives you info on how to support me and my creator.
- /share <your url> : can clone a repository or a subdirectory (from github)
- /connect : connect a group to github account (only admin)

All commands can be used with the following: / !`

DONATETEXT = `
So you want to donate? Amazing!
You can donate on PayPal (https://www.paypal.com/donate/?hosted_button_id=2NGECBY5Y635C), or you can set up a recurring donation on GitHub Sponsors (https://github.com/sponsors/PaulSonOfLars).
This project is entirely run by volunteers, and server fees aren't cheap, so we thank you for your support!
`

PM_START_TEXT =
`Hey there! My name is kiki, I'm here to help you manage your groups! Hit /help to find out more about how to use me to my full potential.
Join my [news channel](https://t.me/ngdreamnew) to get information on all the latest updates.`




  

const startmakup = Markup.inlineKeyboard([
    Markup.button.url("contribute to the project", "https://github.com/ngdream/ngdream_bot"),
    Markup.button.url("join ngcodex community", "https://t.me/ngcodex"),

]);


//handle start command
bot.start(ctx => {
    try {
    
      return ctx.replyWithMarkdown(PM_START_TEXT,startmakup)
    } catch (e) {
      console.error("error in start action:", e)
        return ctx.reply("Error occured")
        
    }
})


// handle help command
bot.help(ctx => {

    try {
    
        return ctx.replyWithMarkdown(HELPTEXT)
    } catch (e) {
      console.error("error in start action:", e)
        return ctx.reply("Error occured")
        
    }
});

//handle donate command
bot.command("donate", ctx =>
{
    try {
    
        return ctx.replyWithMarkdown(DONATETEXT)
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
    return ctx.reply('Missing parameter');
        
  }
  try
  {
    const data = await fetchdata(param)
    ctx.reply("a file will be send at soon ")
    if (data.type) {
  
      ctx.sendDocument(
        {
          source: Buffer.from(data.content, "base64"),
          filename: data.name
                
        }).catch(e => console.log(e))
    }
    else {
  
      zip = new Jszip()
      await makezip(zip, data)
      content = await zip.generateAsync({ type: "nodebuffer" })
      ctx.sendDocument(
        {
          source: content,
          filename: param + ".zip"
          
        }).catch(e => console.log(e))
    }
            
    console.log("file is sent")
  }
  catch (e)
  {
    console.log(e)
    ctx.reply(e)
  }

})          
     
    
//start bot
if (process.env.NODE_ENV == 'development')
{
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
  console.log('bot launched')
   bot.launch()
  }