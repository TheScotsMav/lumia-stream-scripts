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
        // check if there is a scene to switch to, if not, continue the command without passing a variable
        if (!sceneSwitching[0]) {
            done();
        }
        // If the current scene is in the restrictedScenes list, stop any scene changes
        sceneSwitching.forEach((scene, x) => sceneList["sw-" + x] = "{{obs_current_scene}}");
    } else {
        // check if there is a scene to switch to, if not, continue the command without passing a variable
        if (!sceneSwitching[0]) {
            done();
        }
        // Otherwise, proceed as normal
        sceneSwitching.forEach((scene, x) => sceneList["sw-" + x] = scene);
    }

    done({ variables: sceneList })

}