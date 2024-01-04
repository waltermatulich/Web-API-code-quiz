function printHighscores() {
    // Get scores from the local storage or set to an empty array

    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    
// Sort highscores properly in greatest to least!

    highscores.sort (function(a, b){
      return b.score - a.score;

    });
  
    highscores.forEach(function(score) {
      // Li tag creation for each high score

      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
  

      // Page display

      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });

  }
  
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }

  
  document.getElementById("clear").onclick = clearHighscores;
  
  // Function will Run when API loads



  printHighscores();