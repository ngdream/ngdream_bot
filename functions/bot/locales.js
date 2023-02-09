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
        "en":`Hey! My name is ngdream. I am a group management bot, here to help you manage you opensource project and promote it!
        I have lots of handy features
        *Helpful commands*:
        - /start: Starts me! You've probably already used this .
        - /help: Sends this message; I'll tell you more about myself!
        - /donate: Gives you info on how to support me and my creator.
        - /share <your url> : can clone a repository or a subdirectory (from github)
        - /connect : connect a group to github account (only admin)
        
        All commands can be used with the following: / !`,

        "fr": `Hey ! Je m'appelle ngdream. Je suis un bot de gestion de groupe, ici pour vous aider à gérer votre projet opensource et à le promouvoir !
        J'ai beaucoup de fonctionnalités pratiques
        *Commandes utiles* :
        - /start : me lance ! Vous avez probablement déjà utilisé ce .
        - /help : envoie ce message ; je vous en dirai plus sur moi !
        - /donate : vous donne des informations sur la façon de me soutenir, moi et mon créateur.
        - /share <votre url> : peut cloner un dépôt ou un sous-répertoire (depuis github)
        - /connect : connecte un groupe au compte github (seulement admin)`,

        "ci":`嘿！我的名字是 ngdream。我是群管机器人，来帮你管理你的开源项目，推广它！
我有很多方便的功能
*有用的命令*：
- /开始：开始我！您可能已经使用过这个。
- /帮助：发送此消息；我会告诉你更多关于我自己的事！
- /donate：为您提供有关如何支持我和我的创造者的信息。
- /share <your url>: 可以克隆存储库或子目录（来自 github）
- /connect: 将组连接到 github 帐户（仅限管理员）

所有命令都可以与以下命令一起使用：/ !`
    },

    "donate":
    {
        "en":`So you want to donate? Amazing!
        You can donate on PayPal (https://www.paypal.com/donate/?hosted_button_id=2NGECBY5Y635C),
        This project is entirely run by volunteers, and server fees aren't cheap, so we thank you for your support!`,

        "fr": `Alors vous voulez faire un don ? Incroyable!
        Vous pouvez faire un don sur PayPal (https://www.paypal.com/donate/?hosted_button_id=2NGECBY5Y635C).
        Ce projet est entièrement géré par des bénévoles et les frais de serveur ne sont pas bon marché, nous vous remercions donc pour votre soutien !`,

        "ci": `所以你想捐款？惊人的！
        您可以通过 PayPal (https://www.paypal.com/donate/?hosted_button_id=2NGECBY5Y635C) 捐款，也可以在 GitHub Sponsors (https://github.com/sponsors/PaulSonOfLars) 上设置定期捐款。
        本项目完全由志愿者运营，服务器费用不菲，感谢大家的支持！`

    }

    
}

module.exports=LOCALES