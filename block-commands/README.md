# Block commands

A simple script to block the execution of commands if you are on certain OBS scenes.

## Scenes

### Blocked

If you don't want the command to be able to run at all, add them to the array as shown below.

```Javascript
const blockedScenes = ["blockedScene"];
```

#### Multiple blocked scenes

If you want multiple blocked scenes, simply list them in the array as shown.

```Javascript
const blockedScenes = ["blockedScene","anotherScene","yetAnotherScene"];
```

#### No blocked scenes

If you don't want any blocked scenes simply set the array to contain an empty string

```Javascript
const blockedScenes = [""];
```

### Restricted

This is a list of scenes you want the command to fire as normal on, except not allow any OBS scene changes.

These are specified the same way as blocked scenes above, but using the `restrictedScenes` variable instead.

```Javascript
//Single
const restrictedScenes = ["restrictedScene"];

//multiple
const restrictedScenes = ["restrictedScene","anotherScene","yetAnotherScene"];

//none
const restrictedScenes = [""];
```

## How to use

This is designed to be as easy to use and user-friendly as possible.

- Copy the code from block-commands.js into the "custom JS" section of your command in Lumia Stream.
-

More details to follow...
