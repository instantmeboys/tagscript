# tagscript README

TagScript is a programming language for NotSoBot! 

## Features

You can add '.tagscript' and '.tag' as a valid file extension with this extension! By changing the color theme to TagScript's color theme, you can edit TagScript code easily.
This extension features autocompletion, syntax highlighting and hover information.

## Compile from source

You need [Node.js](https://nodejs.org/) installed on your system and vsce (Visual Studio Code Extensions)

Install vsce:
```sh
npm install -g @vscode/vsce
```

Compiling: 
```sh
git clone https://github.com/instantmeboys/tagscript.git
cd tagscript
vsce package
```