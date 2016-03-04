angular.module('amnezic',['model','ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/start', {
            templateUrl: 'tpl/start.html',
            controller: 'controller'
        })
        .when('/players', {
            templateUrl: 'tpl/players.html',
            controller: 'controller'
        })
        .when('/question/:question_id', {
            templateUrl: 'tpl/question.html',
            controller: 'controller'
        })
        .when('/score', {
            templateUrl: 'tpl/score.html',
            controller: 'controller'
        })
        .when('/end', {
            templateUrl: 'tpl/end.html',
            controller: 'controller'
        })
        .otherwise({
            redirectTo: '/start'
        });
}])

.controller('controller', ['$scope', '$routeParams', '$http', 'create', function ($scope, $routeParams, $http, create) {

    if ( !$scope.game ) {

        console.log( 'init game' );

        // create dummy players

        $scope.game = create.game()
                .add_player( create.player('Marion','M') .set_score( create.score(30) ) )
                .add_player( create.player('Bruno','B').set_score( create.score(20) ) )
                .add_player( create.player('Gregory','G').set_score( create.score(10) ) );

        // load questions from file

        $http.get( 'mock/game.json' ).then( function( response ) {
            console.log( 'load questions from file' );
            var json = response.data;
            for ( var i in json['questions'] ) {
                var json_question = json['questions'][i];
                // console.log(json_question);
                var question = create.question()
                    .set_audio( create.audio( json_question['audio']['mp3'] ) )
                    .set_theme( create.theme( json_question['theme']['genre'] ) );
                for ( var j in json_question['choices'] ) {
                    var json_choice = json_question['choices'][j];
                    // console.log(json_choice);
                    question.add_choice( create.choice( json_choice['answer'], json_choice['hint'], json_choice['correct'] ) );
                }
                $scope.game.add_question(question);
            }
            console.log( $scope.game );
            return response.data;
        });
    }

    // quick selection of current question

    $scope.question_id = $routeParams.question_id ? parseInt( $routeParams.question_id ) : 0;
    $scope.question = null;
    if ($scope.question_id && (0 < $scope.question_id) && ($scope.question_id <= $scope.game.questions.length)) {
        $scope.question = $scope.game.questions[$routeParams.question_id-1];
    }

}]);
