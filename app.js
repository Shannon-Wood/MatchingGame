"use strict";

/**
*   classList
*   @see https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
*
*   HTML Dataset
*   @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
*/

const MatchingGameApp = (function(){

    let app = {};
    let picks = [];
    let timer;

    let students = [
      'Shannon the Great',
      'Judy the Late',
      'Jordan the Designer',
      'Yara the Employeed',
      'Amanda the Teacher',
      'Barbara the Mom',
      'Kyle aka Mr. Doughnut',
      'Alicia the Sportster',
      'Steve the Horseman'
    ];

    app.init = function() {
      console.log("MatchingGameApp Loaded");
      startGame();
      resetGame();
    };

    function startGame() {
      //add event listen to button
      document.getElementById('gamecontrol').addEventListener('click', function(){
        document.querySelectorAll('.card').forEach(function (card) {
          card.classList.remove('selected', 'match');
          //remove the 'hidden' class from all of our card's logos.
          card.querySelector('.array-logo').classList.remove('hidden');
        });
        assignCards();
        selectCard();
        startTime();
      });
    }


    function resetGame() {
      document.getElementById('resetcontrol').addEventListener('click', function(){
        location.reload();
      });
    }

    function startTime() {
      clearInterval(timer);
      document.getElementById('timer').innerHTML = '0:00';
      timer = setInterval(function(){
        let currTime = document.getElementById('timer').innerHTML,
            min = new Number (currTime.split(':')[0]),
            sec = new Number (currTime.split(':')[1]);
        sec = sec + 1;
        if (sec == 60) {
          min = min + 1;
          sec = 0;
        }
        document.getElementById('timer').innerHTML = min.toString() + ':' + (sec < 10 ? '0' + sec.toString() : sec.toString())

      },1000);
    }

    function assignCards() {
      let studentsDoubled = students.concat(students).sort(function() {
        return 0.5 - Math.random();
      });
      document.querySelectorAll('.card').forEach(function(card) {
        let name = studentsDoubled.shift();
        card.dataset.name = name;
        card.querySelector('.student-name').innerHTML = name;
      });
    }

    function selectCard() {
      //select all cards
      document.querySelectorAll('.card').forEach(function (card) {
        //add an event listener to each card
        card.addEventListener('click', function() {
          // EARLY OUT: prevents users from clicking selected card twice.
          if(card.classList.contains('selected')){
            return;
          }

          //when card is clicked add the 'selected' class
          card.classList.add('selected');
          picks.push(card);
          if(picks.length === 2){
            setTimeout(function() {
              compareCards();
              picks = [];

            }, 800)
          }
        });
      });
    }

    function compareCards() {
      if (picks[0].dataset.name !== picks[1].dataset.name) {
        picks.forEach(function(card) {
          card.classList.remove('selected');
        });
      } else {
        picks.forEach(function(card){
          card.classList.add('match');
        });
        if (document.querySelectorAll('.card.match').length === 18) {
          clearInterval(timer);
        }
      }
    }

    return app;

}());

document.addEventListener("DOMContentLoaded", function(){
  MatchingGameApp.init();
});
