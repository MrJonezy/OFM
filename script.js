// app.js

// DOM Elements
const loginScreen = document.getElementById("loginScreen");
const teamSelectionScreen = document.getElementById("teamSelectionScreen");
const playerManagementScreen = document.getElementById("playerManagementScreen");
const matchSimulationScreen = document.getElementById("matchSimulationScreen");

const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const loginButton = document.getElementById("loginButton");
const teamList = document.getElementById("teamList");
const startButton = document.getElementById("startButton");
const playerList = document.getElementById("playerList");
const backButton = document.getElementById("backButton");
const matchResult = document.getElementById("matchResult");
const playAgainButton = document.getElementById("playAgainButton");
const quitButton = document.getElementById("quitButton");

// Store logged-in user's data
let loggedInUser = null;

// Fetch team data from API
const fetchTeams = async () => {
  try {
    const response = await fetch("api/teams");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch teams:", error);
  }
};

// Fetch player data from API
const fetchPlayers = async () => {
  try {
    const response = await fetch("api/players");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch players:", error);
  }
};

// Update team list on team selection screen
const updateTeamList = (teams) => {
  teamList.innerHTML = "";
  teams.forEach((team) => {
    const listItem = document.createElement("li");
    listItem.textContent = team.name;
    teamList.appendChild(listItem);
  });
};

// Update player list on player management screen
const updatePlayerList = (players) => {
  playerList.innerHTML = "";
  players.forEach((player) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${player.name}</td>
      <td>${player.position}</td>
      <td>${player.age}</td>
      <td>${player.value}</td>
    `;
    playerList.appendChild(row);
  });
};

// Show/hide screens
const showScreen = (screen) => {
  screen.classList.remove("hidden");
};

const hideScreen = (screen) => {
  screen.classList.add("hidden");
};

// Event listeners

// Login button click event
loginButton.addEventListener("click", async () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  // Authenticate user and fetch teams data
  const response = await fetch("api/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (data && data.loggedInUser) {
    loggedInUser = data.loggedInUser;
    hideScreen(loginScreen);
    updateTeamList(data.teams);
    showScreen(teamSelectionScreen);
  } else {
    // Show error message for invalid login
    alert("Invalid username or password. Please try again.");
  }
});

// Start button click event
startButton.addEventListener("click", async () => {
  // Fetch players data and update player list
  const players = await fetchPlayers();
  updatePlayerList(players);

  hideScreen(teamSelectionScreen);
  showScreen(playerManagementScreen);
});

// Back button click event
backButton.addEventListener("click", () => {
  hideScreen(playerManagementScreen);
  showScreen
