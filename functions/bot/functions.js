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

//--------------------------------------------functions.js-------------------------------------------//




var gh = require('parse-github-url');
const  axios=require("axios").default
const { Octokit } =require("octokit")


//default token for all user
const octokit = new Octokit({

  auth:process.env.GITHUB_TOKEN

})


async function fetchdata(repo_url)
{
    try
    {
        var decoded_url=decodeURI(repo_url)
        var urldata = gh(decodeURI);
        let path = ""
        if (!urldata.type) {
            if (urldata.path !== urldata.repo) {
                path = urldata.path
                path = path.substring(path.indexOf(urldata.branch))
                path = path.substring(path.indexOf("/") + 1)
            }
        }
        const { data } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: urldata.owner,
            repo: urldata.name,
            path: (urldata.type)?urldata.filepath:path
        })

        return data
        
    }
    catch (e)
    {
        throw repo_url+ " its not  valid github url"
        
        }
}

//this function delete a github repositorie with his link
async function deleterepo(ctx,repo_url)
{
  const octokit = new Octokit({

    auth:ctx.session.token
  
  })


  var owner
  var repo
  try
  {
    var urldata = gh(repo_url);
    owner = urldata.owner
    repo=urldata.repo

  return data
  }
  catch (e)
  {
    const userdata = (await octokit.request('GET /user', {}))
    owner = userdata.data.login
    repo=repo_url

  
  }
   await octokit.request('DELETE /repos/{owner}/{repo}', {
    owner: owner,
    repo: repo,
   }).then(res => {
       ctx.reply("repository has been deleted")
       
  }).catch(err =>
  {
    if (err.status === 404)
      ctx.reply("not found")
    else if (err.status === 403)
       ctx.reply("not authorized")
    })

}


//not available now
async function createrepo(ctx,name)
{
  try
  {
   
const octokit2 = new Octokit({
  auth: ctx.session.token
})

 await octokit2.rest.repos.createForAuthenticatedUser({
      
   name: name,
   description: '',
   homepage: 'https://github.com',
   'private': false,
   is_template: true,
 }).catch(err => { 
   if (err.status == 422)
   ctx.reply("the repository already exists",
   {
reply_to_message_id: ctx.message.message_id
})
  })
   .then(repo => {
     ctx.reply("repository created successfuly",
       {
    reply_to_message_id: ctx.message.message_id
  }) });

  }
  catch (e)
  {
      throw " cannot create a new repository" + e.message
      
      }
}


async function following(ctx,username)
{

 await octokit.request('GET /users/{username}/following', { username: username }).then(res =>
    {
      ctx.reply(`people followed by ${username}` )
      var return_text=""
      res.data.forEach(async(f) => {
      return_text+=`${f.login} \n`
      })
      ctx.reply(return_text)
    })
    

}



async function followers(ctx,username)
{

 await octokit.request('GET /users/{username}/followers', {username:username}).then(res =>
        {
          ctx.reply(`${username} followers`)
          var return_text=""
          res.data.forEach(async(f) => {
          return_text+=`${f.login} \n`
          })
          ctx.reply(return_text)
        })

}


async function connecteduserfollowing(ctx) 
{
  const octokit = new Octokit({

    auth:ctx.session.token
  
  })
  await octokit.request('GET /user/following', {})
  .then(res =>
    {
      ctx.reply("people followed you follow")
      var return_text=""
      res.data.forEach(async(f) => {
      return_text+=`${f.login} \n`
      })
      ctx.reply(return_text)
  })
    .catch(err =>
    {
      if (res.status === 401)
      ctx.reply("authentication required")
    })

}



async function connecteduserfollowers(ctx)
{
  const octokit = new Octokit({

    auth:ctx.session.token
  
  })
 
      const { data } = await octokit.request('GET /user/followers', {})  .then(res =>
        {
          
          ctx.reply("your followers")
          var return_text=""
          res.data.forEach(async(f) => {
          return_text+=`${f.login} \n`
          })
          ctx.reply(return_text)
      })
        .catch(err =>
        {
          if (res.status === 401)
          ctx.reply("authentication required")
        })

  
}





async function makezip(zip,part)
{
  for (const p of part)
  {

    if (p.type === "file")
    {
      var filedata= await fetchdata(p.html_url)
      let decoded = Buffer.from(filedata.content, 'base64')
      zip.file(p.name, decoded);
    }
    else
    {
      var newfolder = zip.folder(p.name);
      var folderdata= await fetchdata(p.html_url)
      await makezip(newfolder,folderdata)
    }

    }
}


module.exports= { fetchdata,makezip,createrepo,deleterepo,followers,following,connecteduserfollowers,connecteduserfollowing}