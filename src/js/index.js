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

document
  .getElementById("sign-out-button")
  .addEventListener("click", function () {
    window.location.href = "signin.html";
  });

// function generateUniqueId(prefix) {
//   return prefix + Math.random().toString(36).substr(2, 9);
// }
// Example usage:
//var uniqueId = generateUniqueId("lineup-");
//console.log(uniqueId); // Output: lineup-abc123

document
  .getElementById("lineup-roster")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("minus")) {
      event.target.closest(".lineup-item-container").remove();
    }
  });

document
  .getElementById("lineup-roster")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("lineup-item-player")) {
      /// new trigger player search
      console.log("playyer clciked");
      //event.target.classList.add("hidden");
    }
  });

document
  .getElementById("lineup-position-creator")
  .addEventListener("click", function () {
    // add html
    console.log("clicked");
    var dropdown = document.getElementById("lineup-position-creator-dropdown");
    var selectedValue = dropdown.value;

    // Create new lineup item container
    var lineupItemContainer = document.createElement("div");
    lineupItemContainer.classList.add("lineup-item-container");
    //lineupItemContainer.id = "lineup1"; // You can set dynamic ID based on some condition

    // Create lineup position div
    var lineupPosition = document.createElement("div");
    lineupPosition.classList.add("lineup-position");

    // Create minus and plus buttons
    var minusButton = document.createElement("div");
    minusButton.classList.add("lineup-position-toggle", "minus");
    minusButton.textContent = "-";

    var plusButton = document.createElement("div");
    plusButton.classList.add("lineup-position-toggle", "plus");
    plusButton.textContent = "+";

    // Append buttons to lineup position div
    lineupPosition.appendChild(minusButton);
    lineupPosition.appendChild(document.createTextNode(selectedValue));
    lineupPosition.appendChild(plusButton);

    // Create lineup item div
    var lineupItem = document.createElement("div");
    lineupItem.classList.add("lineup-item");

    // Create lineup item content divs
    var lineupItemContents = ["Player here", " ", " ", " ", " ", " ", " ", " "];

    lineupItemContents.slice(0, 1).forEach(function (content) {
      var lineupItemContent = document.createElement("div");
      lineupItemContent.classList.add("lineup-item-content");
      lineupItemContent.classList.add("lineup-item-player");
      lineupItemContent.textContent = content;
      lineupItem.appendChild(lineupItemContent);
    });
    lineupItemContents.slice(1, 7).forEach(function (content) {
      var lineupItemContent = document.createElement("div");
      lineupItemContent.classList.add("lineup-item-content");
      lineupItemContent.classList.add("lineup-item-stat");
      lineupItemContent.textContent = content;
      lineupItem.appendChild(lineupItemContent);
    });
    lineupItemContents.slice(-1).forEach(function (content) {
      var lineupItemContent = document.createElement("div");
      lineupItemContent.classList.add("lineup-item-content");
      lineupItemContent.classList.add("lineup-item-value");
      lineupItemContent.textContent = content;
      lineupItem.appendChild(lineupItemContent);
    });

    // Append lineup position and lineup item to lineup item container
    lineupItemContainer.appendChild(lineupPosition);
    lineupItemContainer.appendChild(lineupItem);

    // Get the output container
    var outputContainer = document.getElementById("lineup-roster");
    // Append the new lineup item container to the output container
    outputContainer.appendChild(lineupItemContainer);
  });
