async function() {
  const pointRateWhileLive = 10;
  const pointRateWhileNotLive = 0;

  let [viewersInfo, twitchCurrentViewers, twitchLive] = await Promise.all([getStoreItem("viewersInfo"), getVariable("twitch_current_viewers"), getVariable("twitch_live")])
  const currentViewers = twitchCurrentViewers.split(", ")

  if (!viewersInfo) {
    viewersInfo = {}
  }

  const currentRate = twitchLive ? pointRateWhileLive : pointRateWhileNotLive;

  currentViewers.forEach((viewerUsername) => {
    if (viewersInfo[viewerUsername]) {
      viewersInfo[viewerUsername].points = viewersInfo[viewerUsername].points ? viewersInfo[viewerUsername].points + currentRate : currentRate;
    } else {
      viewersInfo[viewerUsername] = { points: currentRate };
    }
  })

  await setStore({ name: "viewersInfo", value: viewersInfo });

  // Make sure you call done() to avoid memory leaks
  done();
}