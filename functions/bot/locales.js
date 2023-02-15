//MIT License

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


//-------------------------------------locales.js-------------------------------------------------
// this file contains text


const LOCALES =
{
    "start":
    {
        "en": `Hey there! My name is kiki, I'm here to help you manage your groups! Hit /help to find out more about how to use me to my full potential.
        Join my [news channel](https://t.me/ngdreamnew) to get information on all the latest updates.`,

        "fr":`Salut! Je m'appelle kiki, je suis là pour vous aider à gérer vos groupes ! Appuyez sur /help pour en savoir plus sur la façon de m'utiliser à mon plein potentiel.
        Rejoignez ma [chaîne d'actualités] (https://t.me/ngdreamnew) pour obtenir des informations sur toutes les dernières mises à jour.`,
            
        "ci":`嘿！我的名字是 kiki，我来这里是为了帮助您管理您的群组！点击 /help 了解更多关于如何充分发挥我的潜力的信息。
        加入我的 [新闻频道](https://t.me/ngdreamnew) 以获取所有最新更新的信息`
        
    },


    "help":
    {
        "en":`Hey! My name is kiki. I am a project management bot  , here to help you manage your developer project and promote it!
        I have lots of handy features
        *Helpful commands*:
        - /maintain
        - /start: Starts me! You've probably already used this .
        - /help: Sends this message; I'll tell you more about myself!
        - /donate: Gives you info on how to support me and my creator.
        - /share <your url> : can clone a repository or a subdirectory (from github)
        - /connect : connect a group to github account (only admin)
        - /following <username> : see people followed by a specified user
        - /follower <username> : see people who follows a specified user

        *only for connected user*
        - /create <repo_name> create a new github repository
        - /delete <url>

        
        All commands can be used with the following: / !`,

        "fr": `Hey! My name is kiki. I am a project management bot  , here to help you manage your developer project and promote it!
        I have lots of handy features
        *Helpful commands*:
        - /maintain
        - /start: Starts me! You've probably already used this .
        - /help: Sends this message; I'll tell you more about myself!
        - /donate: Gives you info on how to support me and my creator.
        - /share <your url> : can clone a repository or a subdirectory (from github)
        - /connect : connect a group to github account (only admin)
        - /following <username> : see people followed by a specified user
        - /follower <username> : see people who follows a specified user

        *only for connected user*
        - /create <repo_name> create a new github repository
        - /delete <url>

        
        All commands can be used with the following: / !`,


    },

    "donate":
    {
        "en":`So you want to donate? Amazing!
        You can donate on [PayPal] (https://www.paypal.me/ngdream),
        This project is entirely run by volunteers, and server fees aren't cheap, so we thank you for your support!`,

        "fr": `Alors vous voulez faire un don ? Incroyable!
        Vous pouvez faire un don sur [PayPal](https://www.paypal.me/ngdream).
        Ce projet est entièrement géré par des bénévoles et les frais de serveur ne sont pas bon marché, nous vous remercions donc pour votre soutien !`,

    

    },

    "connect":
    {
        "en": "login to your github account and use powerful functionalities",
        "fr":"connectez-vous a votre compte github et  utilisez de plus puissante fonctionnalités "
    },
    "maintenance":
    {
        "en": "i'm  going on maintainance for  /time/",
        "fr":"je serais en  maintenance pour /time/"
    },



    "denied":
    {
        "en": "permission denied",
        "fr": "permission refusé"
        
    },

    "fsend":
    {
        "en": "file sent successfully",
        "fr":"fichier envoyé avec success"
    },




    
}

module.exports=LOCALES