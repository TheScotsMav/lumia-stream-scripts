async function() {
  // Get the store, current viewers and message
  [viewersInfo, twitchCurrentViewers, message] = await Promise.all([getStoreItem("viewersInfo"), getVariable("twitch_current_viewers"), getVariable("message")]);
  // Split the message into parts
  const messageParts = message.split(" ");

  // Check if the store exists
  // Store will not exist if it's the first time any points script is run
  // or if the store has been reset
  if (!viewersInfo) {
    // If it doesn't, create it
    viewersInfo = {}
  }

  // Get the username and points to remove
  const username = messageParts[0].toLowerCase().replace("@", "");
  const pointsToRemove = parseInt(messageParts[1])

  // Check that the user is in chat
  // If they are not in chat, return
  if (!twitchCurrentViewers.includes(username)) {
    chatbot({ message: "Invalid name or they are not in chat" });
    return done();
  }
  // Check that the points to remove is a valid number
  // If it's not a valid number, return
  if (!pointsToRemove) {
    chatbot({ message: "Cannot remove points, invalid number" });
    return done();
  }

  // Check if the user exists in the store
  if (viewersInfo[username]) {
    // Check if the user has enough points to remove
    // If they do, remove the points
    // If they don't, set their points to 0
    viewersInfo[username].points = (viewersInfo[username].points && viewersInfo[username].points > pointsToRemove) ? viewersInfo[username].points - pointsToRemove : 0;
  } else {
    // If the user doesn't exist in the store, create them
    // Set their points to 0
    viewersInfo[username] = { points: 0 };
  }

  // Save the store and send a message to chat
  await setStore({ name: "viewersInfo", value: viewersInfo });
  chatbot({ message: `Points removed from ${username} now has ${viewersInfo[username].points} points` });

  // Make sure you call done() to avoid memory leaks
  done();
}