angular.module('model',['ngResource'])

// //////////////////////////////////////////////////
// Game

.factory('create', ['Game', 'Player', 'Score', 'Question', 'Theme', 'Audio', 'Choice', function (Game, Player, Score, Question, Theme, Audio, Choice) {

    // //////////////////////////////////////////////////
    // constructor

    function create() {
    }

    // //////////////////////////////////////////////////
    // static

    create.game = function() {
        return new Game();
    };

    create.player = function(name, symbol) {
        return new Player(name, symbol);
    };

    create.score = function(points) {
        return new Score(points);
    };

    create.question = function() {
        return new Question();
    };

    create.theme = function(title) {
        return new Theme(title);
    };

    create.audio = function(mp3) {
        return new Audio(mp3);
    };

    create.choice = function(answer, hint, correct) {
        return new Choice(answer, hint, correct);
    };

    return create;
}])

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
    // public

    Game.prototype.add_player = function(player) {
        this.players.push(player);
        return this;
    };

    Game.prototype.add_question = function(question) {
        this.questions.push(question);
        return this;
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
        this.score = null;
    }

    // //////////////////////////////////////////////////
    // public

    Player.prototype.set_score = function(score) {
        this.score = score;
        return this;
    };

    return Player;
})

// //////////////////////////////////////////////////
// Score

.factory('Score', function () {

    // //////////////////////////////////////////////////
    // constructor

    function Score(points) {
        this.points = points;
    }

    return Score;
})

// //////////////////////////////////////////////////
// Question

.factory('Question', function () {

    // //////////////////////////////////////////////////
    // constructor

    function Question() {
        this.theme = null;
        this.audio = null;
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

    Question.prototype.set_theme = function(theme) {
        this.theme = theme;
        return this;
    };

    Question.prototype.set_audio = function(audio) {
        this.audio = audio;
        return this;
    };

    Question.prototype.add_choice = function(choice) {
        this.choices.push(choice);
        return this;
    };

    return Question;
})

// //////////////////////////////////////////////////
// Theme

.factory('Theme', function () {

    // //////////////////////////////////////////////////
    // constructor

    function Theme(title) {
        this.title = title;
    }

    // //////////////////////////////////////////////////
    // static

    Theme.create = function(title) {
        var theme = new Theme(title);
        return theme;
    };

    return Theme;
})

// //////////////////////////////////////////////////
// Audio

.factory('Audio', function () {

    // //////////////////////////////////////////////////
    // constructor

    function Audio(mp3) {
        this.mp3 = mp3;
    }

    // //////////////////////////////////////////////////
    // static

    Audio.create = function(mp3) {
        var audio = new Audio(mp3);
        return audio;
    };

    return Audio;
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