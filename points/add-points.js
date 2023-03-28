async function() {
  [viewersInfo, twitchCurrentViewers, message] = await Promise.all([getStoreItem("viewersInfo"), getVariable("twitch_current_viewers"), getVariable("message")]);
  const messageParts = message.split(" ");

  const username = messageParts[0].toLowerCase().replace("@", "");
  const pointsToAdd = parseInt(messageParts[1])

  if (!twitchCurrentViewers.includes(username)) {
    chatbot({ message: "Invalid name or they are not in chat" });
    return done();
  }
  if (!pointsToAdd) {
    chatbot({ message: "Cannot add points, invalid number" });
    return done();
  }

  if (viewersInfo[username]) {
    viewersInfo[username].points = viewersInfo[username].points ? viewersInfo[username].points + pointsToAdd : pointsToAdd;
  } else {
    viewersInfo[username] = { points: pointsToAdd };
  }

  await setStore({ name: "viewersInfo", value: viewersInfo });
  chatbot({ message: `Points added ${username} now has ${viewersInfo[username].points} points` });

  // Make sure you call done() to avoid memory leaks
  done();
}