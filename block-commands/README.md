# Block commands

A simple script to block the execution of commands if you are on certain OBS scenes.

## Blocked scenes

If you don't want the command to be able to run at all, add them to the array as shown below.

```Javascript
const blockedScenes = ["blockedScene"];
```

### Multiple blocked scenes

If you want multiple blocked scenes, simply list them in the array as shown.

```Javascript
const blockedScenes = ["blockedScene","anotherScene","yetAnotherScene"];
```

### No blocked scenes

If you don't want any blocked scenes simply set the array to contain an empty string

```Javascript
const blockedScenes = [""];
```

## How to use

This is designed to be as easy to use and user-friendly as possible.

- Copy the code from block-commands.js into the "custom JS" section of your command in Lumia Stream.
-

More details to follow...
