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

.controller('controller', ['$scope', '$routeParams', 'create', function ($scope, $routeParams, create) {
    $scope.game = create.game()
        .add_player(
            create.player('Marion','M')
                .set_score(
                    create.score(30)
                )
        )
        .add_player(
            create.player('Bruno','B')
                .set_score(
                    create.score(20)
                )
        )
        .add_player(
            create.player('Gregory','G')
                .set_score(
                    create.score(10)
                )
        )

        .add_question(
            create.question()
                .set_theme(
                    create.theme('rock')
                )
                .set_audio(
                    create.audio('rock.mp3')
                )
                .add_choice(
                    create.choice('artiste 1', 'chanson 1')
                )
                .add_choice(
                    create.choice('artiste 2', 'chanson 2', true)
                )
                .add_choice(
                    create.choice('artiste 3', 'chanson 3')
                )
        )
        .add_question(
            create.question()
                .add_choice(
                    create.choice('artiste 4', 'chanson 4', true)
                )
                .add_choice(
                    create.choice('artiste 5', 'chanson 5', true)
                )
        )
        .add_question(
            create.question()
                .set_theme(
                    create.theme()
                )
                .set_audio(
                    create.audio()
                )
        )
        ;

    if ($scope.game && $routeParams.question_id) {
        console.log($routeParams.question_id);
        $scope.question = $scope.game.questions[$routeParams.question_id-1];
    }
    else {
        $scope.question = null;
    }

}]);
