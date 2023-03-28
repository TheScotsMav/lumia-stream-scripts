async function() {
  const usersToGreet = {
    "FrodoMod1": "C:\\Documents\\Lumiastream\\uithinker.mp3",
    "FrodoMod2": "C:\\Documents\\Lumiastream\\sam.mp3",
    "FrodoMod3": "C:\\Documents\\Lumiastream\\sam.mp3"
  }

  // Don't trigger for users other than mods
  if (!usersToGreet["{{username}}"]) {
    return done({ shouldStop: true });
  }

  // Setting the stream date
  let currentDate = new Date();
  let formatCurrentDate = currentDate.toISOString().split('T')[0];
  let lastDayUsed = await getStoreItem('lastDayUsed');

  // Reset the list each date
  if (lastDayUsed !== formatCurrentDate) {
    await Promise.all([setStore({ name: 'greetedUsers', value: null }), setStore({ name: "lastDayUsed", value: formatCurrentDate })]);
    var greetedUsers = [];
  }

  greetedUsers = await getStoreItem('greetedUsers');
  // if the greeted variable is null that means it has been reset because the date changes so we are in a new stream
  if (!greetedUsers) {
    greetedUsers = [];
    await setStore({ name: "lastDayUsed", value: formatCurrentDate });
  }

  //if the username is already greeted it wont do it again
  if (!greetedUsers.includes("{{username}}")) {
    greetedUsers.push("{{username}}");

    //playAudio({ path: usersToGreet["{{username}}"], volume: 100, waitForAudioToStop: false });
    await setStore({ name: 'greetedUsers', value: greetedUsers })
  }

  done();
}