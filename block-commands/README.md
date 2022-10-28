# Block commands

A simple script to block the execution of commands if you are on certain OBS/Streamlabs Desktop scenes.

## How to use

Simply copy the contents of `block-commands.js` into the "custom JS" section of the command in Lumia Stream you want to limit OBS/Streamlabs Desktop actions on then follow the setup procedure below.

### Scene setup

#### Blocked

If you don't want the command to be able to run at all, add them to the array as shown below.

```Javascript
const blockedScenes = ["blockedScene"];
```

##### Multiple blocked scenes

If you want multiple blocked scenes, simply list them in the array as shown.

```Javascript
const blockedScenes = ["blockedScene","anotherScene","yetAnotherScene"];
```

##### No blocked scenes

If you don't want any blocked scenes simply set the array to contain an empty string

```Javascript
const blockedScenes = [""];
```

#### Restricted

This is a list of scenes you want the command to fire as normal on, except not allow any OBS/Streamlabs Desktop actions on.

These are specified the same way as blocked scenes above, but using the `restrictedScenes` variable instead.

```Javascript
//Single
const restrictedScenes = ["restrictedScene"];

//multiple
const restrictedScenes = ["restrictedScene","anotherScene","yetAnotherScene"];

//none
const restrictedScenes = [""];
```
