angular.module('amnezic',['model'])

.controller('controller', ['$scope', 'Game', 'Player', function ($scope, Game, Player) {
    var game = Game.create();
    game.add_player(Player.create('Marion','M'));
    game.add_player(Player.create('Bruno','B'));
    game.add_player(Player.create('Gregory','G'));
    $scope.game = game;
}]);
