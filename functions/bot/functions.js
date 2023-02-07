
var gh = require('parse-github-url');
const { Octokit } =require("octokit")


const octokit = new Octokit({

  auth:process.env.GITHUB_TOKEN

})

async function fetchdata(urlE)
{
    try
    {
        var urldata = gh(urlE);
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
        console.log(data)
        return data
        
    }
    catch (e)
    {
        throw urlE+ " its not  valid github url"
        
        }

    

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


module.exports= { fetchdata,makezip}