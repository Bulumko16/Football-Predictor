const API_KEY = '9e5e6d8095f1439cbb025efffa728172';  // Replace with your own API Key
const BASE_URL = 'https://api.football-data.org/v4/';
// Fetch League Standings
async function getLeagueStandings(competitionId) {
    const response = await fetch(`${BASE_URL}competitions/${competitionId}/standings`, {
        headers: {
            'X-Auth-Token': API_KEY,
        },
    });
    const data = await response.json();
    displayLeagueStandings(data);
}

// Display the League Standings
function displayLeagueStandings(data) {
    const standingsContainer = document.getElementById('league-standings');
    standingsContainer.innerHTML = '<h2>League Standings</h2>';  // Clear previous content

    const standings = data.standings[0].table;
    standings.forEach(team => {
        const teamRow = document.createElement('div');
        teamRow.classList.add('team-row');
        teamRow.innerHTML = `
            <span>${team.position}</span>
            <span>${team.team.name}</span>
            <span>${team.points}</span>
        `;
        standingsContainer.appendChild(teamRow);
    });
}
// Fetch Match Scores for a given league
async function getMatchScores(competitionId) {
    const response = await fetch(`${BASE_URL}competitions/${competitionId}/matches`, {
        headers: {
            'X-Auth-Token': API_KEY,
        },
    });
    const data = await response.json();
    displayMatchScores(data);
}

// Display Match Scores
function displayMatchScores(data) {
    const scoresContainer = document.getElementById('match-scores');
    scoresContainer.innerHTML = '<h2>Match Scores</h2>';  // Clear previous content

    data.matches.forEach(match => {
        const matchRow = document.createElement('div');
        matchRow.classList.add('match-row');
        matchRow.innerHTML = `
            <span>${match.homeTeam.name} vs ${match.awayTeam.name}</span>
            <span>${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}</span>
        `;
        scoresContainer.appendChild(matchRow);
    });
}
// Fetch Team Squad
async function getTeamSquad(teamId) {
    const response = await fetch(`${BASE_URL}teams/${teamId}`, {
        headers: {
            'X-Auth-Token': API_KEY,
        },
    });
    const data = await response.json();
    displayTeamSquad(data);
}

// Display Team Squad
function displayTeamSquad(data) {
    const squadContainer = document.getElementById('team-squad');
    squadContainer.innerHTML = '<h2>Team Squad</h2>';  // Clear previous content

    data.squad.forEach(player => {
        const playerRow = document.createElement('div');
        playerRow.classList.add('player-row');
        playerRow.innerHTML = `
            <span>${player.name}</span>
            <span>${player.position}</span>
        `;
        squadContainer.appendChild(playerRow);
    });
}
// Handle Score Submission
document.getElementById('submit-score-btn').addEventListener('click', function() {
    const homeScore = document.getElementById('home-team-score').value;
    const awayScore = document.getElementById('away-team-score').value;

    if (homeScore && awayScore) {
        // Call function to update the standings based on this score (you can implement this logic)
        alert(`You submitted: ${homeScore} - ${awayScore}`);
    }
});
// Populate Leagues Dropdown
async function populateLeaguesDropdown() {
    const leagues = [
        { name: 'Premier League', id: 'PL' },
        { name: 'Championship', id: 'EC' },
        { name: 'League One', id: 'EL1' },
        { name: 'La Liga', id: 'SP1' },
        { name: 'Segunda Division', id: 'SP2' },
        { name: 'Bundesliga', id: 'BL1' },
        { name: '2. Bundesliga', id: 'BL2' },
        { name: 'Serie A', id: 'IT1' },
        { name: 'Serie B', id: 'IT2' },
        { name: 'Ligue 1', id: 'FR1' },
        { name: 'Ligue 2', id: 'FR2' }
    ];

    const dropdown = document.querySelector('#england-leagues');  // Modify for other countries
    leagues.forEach(league => {
        const option = document.createElement('option');
        option.value = league.id;
        option.innerText = league.name;
        dropdown.appendChild(option);
    });
}

// Call this function to populate leagues dropdown
populateLeaguesDropdown();
// Poll every 60 seconds
setInterval(() => {
    getLeagueStandings('PL');
    getMatchScores('PL');
}, 60000);  // Refresh every minute

