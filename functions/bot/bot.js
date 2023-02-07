const { Telegraf, Markup ,Scenes,session} = require("telegraf")
require('dotenv').config()


const { Octokit } =require("octokit")
const Jszip = require('jszip')
var gh = require('parse-github-url');



const octokit = new Octokit({

  auth:process.env.GITHUB_TOKEN

})


octokit.auth().then((value) => { console.log(value) })

async function f(urlE)
{
  var urldata=gh(urlE);
  let path = ""
  if (!urldata.type)
  {
    if (urldata.path !== urldata.repo)
    {
    path = urldata.path
    console.log(urldata.branch)
    path = path.substring(path.indexOf(urldata.branch))
    path=path.substring(path.indexOf("/")+1)
      }

    }

    
  const { data } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: urldata.owner,
    repo: urldata.name,
    path: (urldata.type)?urldata.filepath:path
  })
  return data
}

async function makezip(zip,part)
{
  for (const p of part)
  {

    if (p.type === "file")
    {
      console.log(p.content)
      var filedata= await f(p.html_url)
      let decoded = atob(filedata.content)
      zip.file(p.name, decoded);
    }
    else
    {
      var newfolder = zip.folder(p.name);
      var folderdata= await f(p.html_url)
      await makezip(newfolder,folderdata)
    }

    }
}


const bot = new Telegraf("5853131511:AAGkSPGXdb-E1bhEWoKf5AuiDQFdcSrCDZw");



HELPTEXT = `
Hey! My name is ngdream. I am a group management bot, here to help you manage you opensource project and promote it!
I have lots of handy features
*Helpful commands*:
- /start: Starts me! You've probably already used this.
- /help: Sends this message; I'll tell you more about myself!
- /donate: Gives you info on how to support me and my creator.
- /add : add a new project
- /discover : discover a new opensource project

All commands can be used with the following: / !`

DONATETEXT = `
So you want to donate? Amazing!
You can donate on PayPal (https://paypal.me/PaulSonOfLars), or you can set up a recurring donation on GitHub Sponsors (https://github.com/sponsors/PaulSonOfLars).
This project is entirely run by volunteers, and server fees aren't cheap, so we thank you for your support!
`

PM_START_TEXT =
`Hey there! My name is kiki, I'm here to help you manage your groups! Hit /help to find out more about how to use me to my full potential.
Join my [news channel](https://t.me/ngdreamnew) to get information on all the latest updates.`




  

  const startmakup = Markup.inlineKeyboard([
    Markup.button.url("contribute to the project", "https://github.com/ngdream/ngdream_bot"),
    Markup.button.url("join ngcodex community", "https://t.me/ngcodex"),

]);


bot.start(ctx => {
    try {
    
      return ctx.replyWithMarkdown(PM_START_TEXT,startmakup)
    } catch (e) {
      console.error("error in start action:", e)
        return ctx.reply("Error occured")
        
    }
})



bot.help(ctx => {

    try {
    
        return ctx.replyWithMarkdown(HELPTEXT)
    } catch (e) {
      console.error("error in start action:", e)
        return ctx.reply("Error occured")
        
    }
});

bot.command("donate", ctx =>
{
    try {
    
        return ctx.replyWithMarkdown(DONATETEXT)
    } catch (e) {
      console.error("error in start action:", e)
        return ctx.reply("Error occured")
        
    }
})


bot.command("share", ctx =>
{
    try {
    
  const [cmd, param] = (ctx.message.reply_to_message || ctx.message).text.split(' ')

      if (!param) return ctx.reply('Missing param');
      f(param).then((data) =>
      {
        if (data.type)
        {
          
          console.log(data.content)
          ctx.sendDocument(
            {
              source: new Buffer(data.content, "base64"),
              filename: data.name
              
            })
        }
        else
        {

          zip = new Jszip()
          makezip(zip, data).then(() => {
            zip.generateAsync({type:"nodebuffer"}).then(function(content) {
    // see FileSaver.js
    ctx.sendDocument(
      {
        source:content,
        filename: param+".zip"
        
      })
            });
          })
        }
   
  
      })
  return ctx.reply("le fichier sera envoyé sous peu")
    
    } catch (e) {
      console.error("error in add action:", e)
        return ctx.reply("Error occured")
        
    }
} )



bot.launch()
  
  // // AWS event handler syntax (https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)
  // exports.handler = async event => {
  //   try {
  //     await bot.handleUpdate(JSON.parse(event.body))
  //     return { statusCode: 200, body: "" }
  //   } catch (e) {
  //     console.error("error in handler:", e)
  //     return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" }
  //   }
  // }



