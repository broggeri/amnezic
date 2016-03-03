angular.module('amnezic',['model'])

.controller('controller', ['$scope', 'create', function ($scope, create) {
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
}]);
