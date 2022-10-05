async function() {
    const linesThreshold = 10; // Set the number of chat lines between each command
    const timeBetweenCommands = 1; // Minumum number of minutes between commands
    const commands = ["red", "blue", "green"]; // Put in the commands you want in a ticker here

    // DON'T EDIT BELOW THIS LINE

    let numLines = await getVariable("number_lines");
    let commandNumber = await getVariable("command_number");
    let lastCommandTime = await getVariable("last_command_time");
    const timeNow = Date.now();

    if (!numLines) {
        numLines = 0;
    };

    if (!commandNumber) {
        commandNumber = 0;
    };

    if (!lastCommandTime) {
        lastCommandTime = timeNow;
    };

    numLines++;
    if (numLines >= linesThreshold && (timeNow - timeBetweenCommands * 60000) >= lastCommandTime) {
        callCommand({ name: commands[commandNumber] })
        commandNumber++;
        await setVariable({ name: "command_number", value: commandNumber % commands.length });
        await setVariable({ name: "number_lines", value: 0 });
        await setVariable({ name: "last_command_time", value: timeNow });
    } else {
        await setVariable({ name: "number_lines", value: numLines });
    }

    done();
}