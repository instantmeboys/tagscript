import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log("Activated TagScript TypeScript");

    context.subscriptions.push(vscode.languages.registerCompletionItemProvider('tagscript', {
        provideCompletionItems(document, position, token, context) {
            const line = document.lineAt(position.line).text;
            const beforeWord = line.substring(0, position.character);

            const completionItems = [];

            const keywords = [
                { keyword: "translate", title: "{translate:toTranslate|en}", snippet: "translate:toTranslate|en" },
                { keyword: "repeat", title: "{repeat:10|text}",snippet: "repeat:10|text" },
                { keyword: "replace", title: "{replace:toReplace|replacedText|text}", snippet: "replace:toReplace|replacedText|text" },
                { keyword: "if", title: "{if:A|=|A|then: |else: }", snippet: "if:A|=|A|then: |else: " },
                { keyword: "range", title: "{range:min|max}", snippet: "range:1|10" },
                { keyword: "set", title: "{set:variable|value}", snippet: "set:variable|value" },
                { keyword: "get", title: "{get:var}", snippet: "get|var" },
                { keyword: "user", title: "{user}", snippet: "user" },
                { keyword: "server", title: "{server}", snippet: "server" },
                { keyword: "args", title: "{args}", snippet: "args" },
                { keyword: "arg", title: "{arg:0}", snippet: "arg:0" },
                { keyword: "argslen", title: "{argslen}", snippet: "argslen" },
                { keyword: "randuser", title: "{randuser}", snippet: "randuser" },
                { keyword: "note", title: "{note:text}", snippet: "note:text" },
                { keyword: "servercount", title: "{servercount}", snippet: "servercount" },
                { keyword: "serverid", title: "{serverid}", snippet: "serverid" },
                { keyword: "randuserid", title: "{randuserid}", snippet: "randuserid" },
                { keyword: "randonline", title: "{randonline}", snippet: "randonline" },
                { keyword: "channel", title: "{channel}", snippet: "channel" },
                { keyword: "channelid", title: "{channelid}", snippet: "channelid" },
                { keyword: "newline", title: "{newline}", snippet: "newline" },
                { keyword: "tagname", title: "{tagname}", snippet: "tagname" },
                { keyword: "ocr", title: "{ocr}", snippet: "ocr" },
                { keyword: "randmessageid", title: "{randmessageid}", snippet: "randmessageid" },
                { keyword: "math", title: "{math:2+2}", snippet: "math:2+2" },
                { keyword: "eval", title: "{eval:text}", snippet: "eval:text" },
                { keyword: "length", title: "{length:text}", snippet: "length:text" },
                { keyword: "replycontent", title: "{replycontent}", snippet: "replycontent" },
                { keyword: "replyuserid", title: "{replyuserid}", snippet: "replyuserid" },
                { keyword: "messageuserid", title: "{messageuserid:MESSAGE_ID}", snippet: "messageuserid:MESSAGE_ID" },
                { keyword: "pi", title: "{pi}", snippet: "pi" },
                { keyword: "text", title: "{text:URL}", snippet: "text:URL" },
                { keyword: "lattach", title: "{lattach}", snippet: "lattach" },
                { keyword: "lower", title: "{lower:TEXT}", snippet: "lower:TEXT" },
                { keyword: "upper", title: "{upper:text}", snippet: "upper:text" },
                { keyword: "code", title: "{code:block}", snippet: "code:block" },
                { keyword: "substring", title: "{substring:text|start|end}", snippet: "substring:text|start|end" },
                { keyword: "jsonify", title: "{jsonify:text}", snippet: "jsonify:text"},
                { keyword: "messagecontent", title: "{messagecontent:MESSAGE_ID}", snippet: "messagecontent:MESSAGE_ID"},
                { keyword: "avatar", title: "{avatar}", snippet: "avatar"},
                { keyword: "nick", title: "{nick}", snippet: "nick"},
                { keyword: "mention", title: "{mention:user}", snippet: "mention:user"},
                { keyword: "randchannel", title: "{randchannel}", snippet: "randchannel"},
                { keyword: "download", title: "{download:URL}", snippet: "download:URL"},
                { keyword: "search.google.images", title: "{search.google.images:PAGE|search}", snippet: "search.google.images:random|search"},
                { keyword: "ignore", title: "{ignore:text}", snippet: "ignore:text"},
                { keyword: "attach", title: "{attach:URL}", snippet: "attach:URL"},
                { keyword: "attachtext", title: "{attachtext:text}", snippet: "attachtext:text"},
                { keyword: "settings", title: "{settings:SETTING|VALUE}", snippet: "settings:SETTING|VALUE"}
            ];  // List of keywords and their associated snippets

            for (const keywordData of keywords) {
                const keyword = keywordData.keyword;
                const title = keywordData.title;
                const snippet = keywordData.snippet;

                for (let i = 1; i <= keyword.length; i++) {
                    const pattern = keyword.substring(0, i);
                    if (beforeWord.endsWith("{" + pattern)) {
                        const completionItem = new vscode.CompletionItem(title, vscode.CompletionItemKind.Keyword);
                        completionItem.filterText = pattern;
                        completionItem.insertText = new vscode.SnippetString(snippet);
                        completionItem.documentation = new vscode.MarkdownString('Documentation for ' + keyword);
                        completionItems.push(completionItem);
                        break; 
                    }
                }
            }

            return completionItems;
        }
    }));

    const hoverInfoArray = [
        { word: "translate", description: "{translate:text|en}", moreInfo: "Translates the text to the language. The language codes are ISO 639-2 or ISO 639-1." },
        { word: "repeat", description: "{repeat:10|text}", moreInfo: "Repeat text a certain number of times." },
        { word: "replace", description: "{replace:toReplace|replacedText|text}", moreInfo: "Replaces text." },
        { word: "args", description : "{args} or {args:1}", moreInfo: "It's the text that goes after the tag name.\nWhen using {args:1}, it will give every arg except {arg:0}. {args:1|-1} will give you all the args with {arg:0} and {arg:-1} sliced off." }, 
        { word: "id", description : "{id} or {id:user}", moreInfo: "The user id of the person that used the tag, or with {id:} it will try to find the id of someone with that username." }, 
        { word: "user", description : "{user:input}", moreInfo: "Retrieve your username with {user} or find someone with the name in input." }, 
        { word: "randmessageid", description : "{randmessageid}", moreInfo: "The random id of one of the past 100 messages." }, 
        { word: "set", description : "{set:name|value}", moreInfo: "Sets a variable that can be retrieved using {get:}" }, 
        { word: "get", description : "{get:name}", moreInfo: "Retrieve the value of a variable." }, 
        { word: "ocr", description : "{ocr} or {ocr:file}", moreInfo: "Reads the text in the latest media sent to a server, or with {ocr:file} it will read that image." }, 
        { word: "replycontent", description : "{replycontent}", moreInfo: "Retrieves the content that the user replied to." }, 
        { word: "choose", description : "{choose:A|B|C}", moreInfo: "Choose from a value separated by |" }, 
        { word: "substring", description : "{substring:text|start|end}", moreInfo: "end is optional.\nRemoves all the text from start to end." }, 
        { word: "python", description : "{python:code}", moreInfo: "Execute python code" }, 
        { word: "math", description : "{math:1+1}", moreInfo: "Performs math operations." }, 
        { word: "code", description : "{code:text}", moreInfo: "Puts the text in a discord formatted codeblock." }, 
        { word: "jsonify", description : "{jsonify:text}", moreInfo: "Allows new lines in text where it would break code normally, by example in mscript" }, 
        { word: "messagecontent", description : "{messagecontent:messageid}", moreInfo: "Gets the message content from the message id." }, 
        { word: "lattach", description : "{lattach}", moreInfo: "Returns the URL of the last attachment in chat." }, 
        { word: "avatar", description : "{avatar:user}", moreInfo: "Avatar from someone. input is optional, without the input and just {avatar} it returns the avatar of the person using the tag." }, 
        { word: "argslen", description : "{argslen}", moreInfo: "Gives you the number of arguments" }, 
        { word: "nick", description : "{nick:user}", moreInfo: "Nickname from someone. input is optional, without the input and just {nick} it returns the nickname of the person using the tag." }, 
        { word: "attach", description : "{attach:URL}", moreInfo: "Attaches a media URL" }, 
        { word: "newline", description : "{newline}", moreInfo: "Creates a new line." }, 
        { word: "text", description : "{text:URL}", moreInfo: "Downloads the source code from an URL." }, 
        { word: "range", description : "{range:1|10}", moreInfo: "Gets a random number from a value to another in integers." }, 
        { word: "eval", description : "{eval:text}", moreInfo: "Parses and executes the text, generally useful to use with {text:}" }, 
        { word: "mention", description : "{mention:user}", moreInfo: "Mentions someone and autocompletes for you." }, 
        { word: "lower", description : "{lower:TEXT}", moreInfo: "Lowercases all the text." },
        { word: "upper", description : "{upper:text}", moreInfo: "Uppercases all the text." },
        { word: "note", description : "{note:text}", moreInfo: "All of the text is treated as a comment, it's never displayed." },
        { word: "ignore", description : "{ignore:text}", moreInfo: "Ignores script tags and just outputs the raw text." },
        { word: "arg", description : "{arg:0}", moreInfo: "Gets an argument. 0 is the first, 1 is the second argument and so on." },
        { word: "reverse", description : "{reverse:text}", moreInfo: "Reverses the text." },
        { word: "randonline", description : "{randonline}", moreInfo: "Gets a random online user from the server." },
        { word: "randonlineid", description : "{randonlineid}", moreInfo: "Gets a random online user id from the server." },
        { word: "len", description : "{len:text}", moreInfo: "Gets the amount of characters in the text." },
        { word: "length", description : "{length:text}", moreInfo: "Gets the amount of characters in the text." },
        { word: "", description : "", moreInfo: "" },
        { word: "", description : "", moreInfo: "" },
        { word: "", description : "", moreInfo: "" },
        { word: "", description : "", moreInfo: "" },

      ];

    context.subscriptions.push(vscode.languages.registerHoverProvider('tagscript', {
        provideHover(document, position, token) {
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);

            const hoverInfo = hoverInfoArray.find(entry => entry.word === word);

            if (hoverInfo) {
                const hoverRange = document.getWordRangeAtPosition(position);
                const hoverText = new vscode.MarkdownString();

                hoverText.appendMarkdown(`**${hoverInfo.description}**\n\n${hoverInfo.moreInfo}`);

                return new vscode.Hover(hoverText, hoverRange);
            }

            return null;
        }
    }));
}
