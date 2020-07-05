var highscoresTable = document.getElementById("highscores-table");
var btnReturn = document.getElementById("btn-return-to-quiz");
var btnClear = document.getElementById("btn-clear-highscores");


document.addEventListener("DOMContentLoaded", function (event) {
    highscoresTable.innerHTML = ""; //clear table inner html
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    var newScore = JSON.parse(localStorage.getItem("newScore"));
    var scoresArray = []; // array will be empty until populated by stored scores, or new score
    if(storedScores != null){ // if there are stored scores
        scoresArray = storedScores;//populate the scores array
    }
    if(newScore != null){ // if there is a new score in local storage
        //add new score to scores array
        scoresArray.push(newScore);
        localStorage.removeItem("newScore");
        //sort scores array
        scoresArray.sort((a,b) => b[1] - a[1]); // arrow function compares score entries by score number (2nd item in array)
        //if a is higher value than b, a will sort to a lower array index
    }
    
    if(scoresArray != []){ // if scoresArray is not empty array
        //populate highscores
        for(var i =0; i<scoresArray.length; i++){ // for each score entry, create a three column row with rank, initials, and score
            var tableRow = document.createElement("tr");
            var tableCol1 = document.createElement("th"); // rank col
            tableCol1.scope = "row";
            tableCol1.innerText = i + 1; // first score at i = 0
            var tableCol2 = document.createElement("td");
            tableCol2.innerText = scoresArray[i][0]; // get initials at current index of scorearray
            var tableCol3 = document.createElement("td");
            tableCol3.innerText = scoresArray[i][1]; //get score at current index of scorearray
            //append columns to row, append row to table
            tableRow.appendChild(tableCol1);
            tableRow.appendChild(tableCol2);
            tableRow.appendChild(tableCol3);
            highscoresTable.appendChild(tableRow);
        }
        //store sorted scores array
        localStorage.setItem("scores", JSON.stringify(scoresArray));
    }

    btnReturn.addEventListener("click", function(){
        document.location.href = "index.html";// return to main quiz page
    });
    btnClear.addEventListener("click", function(){
        highscoresTable.innerHTML = "Highscores Cleared";
        localStorage.removeItem("scores");
    })


});