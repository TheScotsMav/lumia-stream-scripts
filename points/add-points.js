async function() {
  // Get the current viewers from the twitch_current_viewers variable
  // Get the message from the message variable
  // Get the store from the viewersInfo store
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

  // Get the username and points to add
  const username = messageParts[0].toLowerCase().replace("@", "");
  const pointsToAdd = parseInt(messageParts[1])

  // Check that the user is in chat
  // If they are not in chat, return
  if (!twitchCurrentViewers.includes(username)) {
    chatbot({ message: "Invalid name or they are not in chat" });
    return done();
  }
  // Check that the points to add is a valid number
  // If it's not a valid number, return
  if (!pointsToAdd) {
    chatbot({ message: "Cannot add points, invalid number" });
    return done();
  }

  // Check if the user exists in the store
  if (viewersInfo[username]) {
    // Add the points to the user
    viewersInfo[username].points = viewersInfo[username].points ? viewersInfo[username].points + pointsToAdd : pointsToAdd;
  } else {
    // If the user doesn't exist in the store, create them
    // Set their points to the points to add
    viewersInfo[username] = { points: pointsToAdd };
  }

  // Save the store and send a message to chat
  await setStore({ name: "viewersInfo", value: viewersInfo });
  chatbot({ message: `Points added ${username} now has ${viewersInfo[username].points} points` });

  // Make sure you call done() to avoid memory leaks
  done();
}