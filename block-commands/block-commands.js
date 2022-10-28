async function() {

    const blockedScenes = ["stopCommand", "anotherStopCommand"];
    const restrictedScenes = ["noSceneChange"];

    // ----- DO NOT EDIT BELOW HERE -----

    if (Array.isArray(blockedScenes) && blockedScenes.includes(`{{obs_current_scene}}`)) {
        // If the current scene is in the blockedScenes list, stop the command
        addLog(`Current scene is in blocked scenes list, stopping command.`)
        return done({ shouldStop: true });
    } else if (!Array.isArray(blockedScenes)) {
        addLog(`ERROR: blockedScenes needs to be an array of format ["stopCommand"] for no blocked scenes set it to []`)
        showToast({ message: `ERROR: blockedScenes needs to be an array of format ["stopCommand"] for no blocked scenes set it to []` });
        return done({ shouldStop: true });
    }

    if (Array.isArray(restrictedScenes) && restrictedScenes.includes(`{{obs_current_scene}}`)) {
        // If the current scene is in the restrictedScenes list, stop any scene changes
        addLog(`Current scene is in restricted scenes list, stopping scene changes.`)
        return done({ shouldStop: true, actionsToStop: ['obs', 'slobs'] });
    } else if (!Array.isArray(restrictedScenes)) {
        addLog(`ERROR: restrictedScenes needs to be an array of format ["noSceneChange"] for no restricted scenes set it to []`)
        showToast({ message: `ERROR: restrictedScenes needs to be an array of format ["noSceneChange"] for no restricted scenes set it to []` });
        return done({ shouldStop: true });
    }

    addLog(`Current scene is not restricted, command continuing as normal.`)
    done()

}