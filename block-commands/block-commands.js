async function() {

    const blockedScenes = ["a blocked Scene"];
    const restrictedScenes = ["a restricted Scene"];
    const sceneSwitching = ["Coding"];


    // ----- DO NOT EDIT BELOW HERE -----

    let sceneList = {};

    if (blockedScenes.includes("{{obs_current_scene}}")) {
        // If the current scene is in the blockedScenes list, stop the command
        done({ shouldStop: true });
    } else if (restrictedScenes.includes("{{obs_current_scene}}")) {
        // If the current scene is in the restrictedScenes list, stop any scene changes
        sceneSwitching.map(sceneName => sceneList["ns-" + sceneName] = "{{obs_current_scene}}")
    } else {
        // Otherwise, proceed as normal
        sceneSwitching.map(sceneName => sceneList["ns-" + sceneName] = sceneName)
    }

    done({ variables: sceneList })

}