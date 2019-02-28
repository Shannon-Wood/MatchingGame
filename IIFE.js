// IIFE
// Immediately Invoiked Function Expression
// This is a simple IIFE  *********
const App = (function(d) {


}(document));





// This is a complete sample code of IIFE  *********

const App = (function(d) {

    let app = {};

    let button = d.getElementById('button');

    app.init = function(){
      endGame(button);
    };

    app.startGame = function(){
      // do somthing
    }


    function endGame(button){
      document.getElementById('end-game').addEventListener('click', function (){
        // end our game
      });
    }

    return app;

}(document));

App.init();
