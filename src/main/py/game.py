
# ##################################################
# import

import random
import util


# ##################################################
# constant

default_nb_question = 42
default_nb_choice = 6
default_with_hint = True

# ##################################################
# game

def create(json_tracks=None, json_file=None, json_url=None, nb_question=None, nb_choice=None, with_hint=None):
    json_tracks = json_tracks or util.create(json_file=json_file, json_url=json_url)
    ordered_tracks = json_tracks.tracks or json_tracks or []
    nb_question = nb_question if nb_question is not None else  default_nb_question
    nb_choice = nb_choice if nb_choice is not None else  default_nb_choice
    with_hint = with_hint if with_hint is not None else default_with_hint

    # filter track without genre
    ordered_tracks = [track for track in ordered_tracks if track.genre is not None]

    # find genres
    genres = {}
    for track_id, track in enumerate(ordered_tracks):
        if track.genre not in genres:
            genres[track.genre] = []
        genres[track.genre].append(track_id)

    # shuffle track ids
    track_ids = range(0, len(ordered_tracks))
    random.shuffle(track_ids)

    # select n tracks
    track_ids = track_ids[:nb_question] if len(track_ids) >= nb_question else track_ids

    # prepare game
    game = util.create()
    game.nb_question = nb_question
    game.nb_choice = nb_choice
    game.questions = []
    for track_id in track_ids:
        track = ordered_tracks[track_id]

        # prepare question
        question = util.create()

        # prepare theme
        question.theme = util.create()
        question.theme.genre = track.genre

        # prepare audio
        question.audio = util.create()
        question.audio.mp3 = track.mp3

        # prepare choices
        question.choices = []

        # prepare correct choice
        choice = util.create()
        choice.answer = track.artist
        choice.hint = track.title
        choice.correct = True
        question.choices.append(choice)

        # prepare incorrect choices ( from same genre as the correct choice )
        candidate_ids = [candidate_id for candidate_id in genres[track.genre] if candidate_id != track_id]
        random.shuffle(candidate_ids)
        candidate_ids = candidate_ids[:nb_choice-1] if len(candidate_ids) >= nb_choice-1 else candidate_ids
        for candidate_id in candidate_ids:
            candidate = ordered_tracks[candidate_id]
            choice = util.create()
            choice.answer = candidate.artist
            if with_hint:
                choice.hint = candidate.title
            question.choices.append(choice)

        # shuffle choices
        random.shuffle(question.choices)

        # add question
        game.questions.append(question)

    return game


