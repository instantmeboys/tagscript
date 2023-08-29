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
                { keyword: "if", title: "{if:test|=|test|then: |else: }", snippet: "if:test|=|test|then: |else: " },
                { keyword: "range", title: "{range:min|max}", snippet: "range:1|10" },
                { keyword: "set", title: "{set:variable|value}", snippet: "set:variable|value" },
                { keyword: "get", title: "{get|var}", snippet: "get|var" },
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
                { keyword: "settings", title: "{settings:SETTING|VALUE}", snippet: "settings:SETTING|VALUE"}
            ];  // List of keywords and their associated snippets

            for (const keywordData of keywords) {
                const keyword = keywordData.keyword;
                const title = keywordData.title;
                const snippet = keywordData.snippet;

                for (let i = 1; i <= keyword.length; i++) {
                    const pattern = keyword.substring(0, i);
                    if (beforeWord.endsWith(pattern)) {
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



    context.subscriptions.push(vscode.languages.registerHoverProvider('tagscript', {
        provideHover(document, position, token) {
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);

            if (word === 'replace') {
                return {
                    contents: [
                        '{replace:with|to|in}',
                        'The text that matches **with** in **in** will be replaced to **to**, you can nest replace functions.'
                    ]
                };
            } else if (word === 'args') {
                return {
                    contents: [
                        '{args}',
                        'The text that goes after the tag name.'
                    ]
                };
            } else if (word === 'id') {
                return {
                    contents: [
                        '{id} or {id:username}',
                        'The user id of the person that used the tag, or with {id:} it will try to find the id of someone with that username.'
                    ]
                };
            } else if (word === 'user') {
                return {
                    contents: [
                        '{user:input}',
                        'Retrieve your username with {user} or find someone with the name in input.'
                    ]
                };
            } else if (word === 'randmessageid') {
                return {
                    contents: [
                        '{randmessageid}',
                        'The random id of one of the past 100 messages.'
                    ]
                };
            } else if (word === 'set') {
                return {
                    contents: [
                        '{set:animal|cats}',
                        'Sets a variable that can be retrieved using {get:animal}'
                    ]
                };
            } else if (word === 'get') {
                return {
                    contents: [
                        '{get:variable}',
                        'Retrieves the value of a variable set using {set:variable|content}'
                    ]
                };
            } else if (word === 'ocr') {
                return {
                    contents: [
                        '{ocr} or {ocr:file}',
                        'Reads the text in the latest media sent to a server, or with {ocr:file} it will read that image.'
                    ]
                };
            } else if (word === 'translate') {
                return {
                    contents: [
                        '{translate:text|en}',
                        'Translates the text to the language. The language codes are ISO 639-2 or ISO 639-1.'
                    ]
                };
            } else if (word === 'replycontent') {
                return {
                    contents: [
                        '{replycontent}',
                        'Retrieves the content that the user replied to.'
                    ]
                };
            } else if (word === 'choose') {
                return {
                    contents: [
                        '{choose:cba|abc|bca}',
                        'Picks one of the random items separated by |'
                    ]
                };
            } else if (word === 'substring') {
                return {
                    contents: [
                        '{substring:text|start|end}',
                        'end is optional.',
                        'Removes all the text from start to end'
                    ]
                };
            } else if (word === 'python') {
                return {
                    contents: [
                        '{python:}',
                        'Executes python code.',
                    ]
                };
            } else if (word === 'math') {
                return {
                    contents: [
                        '{math:1 + 1}',
                        'Returns the result of the operation.',
                    ]
                };
            } else if (word === 'code') {
                return {
                    contents: [
                        '{code:hello}',
                        'Puts the text in a codeblock.',
                    ]
                };
            } else if (word === 'jsonify') {
                return {
                    contents: [
                        '{jsonify:text}',
                        'Allows new lines in text where it would break code normally, by example in mscript',
                    ]
                };
            } else if (word === 'messagecontent') {
                return {
                    contents: [
                        '{messagecontent:messageid}',
                        'Gets the message content from the message id.',
                    ]
                };
            } else if (word === 'lattach') {
                return {
                    contents: [
                        '{lattach}',
                        'Returns the URL of the last attachment in chat.',
                    ]
                };
            } else if (word === 'argslen') {
                return {
                    contents: [
                        '{argslen}',
                        'Returns the amount of arguments.',
                    ]
                };
            } else if (word === 'avatar') {
                return {
                    contents: [
                        '{avatar:input}',
                        'Avatar from someone. input is optional, without the input and just {avatar} it returns the avatar of the person using the tag.',
                    ]
                };
            } else if (word === 'nick') {
                return {
                    contents: [
                        '{nick:input}',
                        'NIckname from someone. input is optional, without the input and just {nick} it returns the nickname of the person using the tag.',
                    ]
                };
            } else if (word === 'attach') {
                return {
                    contents: [
                        '{attach:URL}',
                        'Attaches a media URL.',
                    ]
                };
            } else if (word === 'newline') {
                return {
                    contents: [
                        '{newline}',
                        'Creates a new line.',
                    ]
                };
            } else if (word === 'text') {
                return {
                    contents: [
                        '{text:URL}',
                        'Downloads the source code from an URL',
                    ]
                };
            } else if (word === 'range') {
                return {
                    contents: [
                        '{range:1|10}',
                        'Gets a random number from 1 to 10.',
                    ]
                };
            } else if (word === 'lower') {
                return {
                    contents: [
                        '{lower:text}',
                        'Makes the text all lowercase.',
                    ]
                };
            } else if (word === 'upper') {
                return {
                    contents: [
                        '{upper:text}',
                        'Makes the text all uppercase.',
                    ]
                };
            } else if (word === 'length') {
                return {
                    contents: [
                        '{length:text}',
                        'Gets the amount of characters in text.',
                    ]
                };
            } else if (word === 'len') {
                return {
                    contents: [
                        '{len:text}',
                        'Gets the amount of characters in text.',
                    ]
                };
            } else if (word === 'note') {
                return {
                    contents: [
                        '{note:text}',
                        'All of the text is treated as a comment and never displayed.',
                    ]
                };
            } else if (word === 'ignore') {
                return {
                    contents: [
                        '{ignore:text}',
                        'Ignores script tags in text.',
                    ]
                };
            } else if (word === 'eval') {
                return {
                    contents: [
                        '{eval:text}',
                        'Parses and runs the text.',
                    ]
                };
            } else if (word === 'randonline') {
                return {
                    contents: [
                        '{randonline}',
                        'Gets a random online user from the server.',
                    ]
                };
            } else if (word === 'randonlineid') {
                return {
                    contents: [
                        '{randonlineid}',
                        'Gets a random id from an online user in the server.',
                    ]
                };
            }

            return null;
        }
    }));
}
