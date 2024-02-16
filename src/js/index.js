async function fetchHtml(url) {
  try {
    // Make an HTTP GET request to the website
    const response = await fetch(url);

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Parse the response as text
    const json = await response.text();

    // Return the HTML content
    return json;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error; // Rethrow the error to handle it further if needed
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const json = await fetchHtml(
      "https://www.fangraphs.com/api/projections?pos=all&stats=bat&type=atc&statgroup=dashboard"
    );

    // Process the HTML content
    console.log(json);
    const jsonArray = JSON.parse(json);

    const playerStats = [];
    jsonArray.forEach((playerData) => {
      playerStats.push({
        Name: playerData["PlayerName"],
        Team: playerData["Team"],
        Games: playerData["G"].toFixed(0),
        AtBats: playerData["AB"].toFixed(0),
        HR: playerData["HR"].toFixed(0),
        Runs: playerData["R"].toFixed(0),
        RBI: playerData["RBI"].toFixed(0),
        AVG: playerData["AVG"].toFixed(3).replace(/^0+/, ""),
        OBP: playerData["OBP"].toFixed(3).replace(/^0+/, ""),
        SB: playerData["SB"].toFixed(0),
        ZackVal: "$" + (playerData["HR"] + playerData["R"]).toFixed(0),
      });
    });
    console.log(playerStats[0]);
    let i = 0;
    function createGridItem(item) {
      const gridItem = document.createElement("div");
      gridItem.classList.add("grid-item");
      i += 1;
      gridItem.innerHTML = `
      <div class="grid-player-content grid-player-num">${i}</div>
            <div class="grid-player-content grid-player-name">${item.Name}</div>
            <div class="grid-player-content grid-player-stats">${item.Team}</div>
            <div class="grid-player-content grid-player-stats">${item.Games}</div>
            <div class="grid-player-content grid-player-stats">${item.AtBats}</div>
            <div class="grid-player-content grid-player-stats rotocat">${item.Runs}</div>
            <div class="grid-player-content grid-player-stats rotocat">${item.HR}</div>
            <div class="grid-player-content grid-player-stats rotocat">${item.RBI}</div>
            <div class="grid-player-content grid-player-stats rotocat">${item.SB}</div>
            <div class="grid-player-content grid-player-stats rotocat">${item.AVG}</div>
            <div class="grid-player-content grid-player-stats rotocat">${item.OBP}</div>
            <div class="grid-player-content grid-player-stats zackval">${item.ZackVal}</div>
        `;
      return gridItem;
    }

    function renderGrid(data) {
      const gridContainer = document.getElementById("analyzer-grid-container");
      data.forEach((item) => {
        const gridItem = createGridItem(item);
        gridContainer.appendChild(gridItem);
      });
    }

    renderGrid(playerStats.slice(0, 10));
  } catch (error) {
    // Handle errors
    console.error("An error occurred:", error);
  }
});
