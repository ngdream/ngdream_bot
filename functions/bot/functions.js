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