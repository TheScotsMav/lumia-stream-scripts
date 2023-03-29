async function() {
  // Set the point rate while live and not live
  const pointRateWhileLive = 10;
  const pointRateWhileNotLive = 0;

  // Get the current viewers from the twitch_current_viewers variable
  // Get the twitch_live variable
  // Get the store from the viewersInfo store
  let [viewersInfo, twitchCurrentViewers, twitchLive] = await Promise.all([getStoreItem("viewersInfo"), getVariable("twitch_current_viewers"), getVariable("twitch_live")])
  
  // Split the current viewers into an array
  const currentViewers = twitchCurrentViewers.split(", ")

  // Check if the store exists
  // Store will not exist if it's the first time any points script is run
  // or if the store has been reset
  if (!viewersInfo) {
    // If it doesn't, create it
    viewersInfo = {}
  }

  // Set the current point rate
  const currentRate = twitchLive ? pointRateWhileLive : pointRateWhileNotLive;

  // Loop through the current viewers
  currentViewers.forEach((viewerUsername) => {
    // Check if the viewer exists in the store
    if (viewersInfo[viewerUsername]) {
      // Add the points to the viewer
      viewersInfo[viewerUsername].points = viewersInfo[viewerUsername].points ? viewersInfo[viewerUsername].points + currentRate : currentRate;
    } else {
      // If the viewer doesn't exist in the store, create them
      // Set their points to the current point rate
      viewersInfo[viewerUsername] = { points: currentRate };
    }
  })

  // Save the store
  await setStore({ name: "viewersInfo", value: viewersInfo });

  // Make sure you call done() to avoid memory leaks
  done();
}