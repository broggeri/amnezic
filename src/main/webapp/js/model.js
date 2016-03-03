angular.module('model',[])

// //////////////////////////////////////////////////
// Game

.factory('Game', function () {

    // //////////////////////////////////////////////////
    // constructor

    function Game() {
        this.players = [];
        this.questions = [];
        this.question = null;
        this.question_history = [];
    }

    // //////////////////////////////////////////////////
    // static

    Game.create = function(json) {
        var game = new Game();
        return game;
    };

    // //////////////////////////////////////////////////
    // public

    Game.prototype.add_player = function(player) {
        this.players.push(player);
    };

    Game.prototype.add_question = function(question) {
        this.questions.push(question);
    };

    Game.prototype.start = function() {
        this.next();
    };

    Game.prototype.next = function() {
        move_to_next_question();
        if (!this.question) {
            this.end();
        }
    };

    Game.prototype.end = function() {
        // to implement
    };

    // //////////////////////////////////////////////////
    // private

    function move_to_next_question() {
        if (this.question) {
            this.question_history.push(this.question);
        }
        if (this.questions.length > 0) {
            this.question = this.questions.shift();
            return this.question;
        }
        return null;
    }

    return Game;
})

// //////////////////////////////////////////////////
// Player

.factory('Player', function () {

    // //////////////////////////////////////////////////
    // constructor

    function Player(name, symbol) {
        this.name = name;
        this.symbol = symbol;
        this.score = 0;
    }

    // //////////////////////////////////////////////////
    // static

    Player.create = function(name, symbol) {
        var player = new Player(name, symbol);
        return player;
    };

    return Player;
})

// //////////////////////////////////////////////////
// Question

.factory('Question', function () {

    // //////////////////////////////////////////////////
    // constructor

    function Question() {
        this.theme = null;
        this.mp3 = null;
        this.choices = [];
    }

    // //////////////////////////////////////////////////
    // static

    Question.create = function() {
        var question = new Question();
        return question;
    };

    // //////////////////////////////////////////////////
    // public

    Question.prototype.add_choice = function(choice) {
        this.choices.push(choice);
    };

    return Question;
})

// //////////////////////////////////////////////////
// Choice

.factory('Choice', function () {

    // //////////////////////////////////////////////////
    // constructor

    function Choice(answer, hint, correct) {
        this.answer = answer;
        this.hint = hint;
        this.correct = (correct=== true);
    }

    // //////////////////////////////////////////////////
    // static

    Choice.create = function(answer, hint, correct) {
        var choice = new Choice(answer, hint, correct);
        return choice;
    };

    return Choice;
})