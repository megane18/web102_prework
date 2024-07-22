/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)
//console.log(GAMES_JSON.length)


// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");


// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
        for (let i = 0; i<games.length; i++){
             // create a new div element, which will become the game card
            const newDiv = document.createElement('div')
            
        // add the class game-card to the list
        newDiv.classList.add('game-card')


        // set the inner HTML using a template literal to display some info 
        // about each game
         // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")

        newDiv.innerHTML = `

        <img src="${games[i].img}" alt="${games[i].name}" class="game-img">
            <h3>${games[i].name}</h3>
            <p>${games[i].description}</p>
            <p class="backers">Backers: ${games[i].backers}</p>
        `;
        // <h1>${games[i].name}</h1>
        // <p>${games[i].description}</p>
        // <img src ='${games[i].img}' alt='${games[i].name}' /> 
        // <p>${games[i].backers}</p>`;
       


        // append the game to the games-container
        gamesContainer.appendChild(newDiv)

        }

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
// addGamesToPage(GAMES_JSON)

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, games) => {
    return acc + games.backers
}, 0)


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<h1>${totalContributions.toLocaleString()}</h1>`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, games)=>{
    return acc + games.pledged
}, 0)
// set inner HTML using template literal
raisedCard.innerHTML=`<h1>$${totalRaised.toLocaleString()}</h1>`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;

gamesCard.innerHTML=`<h1>${totalGames}</h1>`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    console.log(unfundedGames.length)

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames)

}

filterUnfundedOnly()

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    console.log(fundedGames.length)


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames)
}
//filterFundedOnly()

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)

}
// showAllGames()

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly)
fundedBtn.addEventListener("click", filterFundedOnly)
allBtn.addEventListener("click", showAllGames)

showAllGames()

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const totalCountUnfunded = GAMES_JSON.filter(game => game.pledged < game.goal). length
// create a string that explains the number of unfunded games using the ternary operator
const totalRaisedDescription = GAMES_JSON.reduce((acc, game)=> acc + game.pledged, 0).toLocaleString()
const games = GAMES_JSON.length;
const unfundedGamesString = totalCountUnfunded === 1 ? "game" : "games";
const descriptionString = `A total of $${totalRaisedDescription} has been raised for ${games} games. Currently, ${totalCountUnfunded} ${unfundedGamesString} remain unfunded.`;

// create a new DOM element containing the template string and append it to the description container
const newParagraph = document.createElement("p");
newParagraph.textContent = descriptionString;
descriptionContainer.appendChild(newParagraph);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const[firstGame, secondGame] = sortedGames
console.log(firstGame.name)//to get the secret key #1
console.log(secondGame.name)//to get the secret key #2
// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("p");
firstGameElement.textContent = firstGame.name;
firstGameContainer.appendChild(firstGameElement);

// do the same for the runner up item
const secondGameElement = document.createElement("p");
secondGameElement.textContent = secondGame.name;
secondGameContainer.appendChild(secondGameElement);

//search bar
// JavaScript to filter games based on search input
const searchBar = document.getElementById("search-bar");


searchBar.addEventListener("input", (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredGames = GAMES_JSON.filter(game => game.name.toLowerCase().includes(searchQuery));
    deleteChildElements(gamesContainer);
    addGamesToPage(filteredGames);
});


// function movePeriods() {
//     const searchBar = document.getElementById('search-bar');
//     let placeholder = searchBar.placeholder;
    
//     if (placeholder.endsWith('...')) {
//       searchBar.placeholder = placeholder.slice(0, -2) + '....';
//     } else if (placeholder.endsWith('....')) {
//       searchBar.placeholder = placeholder.slice(0, -3) + '.....';
//     } else if (placeholder.endsWith('.....')) {
//       searchBar.placeholder = placeholder.slice(0, -4) + '...';
//     }
//   }

//   // Move periods every 2 seconds
//   setInterval(movePeriods, 2000);

let originalPlaceholder = "Search for a game...";
      let intervalId;

      function movePeriods() {
        let placeholder = searchBar.placeholder;
        
        if (placeholder.endsWith('...')) {
          searchBar.placeholder = placeholder.slice(0, -2) + '....';
        } else if (placeholder.endsWith('....')) {
          searchBar.placeholder = placeholder.slice(0, -3) + '.....';
        } else if (placeholder.endsWith('.....')) {
          searchBar.placeholder = placeholder.slice(0, -4) + '...';
        }
      }

      function startMovingPeriods() {
        intervalId = setInterval(movePeriods, 2000);
      }

      function stopMovingPeriods() {
        clearInterval(intervalId);
      }

      // Start moving periods initially
      startMovingPeriods();

      // Remove placeholder on focus
      searchBar.addEventListener('focus', function() {
        stopMovingPeriods();
        this.placeholder = '';
      });

      // Restore placeholder on blur
      searchBar.addEventListener('blur', function() {
        if (this.value === '') {
          this.placeholder = originalPlaceholder;
          startMovingPeriods();
        }
      });