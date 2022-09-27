# Block commands

A simple script to block the execution of commands if you are on certain OBS scenes.

## How to use

Simply copy the contents of `block-commands.js` into the "custom JS" section of the command in Lumia Stream you want to limit OBS scene changes on then edit the follow the setup procedure below.

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

#### Switching

This is a list of scenes you would normally want to switch to; if the current OBS scene is neither restricted nor blocked.

These are specified the same way as blocked scenes above, but using the `sceneSwitching` variable instead.

```Javascript
//Single
const sceneSwitching = ["newScene"];

//multiple
const sceneSwitching = ["newScene","anotherScene","yetAnotherScene"];

//no scene switching
const sceneSwitching = [""];
```

To use the new variables in the OBS actions you would simply use the `ns-` followed by the scene name as a Lumia variable e.g. `{{ns-newScene}}`
