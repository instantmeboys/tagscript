import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log("Activated TagScript TypeScript");
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
